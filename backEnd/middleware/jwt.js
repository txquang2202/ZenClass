import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const createToken = (user) => {
  const {
    _id,
    username,
    email,
    role,
    img,
    fullname,
    birthdate,
    gender,
    phone,
    street,
    city,
  } = user;
  //console.log(user);
  const secretKey = process.env.SECRET_KEY;

  try {
    const token = jwt.sign(
      {
        _id,
        username,
        email,
        role,
        img,
        fullname,
        birthdate,
        gender,
        phone,
        street,
        city,
      },
      secretKey,
      {
        expiresIn: "1w",
      }
    );
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
const checkUserToken = (req, res, next) => {
  let cookies;
  cookies = req.cookies;
  if (cookies && cookies.token) {
    let token = cookies.token;
    let decoded = authenticateJWT(token);
    if (decoded) {
      next();
    } else {
      res.status(401).json({
        message: "Not authenticated user",
      });
    }
  } else {
    res.status(401).json({
      message: "Not authenticated user",
    });
  }
  console.log(cookies.token);
};

export { createToken, authenticateJWT, checkUserToken };
