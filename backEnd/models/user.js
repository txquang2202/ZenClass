import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: Number,
  img: String,
  fullname: String,
  birthdate: Date,
  phone: String,
  gender: String,
  street: String,
  city: String,
  verificationToken: String,
  isVerified: Boolean,
  status: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "courses" }],
  classes: [{ type: Schema.Types.ObjectId, ref: "classes" }],
});

// Tạo một Model từ Schema
const User = mongoose.model("users", userSchema);

export default User;
