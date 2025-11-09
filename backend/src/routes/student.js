import { Router } from "express";
import { auth } from "../middleware/auth.js";
import Test from "../models/Test.js";
import Result from "../models/Result.js";
import { pythonGenerateTest } from "../utils/pythonClient.js";

const router = Router();

// Create mock test via Gemini (Python service)
router.post("/tests", auth(["student"]), async (req, res) => {
  try {
    const { topic, difficulty, numQuestions, durationMinutes, pdfUrl } = req.body;
    const gemini = await pythonGenerateTest({ topic, difficulty, numQuestions, durationMinutes, pdfUrl });
    const test = await Test.create({
      createdBy: req.user.id,
      topic,
      difficulty,
      durationMinutes,
      numQuestions,
      questions: gemini.questions
    });
    res.json(test);
  } catch (e) {
    res.status(500).json({ error: "Failed to generate test" });
  }
});

// Submit answers and compute result
router.post("/tests/:id/submit", auth(["student"]), async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ error: "Test not found" });
    const answers = req.body.answers || []; // [{number, selected}]
    const map = new Map(answers.map(a => [a.number, a.selected]));
    const evaluated = test.questions.map(q => {
      const selected = map.get(q.number) || "";
      const isCorrect = selected === q.answer;
      return { number: q.number, selected, correct: q.answer, isCorrect };
    });
    const score = evaluated.filter(e => e.isCorrect).length;
    const result = await Result.create({ user: req.user.id, test: test._id, score, total: test.questions.length, answers: evaluated });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Submission failed" });
  }
});

// Fetch results for a student
router.get("/results", auth(["student"]), async (req, res) => {
  const results = await Result.find({ user: req.user.id }).populate("test");
  res.json(results);
});

export default router;
