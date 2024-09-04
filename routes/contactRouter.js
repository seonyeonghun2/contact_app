// const express = require('express') // CommonJS 문법 --> 현재는 ESM 방식
import express from "express";
const router = express.Router();
import contactControl from "../controller/contactController.js";
// 요청에 따른 응답 시간 (=성능측정 용도)
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

// User(연락처) 생성
router.get("/contact/:id", contactControl.findOneContact); // 동적파라미터
router.post("/contact", contactControl.createContact);

// Contacts(연락처) 조회
router.get("/contacts", contactControl.findAllContacts);

router.delete("/contacts", contactControl.removeAllContacts);
router.delete("/contact/:id", contactControl.removeContact);

// Contact 연락처 수정
router.put("/contact", contactControl.updateContact);

// module.exports = router; // CommonJS 내보내기 문법 --> 현재는, ESM 방식
export default router;
