import User from "../models/user.js";
import jwt from "jsonwebtoken";
import env from "dotenv";
import bcrypt from "bcrypt";

env.config();
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      img: "Example",
    });

    const existUsername = await User.findOne({ username });
    const existEmail = await User.findOne({ email });

    if (existUsername) {
      return res.status(400).json({ message: "Username already taken!" });
    }
    if (existEmail) {
      return res.status(400).json({ message: "Email already taken!" });
    }

    await newUser.save();
    res.json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi.");
  }
};

export { createUser };
