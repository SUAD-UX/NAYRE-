"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username: username,
        reputation_score: 0,
        wins: 0,
        level: 1,
      });

      if (profileError) {
        setMessage(profileError.message);
      } else {
        setMessage("Welcome to NAYRE! Check your email to confirm your account.");
      }
    }

    setLoading(false);
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
          borderRadius: "20px",
          padding: "2.5rem",
          maxWidth: "400px",
          width: "100%",
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
            color: message.includes("Welcome") ? "#86EFAC" : "#FCA5A5",
            textAlign: "center",
          }}>
            {message}
          </p>
        )}
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
};
