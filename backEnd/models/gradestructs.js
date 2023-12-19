import mongoose from "mongoose";
const { Schema } = mongoose;

const gradeStructSchema = new mongoose.Schema({
  topic: String,
  ratio: Number,
});

const GradeStruct = mongoose.model("gradestructs", gradeStructSchema);

export default GradeStruct;
