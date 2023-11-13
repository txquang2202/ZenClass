import express from "express";
import User from "../models/user.js";
import env from "dotenv";
import bcrypt from "bcrypt";
import { createToken, authenticateJWT } from "../middleware/jwt.js";
import cookieParser from "cookie-parser";

env.config();

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json();
    }

    const token = createToken(user);
    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 30 });

    const userData = authenticateJWT(token);
    // console.log(userData);
    res.json({ userData: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export { handleLogin };
