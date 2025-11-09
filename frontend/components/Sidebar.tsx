"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaPlusCircle, FaFlag, FaRegFilePdf } from "react-icons/fa";

export default function Sidebar({ role }: { role: "student" | "evaluator" }) {
  const pathname = usePathname();

  const Item = ({ href, label, Icon }: { href: string; label: string; Icon: any }) => {
    const active = pathname.startsWith(href);
    return (
      <Link
        href={href}
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.6rem 0.8rem",
          borderColor: active ? "var(--primary)" : "var(--border)",
          textDecoration: "none",
          color: "inherit"
        }}
      >
        <Icon color={active ? "var(--primary)" : "var(--muted)"} />
        <span style={{ fontWeight: 600 }}>{label}</span>
      </Link>
    );
  };

  return (
    <aside style={{ width: 260, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <Item href={role === "student" ? "/(student)/dashboard" : "/(evaluator)/dashboard"} label="Dashboard" Icon={FaTachometerAlt} />
      {role === "student" ? (
        <Item href="/(student)/tests/new" label="Create Test" Icon={FaPlusCircle} />
      ) : (
        <>
          <Item href="/(evaluator)/evaluations/new" label="Create Evaluation" Icon={FaPlusCircle} />
          <Item href="/(evaluator)/dashboard" label="Flagged Sheets" Icon={FaFlag} />
          <Item href="/(evaluator)/dashboard" label="Recent Sheets" Icon={FaRegFilePdf} />
        </>
      )}
    </aside>
  );
}
