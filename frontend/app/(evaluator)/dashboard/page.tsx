"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link
import api, { setAuth } from "@/lib/api";

export default function EvaluatorDashboard() {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  
  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) setAuth(tok);
    
    (async () => {
      try {
        const { data } = await api.get("/evaluator/evaluations");
        setEvaluations(data);
      } catch (error) {
        console.error("Failed to fetch evaluations", error);
      }
    })();
  }, []);

  return (
    <div className="container">
      <h2>My Evaluations</h2>
      <div className="grid" style={{ marginTop: "1rem" }}>
        {evaluations.length > 0 ? (
          evaluations.map(ev => (
            <div key={ev._id} className="card" style={{ gridColumn: "span 6" }}>
              <h4>{ev.subject} <span className="badge">{ev.semester}</span></h4>
              <div>{ev.batch}</div>
              <div style={{ marginTop: "1rem" }}>
                {/* Add link to the specific evaluation page */}
                <Link 
                  href={`/(evaluator)/evaluations/${ev._id}/attempt`} 
                  className="button"
                >
                  View & Upload Sheets
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>You have not created any evaluations.</p>
        )}
      </div>
    </div>
  );
}