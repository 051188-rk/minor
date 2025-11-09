import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: String,
    semester: String,
    batch: String,
    details: String
  },
  { timestamps: true }
);

export default mongoose.model("Evaluation", evaluationSchema);
