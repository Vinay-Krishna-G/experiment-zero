"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface ArchiveReferenceProps {
  type: "experiment" | "blueprint" | "research";
  id: string;
  title: string;
}

function ArchiveReferenceInner({ type, id, title }: ArchiveReferenceProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigate = () => {
    const params = new URLSearchParams(searchParams.toString());
    const queryKey = type === "experiment" ? "exp" : type === "blueprint" ? "bp" : "rl";
    const sectionId = type === "experiment" ? "experiments" : type === "blueprint" ? "blueprints" : "research-log";
    
    params.set(queryKey, id);
    const targetPath = pathname === "/" ? "" : "/";
    router.push(`${targetPath}?${params.toString()}#${sectionId}`, { scroll: false });
    
    // Smooth scroll manually after updating URL state
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      });
    });
  };

  const displayId = type === "experiment" && !id.toLowerCase().startsWith("exp-") ? `EXP-${id}` : id;

  return (
    <button
      onClick={handleNavigate}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        fontFamily: "var(--font-mono)",
        fontSize: "0.55rem",
        color: "var(--fg-secondary)",
        letterSpacing: "0.08em",
        cursor: "pointer",
        textDecoration: "underline",
        textDecorationStyle: "dotted",
        textUnderlineOffset: "4px",
        textAlign: "left",
        display: "block",
        lineHeight: 1.5,
        transition: "color 0.2s ease"
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-emerald)" }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-secondary)" }}
    >
      REF: {displayId.toUpperCase()} — {title}
    </button>
  );
}

export default function ArchiveReference(props: ArchiveReferenceProps) {
  return (
    <Suspense fallback={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--fg-subtle)" }}>REF: {props.id.toUpperCase()} — {props.title}</span>}>
      <ArchiveReferenceInner {...props} />
    </Suspense>
  );
}
