import env from "dotenv";
import passport from "passport";
import "../middleware/passport.js";
import { createToken, authenticateJWT } from "../middleware/jwt.js";

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

export { handleLogin };
