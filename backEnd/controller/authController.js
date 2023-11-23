import env from "dotenv";
import passport from "passport";
import "../middleware/passport.js";
import { createToken, authenticateJWT } from "../middleware/jwt.js";
import transporter from "../middleware/nodemailer.js";
import crypto from "crypto";
import User from "../models/user.js";

env.config();

const handleLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password." });
    }

    const token = createToken(user);
    res.cookie("token", token, { httpOnly: true, maxAge: 3600 * 1000 });

    return res.json({ userData: user });
  })(req, res, next);
};
const generateUniqueToken = () => {
  const token = crypto.randomBytes(16).toString("hex");
  return token;
};
const sendEmail = async (email, verificationToken) => {
  const verificationLink = `${process.env.BA_BASE_URL}/api/v1/verify?token=${verificationToken}`;

  const mailOptions = {
    from: "Zen Class Corporation stellaron758@gmail.com",
    to: email,
    subject: "[Email Verification]",
    html: `Click the following link to verify your email: <a href="${verificationLink}">Verification Links</a>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve();
      }
    });
  });
};
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).send("Invalid verification token.");
  }

  user.verificationToken = undefined;
  user.isVerified = true;
  await user.save();
  res.send("Email verified successfully!");
};
export { handleLogin, sendEmail, verifyEmail, generateUniqueToken };
