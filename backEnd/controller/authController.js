import User from "../models/user.js";
import jwt from "jsonwebtoken";
import env from "dotenv";
import bcrypt from "bcrypt";

env.config();
const loginValid = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json();
    }

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(user.toJSON(), secretKey, { expiresIn: 604800 });
    res.cookie("token", token, { maxAge: 300000, httpOnly: true });
    res.json({
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export { loginValid };
