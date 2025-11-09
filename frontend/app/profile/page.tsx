"use client";
import { useEffect, useState } from "react";
import api, { setAuth } from "@/lib/api";
import { ProfileUpdateSchema } from "@/lib/validators";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) setAuth(tok);
    (async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          enrollmentNo: data.enrollmentNo || "",
          branch: data.branch || "",
          semester: data.semester || "",
          department: data.department || "",
          designation: data.designation || "",
          experienceYears: data.experienceYears ?? "",
          moderationPreference: data.moderationPreference || "standard",
          interests: (data.interests || []).join(", "),
          expertiseSubjects: (data.expertiseSubjects || []).join(", ")
        });
      } catch {
        // Silent; page will still render edit form
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    const payload = {
      ...form,
      interests: (form.interests || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      expertiseSubjects: (form.expertiseSubjects || "").split(",").map((s: string) => s.trim()).filter(Boolean)
    };

    const parsed = ProfileUpdateSchema.safeParse(payload);
    if (!parsed.success) {
      alert(parsed.error.errors.map(e => e.message).join("\n"));
      return;
    }
    const { data } = await api.put("/auth/profile", parsed.data);
    setUser(data);
    alert("Profile updated");
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "1rem" }}>
      <div>
        <div className="card">
          <h3>Profile</h3>
          <div style={{ color: "var(--muted)" }}>{user?.email}</div>
          <div className="badge" style={{ marginTop: "0.5rem" }}>{user?.role}</div>
        </div>
      </div>
      <div>
        <div className="card">
          <h3>Edit Details</h3>
          <label className="label">Full Name</label>
          <input className="input" value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} />
          <label className="label">Phone</label>
          <input className="input" value={form.phone || ""} onChange={e => setForm({ ...form, phone: e.target.value })} />

          {user?.role === "student" && (
            <>
              <label className="label">Enrollment No</label>
              <input className="input" value={form.enrollmentNo || ""} onChange={e => setForm({ ...form, enrollmentNo: e.target.value })} />

              <label className="label">Branch</label>
              <input className="input" value={form.branch || ""} onChange={e => setForm({ ...form, branch: e.target.value })} />

              <label className="label">Semester</label>
              <input className="input" value={form.semester || ""} onChange={e => setForm({ ...form, semester: e.target.value })} />

              <label className="label">Interests</label>
              <input className="input" placeholder="comma separated" value={form.interests || ""} onChange={e => setForm({ ...form, interests: e.target.value })} />
            </>
          )}

          {user?.role === "evaluator" && (
            <>
              <label className="label">Department</label>
              <input className="input" value={form.department || ""} onChange={e => setForm({ ...form, department: e.target.value })} />

              <label className="label">Designation</label>
              <input className="input" value={form.designation || ""} onChange={e => setForm({ ...form, designation: e.target.value })} />

              <label className="label">Experience (years)</label>
              <input className="input" type="number" value={form.experienceYears || ""} onChange={e => setForm({ ...form, experienceYears: e.target.value })} />

              <label className="label">Moderation Preference</label>
              <select className="select" value={form.moderationPreference || "standard"} onChange={e => setForm({ ...form, moderationPreference: e.target.value })}>
                <option value="lenient">lenient</option>
                <option value="standard">standard</option>
                <option value="strict">strict</option>
              </select>

              <label className="label">Expertise Subjects</label>
              <input className="input" placeholder="comma separated" value={form.expertiseSubjects || ""} onChange={e => setForm({ ...form, expertiseSubjects: e.target.value })} />
            </>
          )}

          <div style={{ marginTop: "1rem" }}>
            <button className="button" onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
