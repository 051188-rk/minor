"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaClipboardList, FaUserCircle, FaHome, FaCheckDouble } from "react-icons/fa";

export default function Header({ role }: { role?: "student" | "evaluator" }) {
  const pathname = usePathname();

  const NavLink = ({ href, label, Icon }: { href: string; label: string; Icon: any }) => (
    <Link
      href={href}
      className="button"
      style={{
        background: pathname === href ? "var(--primary-600)" : "var(--primary)",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        marginRight: "0.5rem"
      }}
    >
      <Icon /> {label}
    </Link>
  );

  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0" }}>
        <Link href="/" style={{ fontWeight: 700, color: "var(--fg)", textDecoration: "none" }}>
          MockTest
        </Link>
        <nav>
          <NavLink href="/" label="Home" Icon={FaHome} />
          {role === "student" && (
            <>
              <NavLink href="/(student)/dashboard" label="Dashboard" Icon={FaClipboardList} />
              <NavLink href="/(student)/tests/new" label="New Test" Icon={FaCheckDouble} />
            </>
          )}
          {role === "evaluator" && (
            <>
              <NavLink href="/(evaluator)/dashboard" label="Dashboard" Icon={FaClipboardList} />
              <NavLink href="/(evaluator)/evaluations/new" label="New Evaluation" Icon={FaCheckDouble} />
            </>
          )}
          <NavLink href="/profile" label="Profile" Icon={FaUserCircle} />
        </nav>
      </div>
    </header>
  );
}
