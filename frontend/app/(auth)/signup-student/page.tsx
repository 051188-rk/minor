"use client";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import MultiStepForm from "@/components/MultiStepForm";

export default function SignupStudent() {
  const router = useRouter();
  const submit = async (data: any) => {
    const payload = {
      ...data,
      role: "student",
      interests: (data.interests || "").split(",").map((s: string) => s.trim())
    };
    const res = await api.post("/auth/signup", payload);
    localStorage.setItem("token", res.data.token);
    router.push("/(student)/dashboard");
  };
  return <div className="container"><MultiStepForm role="student" onSubmit={submit} /></div>;
}
