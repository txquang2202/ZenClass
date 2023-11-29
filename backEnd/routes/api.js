import {
  createUser,
  editUser,
  getUserProfile,
  getAllUsersComments,
  addComment,
} from "../controller/userController.js";
import {
  handleLogin,
  verifyEmail,
  updatePassword,
  verifyReset,
  resetPassword,
  initGG,
  authenticateGG,
} from "../controller/authController.js";
import { authenticateJWT } from "../middleware/jwt.js";
import express from "express";
import { checkUserToken } from "../middleware/jwt.js";
import upload from "../middleware/multer.js";
import passport from "passport";
import "../middleware/passport.js";

const router = express.Router();
// @param {*} app: express app

const initApi = (app) => {
  router.post("/register", createUser);
  router.post("/login", handleLogin);
  router.get("/home", checkUserToken, getAllUsers);
  router.post("/protected", authenticateJWT);
  router.get("/getprofile/:id", getUserProfile);
  router.put("/editprofile/:id", upload.single("img"), editUser);
  router.get("/getallusers", getAllUsers);
  router.get("/getComments", getAllUsersComments);
  router.post("/addComments", addComment);
  router.post("/updatePassword/:id", updatePassword);
  router.post("/resetPassword", resetPassword);
  router.get("/verifyReset", verifyReset);
  router.get("/verify", verifyEmail);
  router.get("/auth/google", initGG);
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: `${process.env.BASE_URL}/login`,
    }),
    (req, res) => {
      res.redirect(`${process.env.BASE_URL}/`);
    }
  );
  return app.use("/api/v1/", router);
};

export default initApi;
