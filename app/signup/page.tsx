"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [signedUpUsername, setSignedUpUsername] = useState("");

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        username: username,
        reputation_score: 0,
        wins: 0,
        level: 1,
      });
      setSignedUpUsername(username);
      setShowShare(true);
    }

    setLoading(false);
  }

  const tweetText = encodeURIComponent(
    `Just joined NAYRE — the arena where AI creators, coders, marketers & traders compete and build real reputation. 🔥\n\nWhere the best burn brightest.\n\nJoin here 👇\nnayre.vercel.app`
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  if (showShare) {
    return (
      <main style={{
        minHeight: "100vh", background: "#080010", color: "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem", fontFamily: "'Space Grotesk', sans-serif",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))",
            border: "1px solid rgba(168,85,247,0.4)",
            borderRadius: "24px", padding: "2.5rem",
            maxWidth: "420px", width: "100%",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            boxShadow: "0 0 40px rgba(124,58,237,0.2)",
          }}
        >
          {/* Fire animation */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          >
            🔥
          </motion.div>

          <h1 style={{
            fontSize: "1.6rem", fontWeight: "700", marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            You're in, @{signedUpUsername}!
          </h1>

          <p style={{ color: "#9F7AEA", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.6 }}>
            Welcome to NAYRE. Where the best burn brightest.
            Let the world know you've arrived. 🔥
          </p>

          {/* Tweet preview */}
          <div style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px", padding: "1.25rem",
            marginBottom: "1.5rem", textAlign: "left",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.8rem", fontWeight: "700", color: "white",
              }}>
                {signedUpUsername[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: "600", fontSize: "0.85rem", color: "#E9D5FF" }}>@{signedUpUsername}</div>
                <div style={{ fontSize: "0.7rem", color: "#6B7280" }}>Just now</div>
              </div>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#C4B5FD", lineHeight: 1.6, margin: 0 }}>
              Just joined NAYRE — the arena where AI creators, coders, marketers & traders compete and build real reputation. 🔥<br /><br />
              Where the best burn brightest.<br /><br />
              Join here 👇<br />
              <span style={{ color: "#A855F7" }}>nayre.vercel.app</span>
            </p>
          </div>

          {/* Share button */}
          <motion.a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "block",
              background: "#000000",
              color: "white", textDecoration: "none",
              padding: "0.9rem", borderRadius: "100px",
              fontSize: "0.95rem", fontWeight: "600",
              marginBottom: "0.75rem",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            𝕏 Share on X
          </motion.a>

          {/* Skip button */}
          <motion.a
            href="/arena"
            whileHover={{ scale: 1.02 }}
            style={{
              display: "block",
              background: "transparent",
              color: "#6B7280", textDecoration: "none",
              padding: "0.75rem", borderRadius: "100px",
              fontSize: "0.85rem",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            Skip → Enter Arena
          </motion.a>
        </motion.div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: "100vh", background: "#080010", color: "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem", fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(168,85,247,0.3)",
          borderRadius: "20px", padding: "2.5rem",
          maxWidth: "400px", width: "100%",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 style={{
          fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem",
          background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Join NAYRE
        </h1>
        <p style={{ color: "#9F7AEA", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Create your account and start competing
        </p>

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              color: "white", border: "none", padding: "0.9rem",
              borderRadius: "100px", fontSize: "1rem", fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              marginTop: "0.5rem",
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p style={{
            marginTop: "1rem", fontSize: "0.85rem",
            color: "#FCA5A5", textAlign: "center",
          }}>
            {message}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "#6B7280" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#A855F7", textDecoration: "none", fontWeight: "600" }}>
            Sign In
          </a>
        </p>
      </motion.div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem 1rem",
  marginBottom: "1rem",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  fontSize: "0.9rem",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};
