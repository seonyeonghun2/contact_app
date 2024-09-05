// Node.js v18 LTS 이상에서는 파일이름.js 형식으로 import 해야함
import db from '../models/index.js'

const createMemo = async (req, res) => {
  const { id, memo } = req.body // 요청 바디에서 각 필드값을 추출 (=구조분해할당 문법)
  try {
    // 일단!
    // console.log(name, phone, email, relationship);
    // 이상없으면? DB에 데이터를 삽입 .create({데이터}) 호출 ==>
    const result = await db.Note.create({
      contact_id: id,
      memo,
    })

    res.json({
      status: 201,
      result,
    })
  } catch (error) {
    console.log('Error : ' + error)
  }
}

const removeMemo = async (req, res) => {
  try {
    const result = await db.Note.destroy({
      where: {
        id: req.params.id,
      },
    })
  } catch (error) {
    console.log(error)
  }
}
// removeUser, modifyUser, deleteUser + findAllUsers
const noteControl = {
  createMemo,
  removeMemo,
}

export default noteControl
