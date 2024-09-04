// const express = require('express') // CommonJS 문법 --> 현재는 ESM 방식
import express from "express";
const router = express.Router();
import noteControl from "../controller/noteController.js";
// 요청에 따른 응답 시간 (=성능측정 용도)
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

// Note(메모) 생성
router.post("/note", noteControl.createMemo);
// Note(메모) 삭제
router.delete("/note/:id", noteControl.removeMemo);

export default router;
