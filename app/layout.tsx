import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAYRE",
  description: "Compete. Build Reputation. Get Discovered.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Space Grotesk', sans-serif", margin: 0, background: "#080010" }}>
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: "1rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid rgba(168,85,247,0.15)",
          backdropFilter: "blur(20px)",
          background: "rgba(8,0,16,0.8)",
        }}>
          <a href="/" style={{
            fontSize: "1.2rem", fontWeight: "700", textDecoration: "none",
            background: "linear-gradient(135deg, #E9D5FF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            NAYRE
          </a>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <a href="/leaderboard" style={navLinkStyle}>Leaderboard</a>
            <a href="/profile" style={navLinkStyle}>Profile</a>
            <a href="/login" style={navLinkStyle}>Login</a>
            <a href="/signup" style={{
              background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              color: "white", textDecoration: "none",
              padding: "0.5rem 1.1rem", borderRadius: "100px",
              fontSize: "0.85rem", fontWeight: "600",
            }}>
              Join Now
            </a>
          </div>
        </nav>

        <div style={{ paddingTop: "4rem" }}>
          {children}
        </div>
      </body>
    </html>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: "#9F7AEA",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: "500",
};
