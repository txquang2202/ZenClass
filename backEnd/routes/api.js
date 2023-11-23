import {
  createUser,
  editUser,
  getUserProfile,
  getAllUsers,
  getAllUsersComments,
  addComment,
  sendEmail,
} from "../controller/userController.js";
import { handleLogin } from "../controller/authController.js";
import { authenticateJWT } from "../middleware/jwt.js";
import express from "express";
import { checkUserToken } from "../middleware/jwt.js";
import upload from "../middleware/multer.js";

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
  router.post("/sendMail", sendEmail);

  return app.use("/api/v1/", router);
};

export default initApi;
