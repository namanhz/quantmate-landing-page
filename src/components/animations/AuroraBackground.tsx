"use client";

export default function AuroraBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Purple blob */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "aurora-drift-1 35s ease-in-out infinite alternate",
        }}
      />

      {/* Gold blob */}
      <div
        className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,168,83,0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "aurora-drift-2 40s ease-in-out infinite alternate",
        }}
      />

      {/* Teal blob */}
      <div
        className="absolute -bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "aurora-drift-3 30s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
