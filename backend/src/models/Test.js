import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  number: Number,
  question: String,
  options: [String],
  answer: String,
  explanation: String,
  difficulty: String
});

const testSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: String,
    difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    durationMinutes: Number,
    numQuestions: Number,
    questions: [questionSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
