import { createUser } from "../controller/userController.js";
import { loginValid } from "../controller/authController.js";
import { authenticateJWT } from "../middleware/jwt.js";

const initApi = (app) => {
  app.post("/signUp", createUser);
  app.post("/login", loginValid);
};

export default initApi;
