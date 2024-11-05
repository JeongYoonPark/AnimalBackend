import express from "express";
import userRepository from "../repository/userRepository.js";
import apiResponse from "../dto/apiResponse.js";
import { hash, compareHash } from "../utils/hash.js";
import { duplicateEmail, duplicatePhone } from "../validator/auth.js";

const userController = express.Router();

userController.post("/regist", async (req, res, next) => {
  const { email, name, password, phone_number } = req.body;
  const dpEmail = await duplicateEmail(email);
  if (dpEmail) {
    return res
      .status(200)
      .json(apiResponse.success({ message: "존재하는 이메일입니다." }));
  }
  const dpPhone = await duplicatePhone(phone_number);
  if (dpPhone) {
    return res
      .status(200)
      .json(apiResponse.failure({ message: "존재하는 전화번호입니다." }));
  }

  const userId = await userRepository.signUp(
    email,
    name,
    await hash(password),
    phone_number,
  );
  if (userId.affectedRows) {
    res
      .status(200)
      .json(apiResponse.success({ message: "회원가입 성공", userId: userId }));
  } else {
    res
      .status(200)
      .json(apiResponse.failure({ message: "회원가입 실패", userId: userId }));
  }
});

userController.post("/duplicate", async (req, res, next) => {
  const { email } = req.body;
  const row = duplicateEmail(email);
  if (!row) {
    res
      .status(200)
      .json(apiResponse.success({ message: "사용가능한 이메일입니다." }));
  } else {
    res
      .status(200)
      .json(apiResponse.failure({ message: "존재하는 이메일입니다." }));
  }
});

userController.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userRepository.findUserByEmailAndPwd(
    email,
    await hash(password),
  );

  if (user) {
    res.status(200).json(
      apiResponse.success({
        message: "로그인에 성공했습니다.",
        result: user,
      }),
    );
  } else {
    res.status(200).json(
      apiResponse.failure({
        message: "아이디 또는 비밀번호가 틀렸습니다.",
        result: {
          email: email,
        },
      }),
    );
  }
});

export default userController;
