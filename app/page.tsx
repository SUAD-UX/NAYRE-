"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const arenas = [
  { icon: "✦", name: "Prompt Arena", description: "Battle with AI prompts. Best output wins.", status: "live" },
  { icon: "⌥", name: "Coding Arena", description: "Solve challenges. Ship faster than anyone.", status: "soon" },
  { icon: "◈", name: "Marketing Arena", description: "Craft campaigns that move people.", status: "soon" },
  { icon: "◇", name: "Business Arena", description: "Think bigger. Build smarter.", status: "soon" },
  { icon: "⟡", name: "Trading Arena", description: "Read the market. Outplay the field.", status: "soon" },
];

const dots = [
  { id: 0, x: 12, y: 18, size: 2, duration: 4 },
  { id: 1, x: 78, y: 25, size: 3, duration: 5 },
  { id: 2, x: 35, y: 60, size: 2, duration: 3.5 },
  { id: 3, x: 88, y: 70, size: 1.5, duration: 6 },
  { id: 4, x: 20, y: 85, size: 2.5, duration: 4.5 },
  { id: 5, x: 60, y: 10, size: 1, duration: 5.5 },
  { id: 6, x: 45, y: 45, size: 3, duration: 3 },
  { id: 7, x: 8, y: 55, size: 1.5, duration: 4 },
  { id: 8, x: 92, y: 40, size: 2, duration: 5 },
  { id: 9, x: 55, y: 80, size: 2.5, duration: 4.5 },
  { id: 10, x: 25, y: 30, size: 1.5, duration: 6 },
  { id: 11, x: 70, y: 92, size: 2, duration: 3.5 },
  { id: 12, x: 15, y: 70, size: 1, duration: 5 },
  { id: 13, x: 50, y: 15, size: 2.5, duration: 4 },
  { id: 14, x: 82, y: 88, size: 1.5, duration: 5.5 },
];

function SilkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 5; i++) {
        const gradient = ctx.createRadialGradient(
          canvas.width * (0.2 + i * 0.15) + Math.sin(time * 0.4 + i) * 120,
          canvas.height * (0.3 + i * 0.1) + Math.cos(time * 0.3 + i) * 100,
          0,
          canvas.width * (0.2 + i * 0.15) + Math.sin(time * 0.4 + i) * 120,
          canvas.height * (0.3 + i * 0.1) + Math.cos(time * 0.3 + i) * 100,
          canvas.width * 0.45
        );
        gradient.addColorStop(0, `rgba(124, 58, 237, ${0.35 - i * 0.04})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.2 - i * 0.03})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      for (let j = 0; j < 8; j++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * (0.2 + j * 0.1));
        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height * (0.2 + j * 0.1) +
            Math.sin(x * 0.008 + time * 0.5 + j * 0.8) * 60 +
            Math.sin(x * 0.004 + time * 0.3 + j) * 40;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(196, 181, 253, ${0.06 - j * 0.005})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      time += 0.012;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.9,
      }}
    />
  );
}

function ArenaCard({ arena, i }: { arena: typeof arenas[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{
        background: arena.status === "live"
          ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))"
          : "rgba(255,255,255,0.03)",
        border: arena.status === "live" ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px", padding: "1.5rem",
        cursor: arena.status === "live" ? "pointer" : "default",
        backdropFilter: "blur(10px)",
        boxShadow: arena.status === "live"
          ? "0 0 20px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem", color: arena.status === "live" ? "#C4B5FD" : "#4B5563" }}>
        {arena.icon}
      </div>
      <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.4rem", color: arena.status === "live" ? "#E9D5FF" : "#4B5563" }}>
        {arena.name}
      </h2>
      <p style={{ fontSize: "0.8rem", color: arena.status === "live" ? "#9F7AEA" : "#374151", marginBottom: "1rem", lineHeight: 1.5 }}>
        {arena.description}
      </p>
      <span style={{
        fontSize: "0.7rem", padding: "0.25rem 0.75rem", borderRadius: "100px", fontWeight: "600",
        letterSpacing: "0.1em", textTransform: "uppercase",
        background: arena.status === "live" ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.05)",
        color: arena.status === "live" ? "#C4B5FD" : "#4B5563",
        border: arena.status === "live" ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(255,255,255,0.08)",
      }}>
        {arena.status === "live" ? "● Live" : "Coming Soon"}
      </span>
    </motion.div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashPhase, setSplashPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashPhase(1), 800);
    const t2 = setTimeout(() => setSplashPhase(2), 2000);
    const t3 = setTimeout(() => setSplashPhase(3), 3200);
    const t4 = setTimeout(() => setShowSplash(false), 4200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "fixed", inset: 0, background: "#080010",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              zIndex: 100, overflow: "hidden",
            }}
          >
            {dots.map((dot) => (
              <motion.div
                key={dot.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0.1, 0.4] }}
                transition={{ duration: dot.duration, repeat: Infinity, delay: dot.id * 0.1 }}
                style={{
                  position: "absolute", left: `${dot.x}%`, top: `${dot.y}%`,
                  width: dot.size, height: dot.size, borderRadius: "50%", background: "#A855F7",
                }}
              />
            ))}
            <div style={{
              position: "absolute", width: "400px", height: "400px",
              background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
              borderRadius: "50%",
            }} />
            {splashPhase >= 1 && (
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  fontSize: "clamp(5rem, 18vw, 12rem)", fontWeight: "700", letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 40%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  lineHeight: 1, textAlign: "center", filter: "drop-shadow(0 0 40px rgba(168,85,247,0.5))",
                }}
              >
                NAYRE
              </motion.h1>
            )}
            {splashPhase >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ fontSize: "0.85rem", letterSpacing: "0.4em", color: "#9F7AEA", textTransform: "uppercase", marginTop: "1.5rem" }}
              >
                Where the best burn brightest
              </motion.p>
            )}
            {splashPhase >= 2 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  position: "absolute", width: "200px", height: "200px",
                  borderRadius: "50%", border: "1px solid rgba(168,85,247,0.6)",
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{
        minHeight: "100vh", background: "#080010", color: "white",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "2rem", position: "relative",
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        <SilkBackground />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ textAlign: "center", marginBottom: "4rem", zIndex: 1, position: "relative" }}
        >
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: "0.75rem", letterSpacing: "0.4em", color: "#9F7AEA", marginBottom: "1rem", textTransform: "uppercase" }}
          >
            Where the best burn brightest
          </motion.div>

          <h1 style={{
            fontSize: "clamp(4rem, 12vw, 8rem)", fontWeight: "700", letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 40%, #7C3AED 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            lineHeight: 1, marginBottom: "1.5rem",
          }}>
            NAYRE
          </h1>

          <p style={{ fontSize: "1.1rem", color: "#C4B5FD", marginBottom: "0.5rem", fontWeight: "300", letterSpacing: "0.05em" }}>
            Compete. Build Reputation. Get Discovered.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: "2.5rem" }}>
            The arena for AI creators, coders, marketers & traders.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "white", border: "none",
              padding: "1rem 2.5rem", borderRadius: "100px", fontSize: "1rem", fontWeight: "600",
              cursor: "pointer", letterSpacing: "0.05em", boxShadow: "0 0 30px rgba(168,85,247,0.4)",
            }}
          >
            Enter Prompt Arena →
          </motion.button>
        </motion.div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem", maxWidth: "1000px", width: "100%", zIndex: 1, position: "relative",
        }}>
          {arenas.map((arena, i) => <ArenaCard key={arena.name} arena={arena} i={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", gap: "3rem", marginTop: "4rem", zIndex: 1, flexWrap: "wrap", justifyContent: "center", position: "relative" }}
        >
          {[
            { value: "10K+", label: "Challengers" },
            { value: "#1", label: "Prompt Platform" },
            { value: "∞", label: "Reputation to Earn" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#A855F7", marginBottom: "0.25rem" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6B7280", letterSpacing: "0.05em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </main>
    </>
  );
}
