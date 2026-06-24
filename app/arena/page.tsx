"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const challenges = [
  {
    id: 1,
    title: "Best Luxury Fashion Prompt",
    description: "Create the most compelling AI prompt for a luxury fashion campaign. Judge by creativity, specificity, and output quality.",
    deadline: "48 hours left",
    submissions: 24,
    prize: "🏆 Top Creator Badge",
  },
  {
    id: 2,
    title: "Best Startup Pitch Prompt",
    description: "Craft a prompt that gets AI to write the most convincing startup pitch. Must include market size, problem, solution.",
    deadline: "72 hours left",
    submissions: 18,
    prize: "🏆 Top Creator Badge",
  },
  {
    id: 3,
    title: "Best Marketing Campaign Prompt",
    description: "Generate a prompt that produces a full marketing campaign strategy for a fictional product.",
    deadline: "24 hours left",
    submissions: 31,
    prize: "🏆 Top Creator Badge",
  },
];

export default function Arena() {
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);

  return (
    <main style={{
      minHeight: "100vh", background: "#080010", color: "white",
      padding: "2rem", fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {/* Background glow */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at top, rgba(124,58,237,0.15) 0%, transparent 60%)",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3rem" }}
        >
          <div style={{
            display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em",
            color: "#A855F7", textTransform: "uppercase", marginBottom: "0.75rem",
            border: "1px solid rgba(168,85,247,0.3)", padding: "0.25rem 0.75rem",
            borderRadius: "100px",
          }}>
            🔥 Live Arena
          </div>
          <h1 style={{
            fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Prompt Arena
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.95rem" }}>
            Pick a challenge. Submit your best prompt. Let the community decide.
          </p>
        </motion.div>

        {/* Challenges */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {challenges.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActiveChallenge(
                activeChallenge === challenge.id ? null : challenge.id
              )}
              style={{
                background: activeChallenge === challenge.id
                  ? "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(168,85,247,0.15))"
                  : "rgba(255,255,255,0.03)",
                border: activeChallenge === challenge.id
                  ? "1px solid rgba(168,85,247,0.6)"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px", padding: "1.5rem",
                cursor: "pointer", transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#E9D5FF", margin: 0 }}>
                  {challenge.title}
                </h2>
                <span style={{
                  fontSize: "0.7rem", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)",
                  padding: "0.2rem 0.6rem", borderRadius: "100px", whiteSpace: "nowrap", marginLeft: "1rem",
                }}>
                  ⏱ {challenge.deadline}
                </span>
              </div>

              <p style={{ fontSize: "0.85rem", color: "#9F7AEA", marginBottom: "1rem", lineHeight: 1.6 }}>
                {challenge.description}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>
                    👥 {challenge.submissions} submissions
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>
                    {challenge.prize}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => { e.stopPropagation(); }}
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                    color: "white", border: "none", padding: "0.5rem 1.25rem",
                    borderRadius: "100px", fontSize: "0.85rem", fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Submit →
                </motion.button>
              </div>

              {/* Expanded submission form */}
              {activeChallenge === challenge.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(168,85,247,0.2)", paddingTop: "1.5rem" }}
                >
                  <p style={{ fontSize: "0.8rem", color: "#9F7AEA", marginBottom: "0.75rem" }}>
                    Your prompt submission:
                  </p>
                  <textarea
                    placeholder="Type your prompt here... Be specific, creative, and detailed."
                    style={{
                      width: "100%", minHeight: "120px", padding: "0.75rem",
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px", color: "white", fontSize: "0.9rem",
                      fontFamily: "inherit", outline: "none", resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                  <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                    <input
                      type="url"
                      placeholder="Screenshot URL (optional) — paste image link"
                      style={{
                        flex: 1, padding: "0.7rem 1rem",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px", color: "white", fontSize: "0.85rem",
                        fontFamily: "inherit", outline: "none",
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                        color: "white", border: "none", padding: "0.7rem 1.5rem",
                        borderRadius: "100px", fontSize: "0.85rem", fontWeight: "600",
                        cursor: "pointer", whiteSpace: "nowrap",
                      }}
                    >
                      Submit Entry
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Coming soon note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", color: "#374151", fontSize: "0.8rem", marginTop: "3rem" }}
        >
          More challenges drop every 24 hours. Sign up to compete.
        </motion.p>
      </div>
    </main>
  );
}