import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: Number,
  img: String,
});

// Tạo một Model từ Schema
const User = mongoose.model("users", userSchema);

export default User;
