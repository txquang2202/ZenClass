import {
  createUser,
  editUser,
  getUserProfile,
  getAllUsersComments,
  addComment,
} from "../controller/userController.js";
import { handleLogin, verifyEmail,updatePassword, resetPassword, verifyReset} from "../controller/authController.js";
import { authenticateJWT } from "../middleware/jwt.js";
import express from "express";
import { checkUserToken } from "../middleware/jwt.js";
import upload from "../middleware/multer.js";
import { getAllUsers } from "../controller/adminController.js";
import { deleteUsersbyID } from "../controller/adminController.js";
import { deleteListUsersByIds } from "../controller/adminController.js";
import { blockUserbyID } from "../controller/adminController.js";

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
  router.post("/deleteUser/:id", deleteUsersbyID);
  router.post("/deleteListUser", deleteListUsersByIds);
  router.post("/blockUserbyID/:id", blockUserbyID);
  return app.use("/api/v1/", router);
};

export default initApi;
