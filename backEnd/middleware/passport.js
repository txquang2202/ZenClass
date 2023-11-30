import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import env from "dotenv";
import GoogleStrategy from "passport-google-oauth20";

env.config();

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
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_ID_SECRET,
      callbackURL: process.env.BA_BASE_URL + "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ googleId: profile.id });

        if (user) {
          return cb(null, user);
        }
        console.log("pass");
        // Người dùng chưa tồn tại, tạo mới và lưu vào database
        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName,
        });

        await newUser.save();

        // Trả về người dùng mới tạo
        return cb(null, newUser);
      } catch (err) {
        return cb(err);
      }
    }
  )
);
