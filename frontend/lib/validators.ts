import { z } from "zod";

export const SignupStudentSchema = z.object({
  role: z.literal("student"),
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  phone: z.string().optional(),
  enrollmentNo: z.string().optional(),
  branch: z.string().optional(),
  semester: z.string().optional(),
  interests: z.union([z.array(z.string()), z.string()]).optional()
});

export const SignupEvaluatorSchema = z.object({
  role: z.literal("evaluator"),
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  phone: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  experienceYears: z.coerce.number().int().nonnegative().optional(),
  expertiseSubjects: z.union([z.array(z.string()), z.string()]).optional(),
  moderationPreference: z.enum(["lenient", "standard", "strict"]).optional()
});

export const TestCreateSchema = z.object({
  topic: z.string().min(2),
  difficulty: z.enum(["easy", "medium", "hard"]),
  numQuestions: z.number().int().min(1).max(100),
  durationMinutes: z.number().int().min(1).max(300),
  pdfUrl: z.string().url().nullable().optional()
});

export const EvaluationCreateSchema = z.object({
  subject: z.string().min(2),
  semester: z.string().min(1),
  batch: z.string().min(1),
  details: z.string().optional()
});

export const ProfileUpdateSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  // Optional academic/professional fields; validated if present
  enrollmentNo: z.string().optional(),
  branch: z.string().optional(),
  semester: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  experienceYears: z.coerce.number().int().nonnegative().optional(),
  moderationPreference: z.enum(["lenient", "standard", "strict"]).optional(),
  interests: z.union([z.array(z.string()), z.string()]).optional(),
  expertiseSubjects: z.union([z.array(z.string()), z.string()]).optional()
});

export const AnswerUploadMetaSchema = z.object({
  moderationLevel: z.enum(["lenient", "standard", "strict"]).default("standard"),
  studentIdText: z.string().optional()
});
