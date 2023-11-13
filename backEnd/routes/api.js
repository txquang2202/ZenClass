import { createUser } from "../controller/userController.js";
import { handleLogin } from "../controller/authController.js";
import { authenticateJWT } from "../middleware/jwt.js";
import express from "express";

const router = express.Router();
// @param {*} app: express app
const initApi = (app) => {
  router.post("/signUp", createUser);
  router.post("/login", handleLogin);
  router.post("/protected", authenticateJWT);

  return app.use("/api/v1/", router);
};

export default initApi;
