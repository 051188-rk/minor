import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["student", "evaluator"], required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    // Common profile
    name: { type: String, required: true },
    phone: String,
    // Student-specific
    enrollmentNo: String,
    branch: String,
    semester: String,
    interests: [String],
    // Evaluator-specific
    department: String,
    designation: String,
    experienceYears: Number,
    expertiseSubjects: [String],
    moderationPreference: { type: String, enum: ["lenient", "standard", "strict"], default: "standard" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
