"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api, { setAuth } from "@/lib/api";
import UploadAnswerSheet from "@/components/UploadAnswerSheet";

export default function EvaluationAttemptPage() {
  const { id } = useParams<{ id: string }>();
  const [sheets, setSheets] = useState<any[]>([]);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) setAuth(tok);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const load = async () => {
    setReloading(true);
    try {
      const { data } = await api.get(`/evaluator/evaluations/${id}/answersheets`);
      setSheets(data);
    } finally {
      setReloading(false);
    }
  };

  const uploadSheet = async (fd: FormData) => {
    const res = await fetch((api.defaults.baseURL || "") + `/evaluator/evaluations/${id}/answersheets`, {
      method: "POST",
      headers: { Authorization: (api.defaults.headers.common["Authorization"] as string) || "" },
      body: fd
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    await load();
    alert(`Provisional Score: ${data.provisionalScore}/${data.total}${data.flagged ? " (FLAGGED)" : ""}`);
  };

  const toggleFlag = async (sheetId: string, flagged: boolean) => {
    const { data } = await api.patch(`/evaluator/answersheets/${sheetId}/flag`, { flagged });
    setSheets(sheets.map(s => (s._id === sheetId ? data : s)));
  };

  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "1rem" }}>
      <div>
        <div className="card">
          <h3>Evaluation</h3>
          <div style={{ color: "var(--muted)" }}>ID: {id}</div>
        </div>
      </div>
      <div>
        <UploadAnswerSheet onUpload={uploadSheet} />
        <div style={{ marginTop: "1rem" }}>
          <h3>Answer Sheets {reloading ? "(loading…)" : ""}</h3>
          <div className="grid" style={{ marginTop: "0.5rem" }}>
            {sheets.map(s => (
              <div key={s._id} className="card" style={{ gridColumn: "span 6" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{s.studentIdText || "Unnamed Student"}</div>
                    <div style={{ color: "var(--muted)" }}>Moderation: {s.moderationLevel}</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>{s.provisionalScore}/{s.total}</div>
                </div>
                {s.notes && <div style={{ marginTop: "0.4rem", color: "var(--muted)" }}>{s.notes}</div>}
                <div style={{ marginTop: "0.6rem", display: "flex", gap: "0.5rem" }}>
                  <button className="button" onClick={() => toggleFlag(s._id, !s.flagged)}>
                    {s.flagged ? "Unflag" : "Flag for Manual Review"}
                  </button>
                </div>
                <div style={{ marginTop: "0.6rem" }}>
                  <details>
                    <summary>Breakdown</summary>
                    <ul>
                      {(s.breakdown || []).map((b: any) => (
                        <li key={b.number}>
                          Q{b.number}: expected {b.expected}, extracted {b.extracted}, credit {b.credit}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
