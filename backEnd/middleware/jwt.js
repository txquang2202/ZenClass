import jwt, { decode } from "jsonwebtoken";
import env, { decrypt } from "dotenv";
import express from "express";

env.config();

const app = express();

const createToken = (user) => {
  const { _id, username, role, isVerified } = user;
  const secretKey = process.env.SECRET_KEY;

  try {
    const token = jwt.sign(
      {
        _id,
        username,
        role,
        isVerified,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    return null;
  }
};

const authenticateJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return decoded;
  } catch (error) {
    console.error("Error authenticating token:", error.message);
    return null;
  }
};
const checkUserToken = (req, res, next) => {
  let cookies;
  cookies = req.cookies;
  if (cookies && cookies.token) {
    let token = cookies.token;
    let decoded = authenticateJWT(token);
    if (decoded) {
      next();
    } else {
      res.status(401).json({
        message: "Not authenticated user",
      });
    }
  } else {
    res.status(401).json({
      message: "Not authenticated user",
    });
  }
};

export { createToken, authenticateJWT, checkUserToken };
