import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";

const router = Router();

router.post(
  "/signup",
  body("role").isIn(["student", "evaluator"]),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("name").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const exists = await User.findOne({ email: req.body.email });
      if (exists) return res.status(409).json({ error: "Email already used" });
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, passwordHash });
      const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user });
    } catch (e) {
      res.status(500).json({ error: "Signup failed" });
    }
  }
);

router.post("/login", body("email").isEmail(), body("password").notEmpty(), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (e) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
