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
    (async () => {
      const t = await api.get(`/student/tests/${id}`); // create a simple pass-through route or reuse state
      // For simplicity, fetch via DB by id if you add that route; otherwise pre-store in state after creation.
      setTest(t.data);
    })();
  }, [id]);

  const submit = async (answers: any[]) => {
    const res = await api.post(`/student/tests/${id}/submit`, { answers });
    alert(`Score: ${res.data.score}/${res.data.total}`);
    router.push("/(student)/dashboard");
  };

  if (!test) return <div className="container">Loading...</div>;
  return <div className="container"><TestAttempt test={test} onSubmit={submit} /></div>;
}
