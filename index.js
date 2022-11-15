import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const mongoUrl = process.env.DEV_MONGO_URL;
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

const handleDBError = () => console.log("❌DB연결 실패");
const handleDBSuccess = () => console.log(`✅DB연결 성공`);

db.on("error", handleDBError);
db.once("open", handleDBSuccess);

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const handleListen = () => console.log(`✅서버가 ${port}에서 실행중입니다`);

app.listen(port, handleListen);
