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
  handleAuthenticationGG,
  initFB,
  authenticateFB,
  handleAuthenticationFB,
} from "../controller/authController.js";
import {
  getAllClasses,
  createClass,
  deleteClassbyID,
  editClass,
  getClassByID,
  addStudent,
  addTeacher,
  getClassMembers,
} from "../controller/classController.js";
import express from "express";
import { authenticateToken } from "../middleware/jwt.js";
import upload from "../middleware/multer.js";
import {
  deleteUsersbyID,
  deleteListUsersByIds,
  blockUserbyID,
  getAllUsers,
} from "../controller/adminController.js";

const router = express.Router();
// @param {*} app: express app
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

const initApi = (app) => {
  //goolge login
  router.get("/auth/google", initGG);
  router.get("/auth/google/callback", authenticateGG, handleAuthenticationGG);
  //facebook login
  router.get("/auth/facebook", initFB);
  router.get("/auth/facebook/callback", authenticateFB, handleAuthenticationFB);
  //unprotect
  router.post("/register", createUser);
  router.post("/login", handleLogin);
  router.get("/verifyReset", verifyReset);
  router.get("/verify", verifyEmail);
  router.post("/deleteUser/:id", deleteUsersbyID);
  router.post("/deleteListUser", deleteListUsersByIds);
  router.post("/blockUserbyID/:id", blockUserbyID);
  router.get("/getComments", getAllUsersComments);
  router.post("/updatePassword/:id", updatePassword);
  router.post("/resetPassword", resetPassword);
  router.get("/getallclasses", getAllClasses);

  //protected api
  router.get("/getallusers", authenticateToken, getAllUsers);
  router.get("/getprofile/:id", authenticateToken, getUserProfile);
  router.put(
    "/editprofile/:id",
    authenticateToken,
    upload.single("img"),
    editUser
  );
  router.get("/getClassID/:id", authenticateToken, getClassByID);
  router.post("/createClass", authenticateToken, createClass);
  router.delete("/deleteClass/:id", authenticateToken, deleteClassbyID);
  router.put("/editclass/:id", authenticateToken, editClass);
  router.post("/addComments", authenticateToken, addComment);
  router.post("/addStudentsToClass/:id", addStudent);
  router.post("/addTeacherToClass/:id", addTeacher);
  router.get("/getclassmembers/:id", getClassMembers);

  return app.use("/api/v1/", router);
};

export default initApi;
