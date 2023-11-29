import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import env from "dotenv";
import GoogleStrategy from "passport-google-oauth20";

env.config();

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return cb(null, false, { message: "The user is not exist!!" });
      }

      const hashedPassword = await bcrypt.compare(password, user.password);
      if (!hashedPassword) {
        return cb(null, false, { message: "Incorrect password." });
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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.BA_BASE_URL + "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          return cb(null, user);
        }

        const newUser = new User({
          email: profile.emails[0].value,
          username: profile.displayName,
        });

        await newUser.save();

        // Return the newly created user
        return cb(null, newUser);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
