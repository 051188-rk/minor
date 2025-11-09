import { Router } from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import Evaluation from "../models/Evaluation.js";
import AnswerSheet from "../models/AnswerSheet.js";
import FormData from "form-data";
import { pythonEvaluateSheet } from "../utils/pythonClient.js";

const router = Router();
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/evaluations", auth(["evaluator"]), async (req, res) => {
  try {
    const evalDoc = await Evaluation.create({ createdBy: req.user.id, ...req.body });
    res.json(evalDoc);
  } catch {
    res.status(500).json({ error: "Failed to create evaluation" });
  }
});

router.get("/evaluations", auth(["evaluator"]), async (req, res) => {
  const list = await Evaluation.find({ createdBy: req.user.id });
  res.json(list);
});

router.post(
  "/evaluations/:id/answersheets",
  auth(["evaluator"]),
  upload.fields([{ name: "pdf", maxCount: 1 }, { name: "answerKey", maxCount: 1 }]),
  async (req, res) => {
    try {
      const evaluation = await Evaluation.findById(req.params.id);
      if (!evaluation) return res.status(404).json({ error: "Evaluation not found" });

      const pdf = req.files?.pdf?.[0];
      const answerKey = req.files?.answerKey?.[0];
      const moderationLevel = req.body.moderationLevel || "standard";
      const studentIdText = req.body.studentIdText || "";

      if (!pdf || !answerKey) return res.status(400).json({ error: "pdf and answerKey required" });

      const formData = new FormData();
      formData.append("pdf", fs.createReadStream(pdf.path), { filename: pdf.originalname, contentType: pdf.mimetype });
      formData.append("answer_key", fs.createReadStream(answerKey.path), { filename: answerKey.originalname, contentType: "text/plain" });
      formData.append("moderation_level", moderationLevel);

      const evaluated = await pythonEvaluateSheet(formData);

      const sheet = await AnswerSheet.create({
        evaluation: evaluation._id,
        studentIdText,
        pdfPath: pdf.path,
        answerKeyText: fs.readFileSync(answerKey.path, "utf8"),
        moderationLevel,
        provisionalScore: evaluated.score,
        total: evaluated.total,
        breakdown: evaluated.breakdown,
        flagged: evaluated.flagged || false,
        notes: evaluated.notes || ""
      });

      res.json(sheet);
    } catch (e) {
      res.status(500).json({ error: "Evaluation failed" });
    }
  }
);

router.patch("/answersheets/:sheetId/flag", auth(["evaluator"]), async (req, res) => {
  const sheet = await AnswerSheet.findByIdAndUpdate(req.params.sheetId, { flagged: !!req.body.flagged }, { new: true });
  if (!sheet) return res.status(404).json({ error: "Sheet not found" });
  res.json(sheet);
});

router.get("/evaluations/:id/answersheets", auth(["evaluator"]), async (req, res) => {
  const sheets = await AnswerSheet.find({ evaluation: req.params.id });
  res.json(sheets);
});

export default router;
