"use client";
import { useEffect, useState } from "react";
import api, { setAuth } from "@/lib/api";
import ResultCard from "@/components/ResultCard"; // Import ResultCard

export default function StudentDashboard() {
  const [results, setResults] = useState<any[]>([]); // State for results
  
  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) setAuth(tok);
    
    // Fetch past results
    (async () => {
      try {
        const { data } = await api.get("/student/results");
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch results", error);
      }
    })();
  }, []);

  return (
    <div className="container">
      <h2>My Results</h2>
      <div className="grid" style={{ marginTop: "1rem" }}>
        {results.length > 0 ? (
          results.map(r => (
            <div key={r._id} style={{ gridColumn: "span 6" }}>
              <ResultCard result={r} />
            </div>
          ))
        ) : (
          <p>You have not attempted any tests yet.</p>
        )}
      </div>
    </div>
  );
}