// ESM (ES6 Module, Ecma Script Module) : import, export
// CommonJS Module : require, module.exports 또는 exports
// const express = require('express')
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express()

import userRouter from "./routes/userRouter.js";

// middleware
app.use(express.json()); // json 데이터를 express에서 처리 가능
app.use("/", userRouter);

app.listen(3000)