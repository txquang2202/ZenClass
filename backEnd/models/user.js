import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
  img: String,
});

// Tạo một Model từ Schema
const User = mongoose.model("users", userSchema);

export default User;
