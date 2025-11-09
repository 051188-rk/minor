import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  number: Number,
  selected: String,
  correct: String,
  isCorrect: Boolean
});

const resultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    score: Number,
    total: Number,
    answers: [answerSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
