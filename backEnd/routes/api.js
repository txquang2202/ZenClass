import {
  createUser,
  editUser,
  getUserProfile,
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
  invitationLink,
  deleteStudentFromClass,
  deleteTeacherFromClass,
  joinByCode,
} from "../controller/classController.js";
import {
  getCourseByUser,
  getCourseByID,
} from "../controller/coursesController.js";
import express from "express";
import { authenticateToken } from "../middleware/jwt.js";
import upload from "../middleware/multer.js";
import {
  deleteUsersbyID,
  deleteListUsersByIds,
  blockUserbyID,
  getAllUsers,
  changeStatusUsers,
} from "../controller/adminController.js";
import {
  addComment,
  getAllUsersComments,
  deleteComment,
} from "../controller/commentsController.js";
import {
  deleteHomeworkByID,
  editHomeworkByID,
  createHomeworkByID,
  getAllHomework,
  getHomeworkByID,
} from "../controller/homeworkController.js";
import {
  deleteGradeStruct,
  editGradeStruct,
  addGradeStruct,
  getAllGradeStructs,
  getAllGradeByClass,
  editClassGrade,
} from "../controller/gradeController.js";

import {
  getAllGradeReviews,
  addGradeReviewByID,
  deleteReviewByID,
} from "../controller/gradeReviewController.js";

import {
  getAllUsersReplies,
  addReply,
  deleteReply,
} from "../controller/cmtReviewController.js";

import "../middleware/passport.js";

const router = express.Router();
// @param {*} app: express app
// middleware.js

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
  router.post("/changeStatusListUser", changeStatusUsers);
  router.post("/blockUserbyID/:id", blockUserbyID);

  router.post("/updatePassword/:id", updatePassword);
  router.post("/resetPassword", resetPassword);

  //protected api
  router.get("/getallusers", authenticateToken, getAllUsers);
  router.get("/getprofile/:id", authenticateToken, getUserProfile);
  router.put(
    "/editprofile/:id",
    authenticateToken,
    upload.single("img"),
    editUser
  );
  //class APIs
  router.get("/getClassID/:id", getClassByID);
  router.post("/createClass", authenticateToken, createClass);
  router.delete("/deleteClass/:id", authenticateToken, deleteClassbyID);
  router.put("/editclass/:id", authenticateToken, editClass);
  router.get("/addStudentsToClass/:id", addStudent);
  router.get("/addTeacherToClass/:id", addTeacher);
  router.get("/getclassmembers/:id", getClassMembers);
  router.post("/sendInvitation/:id", invitationLink);
  router.post("/deleteStudentFromClass/:id", deleteStudentFromClass);
  router.post("/deleteTeacherFromClass/:id", deleteTeacherFromClass);
  router.get("/getallclasses/:id", getAllClasses);
  router.post("/joinbycode/:id", joinByCode);
  //coureseAPIS
  router.get("/getCourseByUser/:id", getCourseByUser);
  router.get("/getCourseByID/:id", getCourseByID);
  //HomeworkAPIS
  router.get("/getAllHomework/:id", getAllHomework);
  router.get("/getHomeworkByID/:id", getHomeworkByID);
  router.post("/createHomework/:id", createHomeworkByID);
  router.put("/editHomework/:id", editHomeworkByID);
  router.delete("/deleteHomework/:id", deleteHomeworkByID);
  // router.post("/createClass", authenticateToken, createHomeworkByID);
  // router.put("/editclass/:id", authenticateToken, editHomeworkByID);
  // router.delete("/deleteClass/:id", authenticateToken, deleteHomeworkByID);
  //CommentAPIS
  router.get("/getComments/:id", getAllUsersComments);
  router.post("/addComments/:id", addComment);
  router.delete("/deleteComment/:id", deleteComment);

  //GradeStructs
  router.get("/getAllGradeStructs/:id", getAllGradeStructs);
  router.post("/addGradeStruct/:id", addGradeStruct);
  router.put("/editGradeStruct/:id", editGradeStruct);
  router.delete("/deleteGradeStruct/:id", deleteGradeStruct);
  
  //Grade
  router.get("/getAllGradeClass/:id", getAllGradeByClass);
  router.put("/editClassGrade/:id", editClassGrade);
  // router.post("/addComments", authenticateToken, addComment);

  // GradeReviews
  router.get("/getAllGradeReviews/:id", getAllGradeReviews);
  router.post("/addGradeReview/:id", addGradeReviewByID);
  router.delete("/deleteReviewByID/:id", deleteReviewByID);
  router.get("/getAllUsersReplies/:id", getAllUsersReplies);
  router.post("/addReply/:id", addReply);
  router.delete("/deleteReply/:id", deleteReply);

  return app.use("/api/v1/", router);
};

export default initApi;
