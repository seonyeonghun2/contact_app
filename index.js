import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
const app = express();
import nunjucks from "nunjucks";
import morgan from "morgan";
import multer from "multer";
import contactRouter from "./routes/contactRouter.js";
import noteRouter from "./routes/noteRouter.js";

app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
// middleware
app.use(morgan("dev"));
app.use(express.json()); // json 데이터를 express에서 처리 가능]
app.use(urlencoded({ extended: true }));
app.use(multer().none());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/", noteRouter);
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
  res.render("error");
});
app.listen(app.get("port"), () => {
  console.log(`🚧 server start port : ${app.get("port")}`);
});
