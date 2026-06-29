"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setUser(user);
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (data) {
        setProfile(data);
        setUsername(data.username || "");
      }
      setLoading(false);
    }
    getProfile();
  }, []);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });
    if (uploadError) {
      setMessage("Upload failed. Try again.");
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const avatarUrl = data.publicUrl;
    await supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("id", user.id);
    setProfile({ ...profile, avatar_url: avatarUrl });
    setMessage("Avatar updated!");
    setUploading(false);
    setTimeout(() => setMessage(""), 3000);
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ username }).eq("id", user.id);
    if (error) {
      setMessage("Failed to save. Try again.");
    } else {
      setProfile({ ...profile, username });
      setMessage("Profile updated!");
      setEditing(false);
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  }

  if (loading) return (
    <main style={{ minHeight: "100vh", background: "#080010", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#9F7AEA", fontFamily: "'Space Grotesk', sans-serif" }}>Loading...</div>
    </main>
  );

  if (!user) return (
    <main style={{ minHeight: "100vh", background: "#080010", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#9F7AEA", marginBottom: "1rem" }}>You need to be signed in to view your profile.</p>
        <a href="/signup" style={{
          background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "white",
          padding: "0.75rem 2rem", borderRadius: "100px", textDecoration: "none", fontWeight: "600",
        }}>Join NAYRE</a>
      </div>
    </main>
  );

  return (
    <main style={{
      minHeight: "100vh", background: "#080010", color: "white",
      padding: "1.5rem", fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at top, rgba(124,58,237,0.1) 0%, transparent 60%)",
      }} />

      <div style={{ maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))",
            border: "1px solid rgba(168,85,247,0.4)",
            borderRadius: "24px", padding: "2rem",
            marginBottom: "1rem",
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 40px rgba(124,58,237,0.15)",
          }}
        >
          {/* Avatar + Info — stacked on mobile */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "1rem",
            marginBottom: "2rem", textAlign: "center",
          }}>
            <div style={{ position: "relative" }}>
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="avatar"
                  style={{
                    width: "90px", height: "90px", borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: "0 0 20px rgba(168,85,247,0.4)",
                    border: "2px solid rgba(168,85,247,0.5)",
                  }}
                />
              ) : (
                <div style={{
                  width: "90px", height: "90px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2.5rem", fontWeight: "700", color: "white",
                  boxShadow: "0 0 20px rgba(168,85,247,0.4)",
                }}>
                  {(profile?.username || user.email)?.[0]?.toUpperCase()}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "#7C3AED", border: "2px solid #080010",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "0.7rem",
                }}
              >
                {uploading ? "..." : "📷"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
            </div>

            <div>
              <h1 style={{
                fontSize: "1.6rem", fontWeight: "700", margin: "0 0 0.3rem 0",
                background: "linear-gradient(135deg, #E9D5FF, #A855F7)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                @{profile?.username || "unnamed"}
              </h1>
              <p style={{
                color: "#6B7280", fontSize: "0.78rem",
                margin: "0 0 0.2rem 0",
                wordBreak: "break-all",
                maxWidth: "260px",
              }}>
                {user.email}
              </p>
              <p style={{ color: "#4B5563", fontSize: "0.72rem", margin: 0 }}>
                Tap 📷 to change avatar
              </p>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem", marginBottom: "1.5rem",
          }}>
            {[
              { label: "Reputation", value: profile?.reputation_score || 0 },
              { label: "Wins", value: profile?.wins || 0 },
              { label: "Level", value: profile?.level || 1 },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", padding: "0.85rem", textAlign: "center",
              }}>
                <div style={{ fontSize: "1.4rem", fontWeight: "700", color: "#A855F7" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#6B7280", marginTop: "0.2rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.75rem", color: "#6B7280", marginBottom: "0.6rem" }}>BADGES</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["🌱 Newcomer"].map((badge) => (
                <span key={badge} style={{
                  fontSize: "0.75rem", padding: "0.3rem 0.75rem", borderRadius: "100px",
                  background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)",
                  color: "#C4B5FD",
                }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Edit username */}
          {!editing ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEditing(true)}
              style={{
                background: "rgba(255,255,255,0.06)", color: "#C4B5FD",
                border: "1px solid rgba(168,85,247,0.3)", padding: "0.75rem",
                borderRadius: "100px", fontSize: "0.9rem", fontWeight: "600",
                cursor: "pointer", width: "100%",
              }}
            >
              ✏️ Edit Username
            </motion.button>
          ) : (
            <div>
              <p style={{ fontSize: "0.8rem", color: "#9F7AEA", marginBottom: "0.5rem" }}>Username</p>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%", padding: "0.75rem 1rem", marginBottom: "0.75rem",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(168,85,247,0.3)",
                  borderRadius: "10px", color: "white", fontSize: "0.9rem",
                  fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                }}
              />
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    flex: 1, background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                    color: "white", border: "none", padding: "0.75rem",
                    borderRadius: "100px", fontSize: "0.9rem", fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {saving ? "Saving..." : "Save"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setEditing(false)}
                  style={{
                    flex: 1, background: "rgba(255,255,255,0.06)", color: "#9F7AEA",
                    border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem",
                    borderRadius: "100px", fontSize: "0.9rem", cursor: "pointer",
                  }}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          )}

          {message && (
            <p style={{ color: "#86EFAC", fontSize: "0.85rem", textAlign: "center", marginTop: "1rem" }}>
              {message}
            </p>
          )}
        </motion.div>

        {/* Sign out */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/";
          }}
          style={{
            width: "100%", background: "transparent", color: "#6B7280",
            border: "1px solid rgba(255,255,255,0.06)", padding: "0.75rem",
            borderRadius: "100px", fontSize: "0.85rem", cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Sign Out
        </motion.button>
      </div>
    </main>
  );
}
