import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import evaluatorRoutes from "./routes/evaluator.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/evaluator", evaluatorRoutes);

const port = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(port, () => console.log(`API running on ${port}`));
});
