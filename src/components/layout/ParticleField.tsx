"use client";

// Seeded PRNG — produces identical values on server and client
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeParticles() {
  const rand = seededRandom(42);
  const between = (min: number, max: number) => rand() * (max - min) + min;

  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${between(5, 95)}%`,
    top: `${between(10, 90)}%`,
    size: between(2, 4),
    duration: between(18, 35),
    delay: between(0, 15),
    xDrift: between(-80, 80),
    yDrift: between(-160, -60),
  }));
}

const particles = makeParticles();

export default function ParticleField() {
  return (
    <div
      className="fixed inset-0 z-[2] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ${p.delay}s linear infinite`,
            ["--fp-x" as string]: `${p.xDrift}px`,
            ["--fp-y" as string]: `${p.yDrift}px`,
          }}
        />
      ))}
    </div>
  );
}
