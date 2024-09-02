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
router.get("/user/:id", contactControl.findOneUser); // 동적파라미터
router.post("/user", contactControl.createUser);

// Users(연락처) 조회
router.get("/users", contactControl.findAllUsers);

router.delete("/users", contactControl.removeAllUsers);
router.delete("/user/:id", contactControl.removeUser);

// User 연락처 수정
router.put("/user", contactControl.updateUser);

// module.exports = router; // CommonJS 내보내기 문법 --> 현재는, ESM 방식
export default router;
