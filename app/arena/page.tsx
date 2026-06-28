"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const challenges = [
  {
    id: "1",
    title: "Best Luxury Fashion Prompt",
    description: "Create the most compelling AI prompt for a luxury fashion campaign. Judge by creativity, specificity, and output quality.",
    deadline: "2 weeks left",
    submissions: 24,
    prize: "🏆 Top Creator Badge",
  },
  {
    id: "2",
    title: "Best Startup Pitch Prompt",
    description: "Craft a prompt that gets AI to write the most convincing startup pitch. Must include market size, problem, solution.",
    deadline: "2 weeks left",
    submissions: 18,
    prize: "🏆 Top Creator Badge",
  },
  {
    id: "3",
    title: "Best Marketing Campaign Prompt",
    description: "Generate a prompt that produces a full marketing campaign strategy for a fictional product.",
    deadline: "2 weeks left",
    submissions: 31,
    prize: "🏆 Top Creator Badge",
  },
];

export default function Arena() {
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  async function handleSubmit(challengeId: string) {
    if (!user) {
      setMessage("Please sign in to submit!");
      return;
    }
    if (!promptText.trim()) {
      setMessage("Please enter your prompt!");
      return;
    }
    setSubmitting(true);
    setMessage("");
    const { error } = await supabase.from("submissions").insert({
      challenge_id: challengeId,
      user_id: user.id,
      prompt_text: promptText,
      image_url: imageUrl || null,
      votes_count: 0,
    });
    if (error) {
      setMessage("Failed to submit. Try again.");
    } else {
      setMessage("Submission saved! 🔥");
      setPromptText("");
      setImageUrl("");
      setActiveChallenge(null);
    }
    setSubmitting(false);
    setTimeout(() => setMessage(""), 4000);
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#080010",
      color: "white",
      padding: "1rem",
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at top, rgba(124,58,237,0.1) 0%, transparent 60%)",
      }} />

      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "2rem" }}
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
            fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
            fontWeight: "700", marginBottom: "0.5rem", margin: "0 0 0.5rem 0",
            background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Prompt Arena
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.9rem", margin: 0 }}>
            Pick a challenge. Submit your best prompt. Let the community decide.
          </p>
        </motion.div>

        {/* Message banner */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: message.includes("🔥") ? "rgba(168,85,247,0.2)" : "rgba(239,68,68,0.2)",
              border: `1px solid ${message.includes("🔥") ? "rgba(168,85,247,0.4)" : "rgba(239,68,68,0.4)"}`,
              borderRadius: "10px", padding: "0.75rem 1rem",
              color: message.includes("🔥") ? "#C4B5FD" : "#FCA5A5",
              marginBottom: "1rem", fontSize: "0.9rem",
            }}
          >
            {message}
          </motion.div>
        )}

        {/* Challenges */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {challenges.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: activeChallenge === challenge.id
                  ? "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(168,85,247,0.15))"
                  : "rgba(255,255,255,0.03)",
                border: activeChallenge === challenge.id
                  ? "1px solid rgba(168,85,247,0.6)"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "1.25rem",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Challenge header */}
              <div style={{ marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h2 style={{ fontSize: "1rem", fontWeight: "600", color: "#E9D5FF", margin: 0, flex: 1 }}>
                    {challenge.title}
                  </h2>
                  <span style={{
                    fontSize: "0.65rem", color: "#F59E0B",
                    border: "1px solid rgba(245,158,11,0.3)",
                    padding: "0.2rem 0.5rem", borderRadius: "100px",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    ⏱ {challenge.deadline}
                  </span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#9F7AEA", margin: 0, lineHeight: 1.5 }}>
                  {challenge.description}
                </p>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                    👥 {challenge.submissions} submissions
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                    {challenge.prize}
                  </span>
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveChallenge(
                  activeChallenge === challenge.id ? null : challenge.id
                )}
                style={{
                  width: "100%",
                  background: activeChallenge === challenge.id
                    ? "rgba(255,255,255,0.06)"
                    : "linear-gradient(135deg, #7C3AED, #A855F7)",
                  color: "white", border: activeChallenge === challenge.id
                    ? "1px solid rgba(255,255,255,0.1)" : "none",
                  padding: "0.75rem",
                  borderRadius: "100px", fontSize: "0.9rem", fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {activeChallenge === challenge.id ? "Close ✕" : "Submit Entry →"}
              </motion.button>

              {/* Expanded form */}
              {activeChallenge === challenge.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginTop: "1.25rem", borderTop: "1px solid rgba(168,85,247,0.2)", paddingTop: "1.25rem" }}
                >
                  <p style={{ fontSize: "0.8rem", color: "#9F7AEA", marginBottom: "0.75rem", margin: "0 0 0.75rem 0" }}>
                    ✍️ Your prompt:
                  </p>
                  <textarea
                    placeholder="Type your prompt here... Be specific, creative, and detailed."
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    style={{
                      width: "100%", minHeight: "100px", padding: "0.75rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px", color: "white", fontSize: "0.9rem",
                      fontFamily: "inherit", outline: "none", resize: "vertical",
                      boxSizing: "border-box", marginBottom: "0.75rem",
                    }}
                  />
                  <input
                    type="url"
                    placeholder="Screenshot URL (optional)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{
                      width: "100%", padding: "0.7rem 1rem",
                      marginBottom: "0.75rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px", color: "white", fontSize: "0.85rem",
                      fontFamily: "inherit", outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSubmit(challenge.id)}
                    disabled={submitting}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                      color: "white", border: "none", padding: "0.85rem",
                      borderRadius: "100px", fontSize: "0.9rem", fontWeight: "600",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.6 : 1,
                    }}
                  >
                    {submitting ? "Submitting..." : "🔥 Submit Entry"}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", color: "#374151", fontSize: "0.8rem", marginTop: "2rem" }}
        >
          New challenges every 3 weeks. Submit early. Vote daily. Rise. 🔥
        </motion.p>
      </div>
    </main>
  );
}
