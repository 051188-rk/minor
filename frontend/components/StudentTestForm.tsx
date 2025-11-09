"use client";
import { useState } from "react";

export default function StudentTestForm({ onCreate }: { onCreate: (payload: any) => void }) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(10);
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [pdfUrl, setPdfUrl] = useState("");

  return (
    <div className="card">
      <h3>Create Mock Test</h3>
      <label className="label">Topic</label>
      <input className="input" value={topic} onChange={e => setTopic(e.target.value)} />
      <label className="label">Difficulty</label>
      <select className="select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <label className="label">Number of Questions</label>
      <input className="input" type="number" value={numQuestions} onChange={e => setNumQuestions(parseInt(e.target.value))} />
      <label className="label">Duration (minutes)</label>
      <input className="input" type="number" value={durationMinutes} onChange={e => setDurationMinutes(parseInt(e.target.value))} />
      <label className="label">Topic PDF URL (optional)</label>
      <input className="input" value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} placeholder="https://..." />
      <div style={{ marginTop: "1rem" }}>
        <button className="button" onClick={() => onCreate({ topic, difficulty, numQuestions, durationMinutes, pdfUrl: pdfUrl || null })}>
          Generate Test
        </button>
      </div>
    </div>
  );
}
