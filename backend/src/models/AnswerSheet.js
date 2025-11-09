import mongoose from "mongoose";

const sheetSchema = new mongoose.Schema(
  {
    evaluation: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluation", required: true },
    studentIdText: String,
    pdfPath: String,
    answerKeyText: String,
    moderationLevel: { type: String, enum: ["lenient", "standard", "strict"], default: "standard" },
    provisionalScore: Number,
    total: Number,
    breakdown: [
      {
        number: Number,
        expected: String,
        extracted: String,
        credit: Number
      }
    ],
    flagged: { type: Boolean, default: false },
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model("AnswerSheet", sheetSchema);
