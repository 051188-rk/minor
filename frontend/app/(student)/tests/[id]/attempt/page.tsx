"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api, { setAuth } from "@/lib/api";
import TestAttempt from "@/components/TestAttempt";

export default function AttemptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [test, setTest] = useState<any | null>(null);

  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) setAuth(tok);

    // Read test data from localStorage instead of fetching
    const savedTest = localStorage.getItem(`test-${id}`);
    if (savedTest) {
      setTest(JSON.parse(savedTest));
    } else {
      // Handle case where test data isn't found
      alert("Test data not found. Redirecting to dashboard.");
      router.push("/(student)/dashboard");
    }
  }, [id, router]);

  const submit = async (answers: any[]) => {
    try {
      const res = await api.post(`/student/tests/${id}/submit`, { answers });
      alert(`Score: ${res.data.score}/${res.data.total}`);
      
      // Clean up localStorage after submission
      localStorage.removeItem(`test-${id}`);
      
      router.push("/(student)/dashboard");
    } catch (error) {
      console.error("Failed to submit test", error);
      alert("Failed to submit test.");
    }
  };

  if (!test) return <div className="container">Loading...</div>;
  return <div className="container"><TestAttempt test={test} onSubmit={submit} /></div>;
}