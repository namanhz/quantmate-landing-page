"use client";

export default function GradientOrbs() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Gold orb - top right */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-1 25s ease-in-out infinite alternate",
        }}
      />

      {/* Purple orb - center left */}
      <div
        className="absolute top-1/3 -left-24 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-2 30s ease-in-out infinite alternate",
        }}
      />

      {/* Blue orb - bottom right */}
      <div
        className="absolute -bottom-20 right-1/4 w-[350px] h-[350px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-3 35s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
