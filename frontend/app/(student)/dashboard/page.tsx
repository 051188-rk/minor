"use client";
import { useEffect, useState } from "react";
import api, { setAuth } from "@/lib/api";
import StudentTestForm from "@/components/StudentTestForm";
import Link from "next/link";

export default function StudentDashboard() {
  const [tests, setTests] = useState<any[]>([]);
  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) setAuth(tok);
  }, []);

  const create = async (payload: any) => {
    const res = await api.post("/student/tests", payload);
    setTests([res.data, ...tests]);
  };

  return (
    <div className="container">
      <StudentTestForm onCreate={create} />
      <div className="grid" style={{ marginTop: "1rem" }}>
        {tests.map(t => (
          <div key={t._id} className="card" style={{ gridColumn: "span 6" }}>
            <h4>{t.topic} <span className="badge">{t.difficulty}</span></h4>
            <div>{t.numQuestions} questions • {t.durationMinutes} min</div>
            <div style={{ marginTop: "0.5rem" }}>
              <Link href={`/ (student)/tests/${t._id}/attempt`} className="button">Attempt</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
