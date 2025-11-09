"use client";
import Link from "next/link";

export default function ResultCard({ result }: { result: any }) {
  const score = result?.score ?? 0;
  const total = result?.total ?? 0;
  const test = result?.test || {};
  const topic = test?.topic || "Untitled";
  const difficulty = test?.difficulty || "medium";
  const testId = test?._id;

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h4>{topic} <span className="badge">{difficulty}</span></h4>
        <div style={{ fontWeight: 700 }}>{score}/{total}</div>
      </div>
      <div style={{ marginTop: "0.4rem", color: "var(--muted)" }}>
        Attempted on {new Date(result.createdAt).toLocaleString()}
      </div>
      {testId && (
        <div style={{ marginTop: "0.6rem" }}>
          <Link className="button" href={`/(student)/tests/${testId}/attempt`}>View Test</Link>
        </div>
      )}
    </div>
  );
}
