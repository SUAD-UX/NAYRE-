"use client";
import { motion } from "framer-motion";

const leaders = [
  { rank: 1, username: "ADA_2_", reputation: 9842, wins: 48, winRate: "71%", badge: "🏆 Prompt Master", level: 18 },
  { rank: 2, username: "ZeroX", reputation: 8631, wins: 41, winRate: "68%", badge: "🎨 Creative Genius", level: 16 },
  { rank: 3, username: "NovaMind", reputation: 7940, wins: 35, winRate: "65%", badge: "⚡ Consistency King", level: 15 },
  { rank: 4, username: "PrompterX", reputation: 6823, wins: 29, winRate: "61%", badge: "🔥 Trend Setter", level: 13 },
  { rank: 5, username: "AIForge", reputation: 5910, wins: 24, winRate: "58%", badge: "🎯 Sharp Mind", level: 11 },
  { rank: 6, username: "ByteQueen", reputation: 4872, wins: 19, winRate: "54%", badge: "⭐ Rising Star", level: 9 },
  { rank: 7, username: "PromptKing", reputation: 3941, wins: 15, winRate: "51%", badge: "🚀 Climber", level: 8 },
  { rank: 8, username: "SynthWave", reputation: 2830, wins: 11, winRate: "47%", badge: "💡 Innovator", level: 6 },
  { rank: 9, username: "CodeMancer", reputation: 1920, wins: 7, winRate: "43%", badge: "🌱 Newcomer", level: 4 },
  { rank: 10, username: "PixelDrift", reputation: 980, wins: 3, winRate: "38%", badge: "🌱 Newcomer", level: 2 },
];

const rankColors: Record<number, string> = {
  1: "#FFD700",
  2: "#C0C0C0",
  3: "#CD7F32",
};

export default function Leaderboard() {
  return (
    <main style={{
      minHeight: "100vh", background: "#080010", color: "white",
      padding: "2rem", fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at top, rgba(124,58,237,0.1) 0%, transparent 60%)",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
          <h1 style={{
            fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Global Leaderboard
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.95rem" }}>
            Ranked by reputation. Earned through performance.
          </p>
        </motion.div>

        {/* Top 3 podium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem", marginBottom: "2rem",
          }}
        >
          {[leaders[1], leaders[0], leaders[2]].map((leader, i) => (
            <div key={leader.rank} style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))",
              border: `1px solid ${leader.rank === 1 ? "rgba(255,215,0,0.4)" : "rgba(168,85,247,0.2)"}`,
              borderRadius: "16px", padding: "1.25rem", textAlign: "center",
              marginTop: leader.rank === 1 ? "0" : "1.5rem",
              boxShadow: leader.rank === 1 ? "0 0 30px rgba(255,215,0,0.1)" : "none",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {leader.rank === 1 ? "🥇" : leader.rank === 2 ? "🥈" : "🥉"}
              </div>
              <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#E9D5FF", marginBottom: "0.25rem" }}>
                @{leader.username}
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: "700", color: rankColors[leader.rank] || "#A855F7" }}>
                {leader.reputation.toLocaleString()}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#6B7280", marginTop: "0.25rem" }}>
                reputation
              </div>
            </div>
          ))}
        </motion.div>

        {/* Full leaderboard */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              style={{
                background: leader.rank <= 3
                  ? "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))"
                  : "rgba(255,255,255,0.03)",
                border: leader.rank <= 3
                  ? `1px solid rgba(168,85,247,0.3)`
                  : "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px", padding: "1rem 1.25rem",
                display: "flex", alignItems: "center", gap: "1rem",
              }}
            >
              {/* Rank */}
              <div style={{
                width: "32px", textAlign: "center", fontWeight: "700", fontSize: "1rem",
                color: rankColors[leader.rank] || "#6B7280", flexShrink: 0,
              }}>
                {leader.rank <= 3 ? ["🥇", "🥈", "🥉"][leader.rank - 1] : `#${leader.rank}`}
              </div>

              {/* Avatar placeholder */}
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.8rem", fontWeight: "700", color: "white",
              }}>
                {leader.username[0]}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: "600", color: "#E9D5FF", fontSize: "0.9rem" }}>
                  @{leader.username}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#9F7AEA" }}>
                  {leader.badge} · Level {leader.level}
                </div>
              </div>

              {/* Stats */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: "700", color: "#A855F7", fontSize: "0.95rem" }}>
                  {leader.reputation.toLocaleString()}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#6B7280" }}>
                  {leader.wins} wins · {leader.winRate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", color: "#374151", fontSize: "0.8rem", marginTop: "3rem" }}
        >
          Rankings update after each challenge ends. Compete to climb. 🔥
        </motion.p>
      </div>
    </main>
  );
}
