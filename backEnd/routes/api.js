import { createUser } from "../controller/userController.js";
import { handleLogin } from "../controller/authController.js";
import { authenticateJWT } from "../middleware/jwt.js";
import express from "express";
import { checkUserToken } from "../middleware/jwt.js";

const router = express.Router();
// @param {*} app: express app

const checkLogin = (req, res, next) => {
  const nonSecurePath = ["/", "/signup", "/signin"];
  if (nonSecurePath.includes(req.path)) return next();

  if (user) {
    next();
  } else {
  }
};
const initApi = (app) => {
  router.post("/signUp", createUser);
  router.post("/login", handleLogin);
  router.get("/home", checkUserToken);
  router.post("/protected", authenticateJWT);
  router.get("/test", checkUserToken);

  return app.use("/api/v1/", router);
};

export default initApi;
