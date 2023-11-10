import User from "../models/user.js";
import env from "dotenv";
import bcrypt from "bcrypt";
import { CreateToken } from "../middleware/jwt.js";
import { authenticateJWT } from "../middleware/jwt.js";

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
    const token = CreateToken(user);
    console.log(authenticateJWT(token));
    res.json(authenticateJWT(token));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export { loginValid };
