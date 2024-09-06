window.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contact_form')
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      body: new FormData(contactForm),
    })
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          location.reload()
        }
      })
      .catch((error) => {
        console.log('에러메세지 : ' + error)
      })
  })
  const deleteBtns = document.querySelectorAll('.delete_btn')
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const contactNum = e.target.dataset.contactNum
      await fetch(`http://localhost:3001/api/contact/${contactNum}`, {
        method: 'DELETE',
      })
        .then((res) => {
          alert('삭제 성공!')
          location.reload()
        })
        .catch((err) => {
          alert('삭제 실패!')
          console.log(err)
        })
      //location.reload()
    })
  })
  const clearBtn = document.querySelector('.clear_btn')
  clearBtn.addEventListener('click', async (e) => {
    let user_confirm = confirm('모두 삭제 하시겠습니까?')
    if (user_confirm) {
      await fetch('http://localhost:3001/api/contacts', {
        method: 'DELETE',
      })
        .then((res) => {
          alert('모두 삭제 성공!')
          location.reload()
        })
        .catch((err) => {
          alert('모두 삭제 실패!')
          console.log(err)
        })
    }
  })

  const modifyBtns = document.querySelectorAll('.modify_btn')
  modifyBtns.forEach((modifyBtn) => {
    modifyBtn.addEventListener('click', (e) => {
      const id = e.target.dataset.id
      const name = e.target.dataset.name
      const phone = e.target.dataset.phone
      const email = e.target.dataset.email
      const address = e.target.dataset.address
      // console.log(id, name, phone, email, address)
      createModal(id, name, phone, email, address)
    })
  })

  function createModal(id, name, phone, email, address) {
    const modalDiv = document.createElement('div')
    modalDiv.id = 'modal'
    modalDiv.innerHTML = `
    <div id="modal">
      <form id="update_form">
        <fieldset>
          <legend>연락처 수정</legend>
          <div class="container">
            <div class="row">
              <input
                type="text"
                id="update_name"
                name="name"
                placeholder="이름"
                required
                value="${name}"
              />
            </div>
            <div class="row">
              <input
                type="tel"
                id="update_phone"
                name="phone"
                placeholder="연락처"
                required
                value="${phone}"
              />
            </div>
            <div class="row">
              <input
                type="email"
                id="update_email"
                name="email"
                placeholder="이메일"
                value="${email}"
              />
            </div>
            <div class="row">
              <input
                type="text"
                id="update_address"
                name="address"
                placeholder="주소"
                value="${address}"
              />
            </div>
            <div>
              <button type="submit" id="update_form">완료</button>
              <button type="reset" id="cancel">취소</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    `
    document.body.appendChild(modalDiv)

    // 모달 취소 버튼 이벤트
    modalDiv.querySelector('#cancel').addEventListener('click', () => {
      document.body.removeChild(modalDiv)
    })

    // 모달 제출 이벤트
    modalDiv
      .querySelector('#update_form')
      .addEventListener('submit', function (e) {
        e.preventDefault()
        updateContact(id)
      })
  }

  function updateContact(id) {
    const modalDiv = document.querySelector('#modal')
    if (!modalDiv) {
      console.error('모달을 찾을 수 없습니다.')
      return
    }
    fetch(`http://localhost:3001/api/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: modalDiv.querySelector('#update_name').value,
        phone: modalDiv.querySelector('#update_phone').value,
        email: modalDiv.querySelector('#update_email').value,
        address: modalDiv.querySelector('#update_address').value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => location.reload())
      .catch((err) => {
        console.log(err)
        // document.body.removeChild(document.querySelector('#modal'))
      })
  }
}) // DOMContentLoaded
