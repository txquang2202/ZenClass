import mongoose from "mongoose";
const { Schema } = mongoose;

const classSchema = new mongoose.Schema({
  title: String,
  teachers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  className: String,
  students: [{ type: Schema.Types.ObjectId, ref: "users" }],
  homeworks: [{ type: Schema.Types.ObjectId, ref: "homeworks" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
});

const Class = mongoose.model("classes", classSchema);

export default Class;
