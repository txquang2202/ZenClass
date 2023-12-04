import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  title: String,
  teacher: String,
  className: String,
});

// Tạo một Model từ Schema
const Class = mongoose.model("classes", classSchema);

export default Class;
