import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const createToken = (user) => {
  const { _id, username, email, role } = user;
  console.log(user);
  const secretKey = process.env.SECRET_KEY;

  try {
    const token = jwt.sign({ _id, username, email, role }, secretKey, {
      expiresIn: "1w",
    });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    return null;
  }
};

const authenticateJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error("Error authenticating token:", error.message);
    return null;
  }
};

export { createToken, authenticateJWT };
