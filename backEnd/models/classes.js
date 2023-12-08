import mongoose from "mongoose";
const { Schema } = mongoose;

const classSchema = new mongoose.Schema({
  title: String,
  teachers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  className: String,
  students: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

const Class = mongoose.model("classes", classSchema);

export default Class;
