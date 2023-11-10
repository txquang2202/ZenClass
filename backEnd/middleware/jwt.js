import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const CreateToken = (user) => {
  const secretKey = process.env.SECRET_KEY;
  let token = null;
  try {
    token = jwt.sign(user.toJSON(), secretKey, { expiresIn: 604800 });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const authenticateJWT = (token) => {
  var data = null;
  try {
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    data = decoded;
  } catch (error) {
    console.log(error.message);
  }
  return data;
};

export { CreateToken, authenticateJWT };
