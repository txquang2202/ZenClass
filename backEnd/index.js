import express from "express";
import env from "dotenv";
import connect from "./config/db.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import initApi from "./routes/api.js";

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//environment
env.config();
const port = process.env.PORT || 3000;
app.use("/assets", express.static("../frontend/assets"));
//connect to database
connect();
//api routes
initApi(app);
//Connect to server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
