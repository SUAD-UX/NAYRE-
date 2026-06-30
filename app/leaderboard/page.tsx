"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const rankColors: Record<number, string> = {
  1: "#FFD700",
  2: "#C0C0C0",
  3: "#CD7F32",
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaders() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("reputation_score", { ascending: false })
        .limit(20);

      if (data) {
        const ranked = data.map((profile, i) => ({
          rank: i + 1,
          username: profile.username || "unnamed",
          reputation: profile.reputation_score || 0,
          wins: profile.wins || 0,
          level: profile.level || 1,
          avatar_url: profile.avatar_url,
        }));
        setLeaders(ranked);
      }
      setLoading(false);
    }
    fetchLeaders();
  }, []);

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#080010", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#9F7AEA", fontFamily: "'Space Grotesk', sans-serif" }}>Loading rankings...</div>
      </main>
    );
  }

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <main style={{
      minHeight: "100vh", background: "#080010", color: "white",
      padding: "1.5rem", fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at top, rgba(124,58,237,0.1) 0%, transparent 60%)",
      }} />

      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "2.5rem", textAlign: "center" }}
        >
          <h1 style={{
            fontSize: "clamp(1.8rem, 6vw, 2.5rem)", fontWeight: "700", marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Global Leaderboard
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
            Ranked by reputation. Earned through performance.
          </p>
        </motion.div>

        {leaders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>
            No challengers yet. Be the first to compete! 🔥
          </p>
        ) : (
          <>
            {top3.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "0.75rem", marginBottom: "2rem",
                }}
              >
                {[top3[1], top3[0], top3[2]].filter(Boolean).map((leader) => (
                  <div key={leader.rank} style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))",
                    border: `1px solid ${leader.rank === 1 ? "rgba(255,215,0,0.4)" : "rgba(168,85,247,0.2)"}`,
                    borderRadius: "16px", padding: "1rem", textAlign: "center",
                    marginTop: leader.rank === 1 ? "0" : "1.5rem",
                  }}>
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>
                      {leader.rank === 1 ? "🥇" : leader.rank === 2 ? "🥈" : "🥉"}
                    </div>
                    <div style={{ fontWeight: "700", fontSize: "0.85rem", color: "#E9D5FF", marginBottom: "0.2rem" }}>
                      @{leader.username}
                    </div>
                    <div style={{ fontSize: "1.1rem", fontWeight: "700", color: rankColors[leader.rank] || "#A855F7" }}>
                      {leader.reputation.toLocaleString()}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

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
                      ? "1px solid rgba(168,85,247,0.3)"
                      : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px", padding: "0.85rem 1rem",
                    display: "flex", alignItems: "center", gap: "0.75rem",
                  }}
                >
                  <div style={{
                    width: "28px", textAlign: "center", fontWeight: "700", fontSize: "0.9rem",
                    color: rankColors[leader.rank] || "#6B7280", flexShrink: 0,
                  }}>
                    {leader.rank <= 3 ? ["🥇", "🥈", "🥉"][leader.rank - 1] : `#${leader.rank}`}
                  </div>

                  {leader.avatar_url ? (
                    <img
                      src={leader.avatar_url}
                      alt=""
                      style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        objectFit: "cover", flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem", fontWeight: "700", color: "white",
                    }}>
                      {leader.username[0]?.toUpperCase()}
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: "600", color: "#E9D5FF", fontSize: "0.85rem" }}>
                      @{leader.username}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#9F7AEA" }}>
                      Level {leader.level}
                    </div>
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontWeight: "700", color: "#A855F7", fontSize: "0.85rem" }}>
                      {leader.reputation.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "#6B7280" }}>
                      {leader.wins} wins
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", color: "#374151", fontSize: "0.8rem", marginTop: "2rem" }}
        >
          Rankings update live. Compete to climb. 🔥
        </motion.p>
      </div>
    </main>
  );
}
