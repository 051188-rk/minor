"use client";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>MockTest Generator & Evaluator</h1>
        <p style={{ color: "var(--muted)" }}>
          Generate mock tests and evaluate answer sheets with Gemini-powered document understanding.
        </p>
        <div style={{ marginTop: "1rem" }}>
          <Link href="/(auth)/login" className="button">Login</Link>
          <span style={{ margin: "0 0.75rem" }} />
          <Link href="/(auth)/signup-student" className="button">Student Signup</Link>
          <span style={{ margin: "0 0.75rem" }} />
          <Link href="/(auth)/signup-evaluator" className="button">Evaluator Signup</Link>
        </div>
        <div style={{ marginTop: "1rem", color: "#14532d" }}>
          <FaCheckCircle /> Built with Next.js, Express, MongoDB, and Gemini
        </div>
      </div>
    </div>
  );
}
