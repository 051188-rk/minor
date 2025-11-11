"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentTestForm from "@/components/StudentTestForm";
import api, { setAuth } from "@/lib/api";
import { TestCreateSchema } from "@/lib/validators";

export default function StudentNewTest() {
  const router = useRouter();

  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) setAuth(tok);
  }, []);

  const create = async (payload: any) => {
    const parsed = TestCreateSchema.safeParse(payload);
    if (!parsed.success) {
      alert(parsed.error.errors.map(e => e.message).join("\n"));
      return;
    }
    
    try {
      const { data } = await api.post("/student/tests", parsed.data);
      
      // Save the newly created test to localStorage
      localStorage.setItem(`test-${data._id}`, JSON.stringify(data));
      
      router.push(`/(student)/tests/${data._id}/attempt`);
    } catch (error) {
      console.error("Failed to create test", error);
      alert("Failed to create test.");
    }
  };

  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "1rem" }}>
      <div></div>
      <div><StudentTestForm onCreate={create} /></div>
    </div>
  );
}