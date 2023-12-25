import mongoose from "mongoose";
const { Schema } = mongoose;

const GradeSchema = new mongoose.Schema({
  studentId: Number,
  fullName: String,
  grades: [
    {
      topic: String,
      score: { type: Number, default: 0 },
    },
  ],
});

const Grade = mongoose.model("grades", GradeSchema);

export default Grade;
