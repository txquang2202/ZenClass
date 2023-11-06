import express from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { loginValid } from "../api/userAPI.js";

env.config();
const secretKey = process.env.SECRET_KEY || "your_secret_key";

const app = express();

const authenticateJWT = (req, res, next) => {
  try {
    var token = req.cookies.token;
    var verify = jwt.verify(token, process.env.SECRET_KEY || "mysecretkey");
    if (verify) {
      next();
    }
  } catch (error) {
    res.json("Bạn đéo có quyền truy cập");
  }
};

export { authenticateJWT };
