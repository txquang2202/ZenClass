import mongoose from "mongoose";

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
<<<<<<< HEAD
  status: String,
=======
  googleId: String,
>>>>>>> 9483f0801b40dad058faaca06b162b0ee30d7dbf
});

// Tạo một Model từ Schema
const User = mongoose.model("users", userSchema);

export default User;
