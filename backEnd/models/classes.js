import mongoose from "mongoose";
const { Schema } = mongoose;

const classSchema = new mongoose.Schema({
  title: String,
  teachers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  className: String,
  students: [{ type: Schema.Types.ObjectId, ref: "users" }],
  homeworks: [{ type: Schema.Types.ObjectId, ref: "homeworks" }],
  gradestructs: [{ type: Schema.Types.ObjectId, ref: "gradestructs" }],
  gradereviews: [{ type: Schema.Types.ObjectId, ref: "gradereviews" }],
});

const Class = mongoose.model("classes", classSchema);

export default Class;
