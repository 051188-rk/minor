"use client";
import { useEffect, useState } from "react";
import api, { setAuth } from "@/lib/api";
import EvaluatorCreateForm from "@/components/EvaluatorCreateForm";
import UploadAnswerSheet from "@/components/UploadAnswerSheet";

export default function EvaluatorDashboard() {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) setAuth(tok);
    (async () => {
      const { data } = await api.get("/evaluator/evaluations");
      setEvaluations(data);
    })();
  }, []);

  const create = async (payload: any) => {
    const { data } = await api.post("/evaluator/evaluations", payload);
    setEvaluations([data, ...evaluations]);
  };

  const uploadSheet = async (evalId: string, fd: FormData) => {
    const url = `/evaluator/evaluations/${evalId}/answersheets`;
    const res = await fetch((api.defaults.baseURL || "") + url, {
      method: "POST",
      headers: { Authorization: (api.defaults.headers.common["Authorization"] as string) || "" },
      body: fd
    });
    const data = await res.json();
    alert(`Provisional Score: ${data.provisionalScore}/${data.total}${data.flagged ? " (FLAGGED)" : ""}`);
  };

  return (
    <div className="container">
      <EvaluatorCreateForm onCreate={create} />
      <div className="grid" style={{ marginTop: "1rem" }}>
        {evaluations.map(ev => (
          <div key={ev._id} className="card" style={{ gridColumn: "span 6" }}>
            <h4>{ev.subject} <span className="badge">{ev.semester}</span></h4>
            <div>{ev.batch}</div>
            <UploadAnswerSheet onUpload={(fd) => uploadSheet(ev._id, fd)} />
          </div>
        ))}
      </div>
    </div>
  );
}
