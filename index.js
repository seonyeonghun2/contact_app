// ESM (ES6 Module, Ecma Script Module) : import, export
// CommonJS Module : require, module.exports 또는 exports
// const express = require('express')
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import contactRouter from "./routes/contactRouter.js";

app.set("port", process.env.PORT || 3001);

// middleware
app.use(express.json()); // json 데이터를 express에서 처리 가능
app.use("/api", contactRouter);

// error middleware
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  // res.render('error');
});
app.listen(app.get("port"), () => {
  console.log(`🚧 server start port : ${app.get("port")}`);
});
