"use client";
import { useState } from "react";

export default function EvaluatorCreateForm({ onCreate }: { onCreate: (payload: any) => void }) {
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [batch, setBatch] = useState("");
  const [details, setDetails] = useState("");

  return (
    <div className="card">
      <h3>Create Evaluation</h3>
      <label className="label">Subject</label>
      <input className="input" value={subject} onChange={e => setSubject(e.target.value)} />
      <label className="label">Semester</label>
      <input className="input" value={semester} onChange={e => setSemester(e.target.value)} />
      <label className="label">Batch</label>
      <input className="input" value={batch} onChange={e => setBatch(e.target.value)} />
      <label className="label">Other Details</label>
      <textarea className="textarea" value={details} onChange={e => setDetails(e.target.value)} />
      <div style={{ marginTop: "1rem" }}>
        <button className="button" onClick={() => onCreate({ subject, semester, batch, details })}>Create</button>
      </div>
    </div>
  );
}
