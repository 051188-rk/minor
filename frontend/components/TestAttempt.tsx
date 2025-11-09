"use client";
import { useState } from "react";

export default function TestAttempt({ test, onSubmit }: { test: any; onSubmit: (answers: any[]) => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  return (
    <div className="card">
      <h3>{test.topic} — {test.durationMinutes} min</h3>
      {test.questions.map((q: any) => (
        <div key={q.number} style={{ marginTop: "1rem", borderTop: "1px solid var(--border)", paddingTop: "0.6rem" }}>
          <div style={{ fontWeight: 600 }}>{q.number}. {q.question}</div>
          <div style={{ marginTop: "0.4rem" }}>
            {q.options.map((opt: string) => (
              <label key={opt} style={{ display: "block", marginTop: "0.25rem" }}>
                <input
                  type="radio"
                  name={`q${q.number}`}
                  checked={answers[q.number] === opt}
                  onChange={() => setAnswers({ ...answers, [q.number]: opt })}
                />
                <span style={{ marginLeft: "0.5rem" }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div style={{ marginTop: "1rem" }}>
        <button className="button" onClick={() => {
          const out = Object.entries(answers).map(([k, v]) => ({ number: parseInt(k), selected: v }));
          onSubmit(out);
        }}>Submit</button>
      </div>
    </div>
  );
}
