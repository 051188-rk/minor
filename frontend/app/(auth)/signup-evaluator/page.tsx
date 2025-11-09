"use client";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import MultiStepForm from "@/components/MultiStepForm";

export default function SignupEvaluator() {
  const router = useRouter();
  const submit = async (data: any) => {
    const payload = {
      ...data,
      role: "evaluator",
      expertiseSubjects: (data.expertiseSubjects || "").split(",").map((s: string) => s.trim())
    };
    const res = await api.post("/auth/signup", payload);
    localStorage.setItem("token", res.data.token);
    router.push("/(evaluator)/dashboard");
  };
  return <div className="container"><MultiStepForm role="evaluator" onSubmit={submit} /></div>;
}
