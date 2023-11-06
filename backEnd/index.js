import ejs from "ejs";
import express from "express";
import env from "dotenv";
import connect from "./config/db.js";
import { createUser, loginValid } from "./api/userAPI.js";
import { authenticateJWT } from "./middleware/jwt.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//environment
env.config();
const port = process.env.PORT || 3000;
app.use("/assets", express.static("../frontend/assets"));
//connect to database
connect();
//view engine
app.set("view engine", "ejs");
app.set("views", "../frontend");

//api routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/home", authenticateJWT, (req, res, next) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("loginScreen");
});
//signUp
app.get("/signUp", (req, res) => {
  res.render("signUp");
});
app.post("/signUp", createUser);
app.post("/login", loginValid);

//Connect to server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
