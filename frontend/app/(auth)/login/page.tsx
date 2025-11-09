"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api, { setAuth } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = async () => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setAuth(data.token);
    if (data.user.role === "student") router.push("/(student)/dashboard");
    else router.push("/(evaluator)/dashboard");
  };
  return (
    <div className="container">
      <div className="card">
        <h3>Login</h3>
        <label className="label">Email</label>
        <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="label">Password</label>
        <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div style={{ marginTop: "1rem" }}>
          <button className="button" onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
}
