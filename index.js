import express from "express";
import logger from "morgan";
import userController from "./src/controller/userController.js";
import cors from "cors";
import session from "./src/db/session.js";

const app = express();

app.use(session);

// 세션 CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  }),
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userController);

app.listen(4000, async () => {
  console.log("서버가 4000번 포트에서 작동중입니다.");
});
