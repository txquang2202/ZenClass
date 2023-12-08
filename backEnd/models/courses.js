import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new mongoose.Schema({
  title: String,
  teachers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  courseName: String,
  students: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

const Course = mongoose.model("courses", courseSchema);

export default Course;
