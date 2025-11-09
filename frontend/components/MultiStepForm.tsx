"use client";
import { useState } from "react";

type Step = { title: string; fields: { name: string; label: string; type?: string }[] };

export default function MultiStepForm({ role, onSubmit }: { role: "student" | "evaluator"; onSubmit: (data: any) => void }) {
  const studentSteps: Step[] = [
    { title: "Account", fields: [{ name: "email", label: "Email", type: "email" }, { name: "password", label: "Password", type: "password" }] },
    { title: "Profile", fields: [{ name: "name", label: "Full Name" }, { name: "phone", label: "Phone" }] },
    { title: "Academics", fields: [{ name: "enrollmentNo", label: "Enrollment No" }, { name: "branch", label: "Branch" }, { name: "semester", label: "Semester" }] },
    { title: "Interests", fields: [{ name: "interests", label: "Interests (comma separated)" }] }
  ];
  const evaluatorSteps: Step[] = [
    { title: "Account", fields: [{ name: "email", label: "Email", type: "email" }, { name: "password", label: "Password", type: "password" }] },
    { title: "Profile", fields: [{ name: "name", label: "Full Name" }, { name: "phone", label: "Phone" }] },
    { title: "Professional", fields: [{ name: "department", label: "Department" }, { name: "designation", label: "Designation" }, { name: "experienceYears", label: "Experience (years)" }] },
    { title: "Expertise", fields: [{ name: "expertiseSubjects", label: "Expertise Subjects (comma separated)" }, { name: "moderationPreference", label: "Moderation Preference" }] }
  ];
  const steps = role === "student" ? studentSteps : evaluatorSteps;

  const [data, setData] = useState<any>({ role });
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => Math.min(i + 1, steps.length - 1));
  const prev = () => setIdx((i) => Math.max(i - 1, 0));

  const submit = () => onSubmit(data);

  const step = steps[idx];

  return (
    <div className="card">
      <h3>{role === "student" ? "Student Signup" : "Evaluator Signup"} — {step.title}</h3>
      {step.fields.map(f => (
        <div key={f.name} style={{ marginTop: "0.6rem" }}>
          <label className="label">{f.label}</label>
          <input
            className="input"
            type={f.type || "text"}
            onChange={e => setData({ ...data, [f.name]: e.target.value })}
          />
        </div>
      ))}
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <button className="button" onClick={prev} disabled={idx === 0}>Back</button>
        {idx < steps.length - 1 ? (
          <button className="button" onClick={next}>Next</button>
        ) : (
          <button className="button" onClick={submit}>Create Account</button>
        )}
      </div>
    </div>
  );
}
