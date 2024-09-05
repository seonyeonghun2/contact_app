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
          location.reload();
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
})
