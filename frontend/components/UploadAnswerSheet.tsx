"use client";
import { useState } from "react";

export default function UploadAnswerSheet({ onUpload }: { onUpload: (fd: FormData) => void }) {
  const [pdf, setPdf] = useState<File | null>(null);
  const [answerKey, setAnswerKey] = useState<File | null>(null);
  const [moderationLevel, setModerationLevel] = useState("standard");
  const [studentIdText, setStudentIdText] = useState("");

  const go = () => {
    if (!pdf || !answerKey) return alert("Select PDF and answer key (.txt)");
    const fd = new FormData();
    fd.append("pdf", pdf);
    fd.append("answerKey", answerKey);
    fd.append("moderationLevel", moderationLevel);
    fd.append("studentIdText", studentIdText);
    onUpload(fd);
  };

  return (
    <div className="card">
      <h3>Add Answer Sheet</h3>
      <label className="label">Student Identifier</label>
      <input className="input" value={studentIdText} onChange={e => setStudentIdText(e.target.value)} />
      <label className="label">Answer PDF</label>
      <input className="input" type="file" accept="application/pdf" onChange={e => setPdf(e.target.files?.[0] || null)} />
      <label className="label">Answer Key (.txt)</label>
      <input className="input" type="file" accept=".txt" onChange={e => setAnswerKey(e.target.files?.[0] || null)} />
      <label className="label">Moderation Level</label>
      <select className="select" value={moderationLevel} onChange={e => setModerationLevel(e.target.value)}>
        <option value="lenient">lenient</option>
        <option value="standard">standard</option>
        <option value="strict">strict</option>
      </select>
      <div style={{ marginTop: "1rem" }}>
        <button className="button" onClick={go}>Upload & Evaluate</button>
      </div>
    </div>
  );
}
