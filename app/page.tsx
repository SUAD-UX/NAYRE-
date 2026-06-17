"use client";
import { motion } from "framer-motion";

const arenas = [
  {
    icon: "✦",
    name: "Prompt Arena",
    description: "Battle with AI prompts. Best output wins.",
    status: "live",
    color: "purple",
  },
  {
    icon: "⌥",
    name: "Coding Arena",
    description: "Solve challenges. Ship faster than anyone.",
    status: "soon",
    color: "gray",
  },
  {
    icon: "◈",
    name: "Marketing Arena",
    description: "Craft campaigns that move people.",
    status: "soon",
    color: "gray",
  },
  {
    icon: "◇",
    name: "Business Arena",
    description: "Think bigger. Build smarter.",
    status: "soon",
    color: "gray",
  },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #080010 0%, #0D0019 50%, #080010 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "4rem", zIndex: 1 }}
      >
        {/* Logo */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.4em",
            color: "#9F7AEA",
            marginBottom: "1rem",
            textTransform: "uppercase",
          }}
        >
          Where the best burn brightest
        </motion.div>

        <h1 style={{
          fontSize: "clamp(4rem, 12vw, 8rem)",
          fontWeight: "700",
          letterSpacing: "-0.02em",
          background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 40%, #7C3AED 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          marginBottom: "1.5rem",
        }}>
          NAYRE
        </h1>

        <p style={{
          fontSize: "1.1rem",
          color: "#C4B5FD",
          marginBottom: "0.5rem",
          fontWeight: "300",
          letterSpacing: "0.05em",
        }}>
          Compete. Build Reputation. Get Discovered.
        </p>

        <p style={{
          fontSize: "0.9rem",
          color: "#6B7280",
          marginBottom: "2.5rem",
        }}>
          Show the world what you can do through AI challenges.
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "linear-gradient(135deg, #7C3AED, #A855F7)",
            color: "white",
            border: "none",
            padding: "1rem 2.5rem",
            borderRadius: "100px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            letterSpacing: "0.05em",
            boxShadow: "0 0 30px rgba(168,85,247,0.4)",
          }}
        >
          Enter Prompt Arena →
        </motion.button>
      </motion.div>

      {/* Arena Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1rem",
        maxWidth: "900px",
        width: "100%",
        zIndex: 1,
      }}>
        {arenas.map((arena, i) => (
          <motion.div
            key={arena.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            style={{
              background: arena.status === "live"
                ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))"
                : "rgba(255,255,255,0.03)",
              border: arena.status === "live"
                ? "1px solid rgba(168,85,247,0.5)"
                : "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "1.5rem",
              cursor: arena.status === "live" ? "pointer" : "default",
              backdropFilter: "blur(10px)",
              boxShadow: arena.status === "live"
                ? "0 0 20px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div style={{
              fontSize: "1.5rem",
              marginBottom: "0.75rem",
              color: arena.status === "live" ? "#C4B5FD" : "#4B5563",
            }}>
              {arena.icon}
            </div>

            <h2 style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.4rem",
              color: arena.status === "live" ? "#E9D5FF" : "#4B5563",
            }}>
              {arena.name}
            </h2>

            <p style={{
              fontSize: "0.8rem",
              color: arena.status === "live" ? "#9F7AEA" : "#374151",
              marginBottom: "1rem",
              lineHeight: 1.5,
            }}>
              {arena.description}
            </p>

            <span style={{
              fontSize: "0.7rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "100px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: arena.status === "live"
                ? "rgba(168,85,247,0.3)"
                : "rgba(255,255,255,0.05)",
              color: arena.status === "live" ? "#C4B5FD" : "#4B5563",
              border: arena.status === "live"
                ? "1px solid rgba(168,85,247,0.4)"
                : "1px solid rgba(255,255,255,0.08)",
            }}>
              {arena.status === "live" ? "● Live" : "Coming Soon"}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{
          display: "flex",
          gap: "3rem",
          marginTop: "4rem",
          zIndex: 1,
        }}
      >
        {[
          { value: "10K+", label: "Challengers" },
          { value: "#1", label: "Prompt Platform" },
          { value: "∞", label: "Reputation to Earn" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#A855F7",
              marginBottom: "0.25rem",
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: "0.75rem",
              color: "#6B7280",
              letterSpacing: "0.05em",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </main>
  );
}
