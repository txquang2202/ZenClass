import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return cb(null, false, { message: "Incorrect username or password." });
      }

      const hashedPassword = await bcrypt.compare(password, user.password);
      if (!hashedPassword) {
        return cb(null, false, { message: "Incorrect username or password." });
      }

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);
