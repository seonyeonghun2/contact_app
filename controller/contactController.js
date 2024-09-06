// Node.js v18 LTS 이상에서는 파일이름.js 형식으로 import 해야함
import db from '../models/index.js'

// MVC 패턴
// DB에 CRUD 하는 작업 ==> 자바스크립트 함수(=메소드) ==> 라우터에서 사용할수 있게 export
// 작명 : 동사+명사(단수,복수)
// 비동기 통신:   callback function --> AJAX --> Promise -->  async / await (현재 최신 문법)
// localhost:3000/add --> req.body 전달되는 각종 데이터(POST 통신)
const createContact = async (req, res) => {
  const { name, phone, email, address } = req.body
  if (!name || !phone) {
    res.json({
      status: 401,
      message: 'name,phone이 null 입니다',
    })
  }
  try {
    const newContact = await db.Contact.create({
      name,
      phone,
      email,
      address,
    })

    res.json({
      status: 200,
      message: 'success',
    })
  } catch (error) {
    console.log('에러메세지 : ' + error)
  }
}
// removeUser, modifyUser, deleteUser + findAllUsers

const findAllContacts = async (req, res) => {
  try {
    const users = await db.Contact.findAll()
    res.render('contact', { contacts: users })
    // res.json({
    //   status: 200,
    //   data: users,
    // });
  } catch (error) {
    console.log('에러메세지 : ' + error)
  }
}

const findOneContact = async (req, res) => {
  console.log('======= 요청 아이디 : ' + req.params.id)
  try {
    const foundContact = await db.Contact.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: db.Note,
      },
    })

    res.render('contact', { contacts: foundContact })
  } catch (err) {
    console.log('에러메세지 : ' + err)
  }
}

const updateContact = async (req, res) => {
  try {
    const result = await db.Contact.update(
      {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    if (!result) {
      res.json({
        status: 400,
        message: '업데이트가 실패했습니다.',
      })
    } else {
      const users = await db.Contact.findAll()
      res.render('contact', { contacts: users })
    }
  } catch (error) {
    console.log('에러메세지 : ' + error)
  }
}

const removeContact = async (req, res) => {
  console.log('삭제요청 아이디 : ' + req.params.id)
  try {
    const removedUser = await db.Contact.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!removedUser) {
      res.json({
        status: 400,
        message: '업데이트가 삭제됩니다.',
      })
    } else {
      res.json({
        status: 201,
        message: '업데이트가 삭제됩니다.',
      })
    }
  } catch (error) {
    console.log('에러메세지 : ' + error)
  }
}

const removeAllContacts = async (req, res) => {
  try {
    const removedUser = await db.Contact.destroy({
      truncate: true,
    })
    res.json({
      status: 201,
      message: '연락처가 모두 삭제되었습니다.',
    })
  } catch (error) {
    console.log('에러메세지 : ' + error)
  }
}

const contactControl = {
  createContact,
  findAllContacts,
  findOneContact,
  removeContact,
  removeAllContacts,
  updateContact,
}

export default contactControl
