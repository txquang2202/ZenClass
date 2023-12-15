import mongoose from "mongoose";

const homeworksSchema = new mongoose.Schema({
  title: String,
  description: String,
  teacher: String,
  date: Date,
});

const Homework = mongoose.model("homeworks", homeworksSchema);

export default Homework;
