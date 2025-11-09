"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EvaluatorCreateForm from "@/components/EvaluatorCreateForm";
import api, { setAuth } from "@/lib/api";
import { EvaluationCreateSchema } from "@/lib/validators";

export default function EvaluatorNewEvaluation() {
  const router = useRouter();

  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) setAuth(tok);
  }, []);

  const create = async (payload: any) => {
    const parsed = EvaluationCreateSchema.safeParse(payload);
    if (!parsed.success) {
      alert(parsed.error.errors.map(e => e.message).join("\n"));
      return;
    }
    const { data } = await api.post("/evaluator/evaluations", parsed.data);
    router.push(`/(evaluator)/evaluations/${data._id}/attempt`);
  };

  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "1rem" }}>
      <div></div>
      <div><EvaluatorCreateForm onCreate={create} /></div>
    </div>
  );
}
