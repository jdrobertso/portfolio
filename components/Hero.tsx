"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LINES = [
  { prefix: "$ whoami", text: "", delay: 0 },
  { prefix: "", text: "jeremy-robertson", delay: 600, highlight: true, big: true },
  { prefix: "$ cat role.txt", text: "", delay: 1400 },
  { prefix: "", text: "DevOps Engineer & Software Architect", delay: 2000 },
  { prefix: "$ cat summary.txt", text: "", delay: 2900 },
  {
    prefix: "",
    text: "Building resilient systems that scale to millions — from cancer research platforms to Fortune 500 enterprise solutions.",
    delay: 3500,
    multiline: true,
  },
  { prefix: "$ ls ./status", text: "", delay: 4700 },
  { prefix: "", text: "available_for_collaboration.txt  open_to_new_roles.txt", delay: 5200, dim: true },
];

function TypewriterText({ text, speed = 28 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <>{displayed}</>;
}

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentTyping, setCurrentTyping] = useState<number | null>(null);

  useEffect(() => {
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setCurrentTyping(i);
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 2rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(57,211,83,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57,211,83,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse, rgba(57,211,83,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "900px", width: "100%", position: "relative" }}>
        {/* Terminal window chrome */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(57,211,83,0.05), 0 0 120px rgba(57,211,83,0.03)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: "var(--bg-secondary)",
              borderBottom: "1px solid var(--border)",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              {["#e25555", "#e8b23e", "#39d353"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: c,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
            <span
              className="mono"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.72rem",
                marginLeft: "8px",
                letterSpacing: "0.05em",
              }}
            >
              bash — jeremy@workstation: ~
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: "2rem 2rem 2.5rem", minHeight: "360px" }}>
            {LINES.map((line, i) => (
              <div
                key={i}
                style={{
                  opacity: visibleLines.includes(i) ? 1 : 0,
                  transition: "opacity 0.2s",
                  marginBottom: line.big ? "0.5rem" : "0.15rem",
                }}
              >
                {line.prefix && (
                  <div
                    className="mono"
                    style={{
                      color: "var(--green-primary)",
                      fontSize: "0.85rem",
                      marginBottom: "0.1rem",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>jeremy@workstation</span>
                    <span style={{ color: "var(--text-secondary)" }}>:</span>
                    <span style={{ color: "var(--cyan)" }}>~</span>
                    <span style={{ color: "var(--text-secondary)" }}> $ </span>
                    {visibleLines.includes(i) && (
                      <TypewriterText text={line.prefix.replace("$ ", "")} speed={40} />
                    )}
                  </div>
                )}
                {line.text && visibleLines.includes(i) && (
                  <div
                    className={line.big ? "" : "mono"}
                    style={{
                      color: line.highlight
                        ? "var(--green-primary)"
                        : line.dim
                        ? "var(--text-muted)"
                        : "var(--text-secondary)",
                      fontSize: line.big ? "clamp(2rem, 5vw, 3.5rem)" : "0.85rem",
                      fontWeight: line.big ? 600 : 400,
                      fontFamily: line.big ? "'Space Grotesk', sans-serif" : undefined,
                      letterSpacing: line.big ? "-0.02em" : "0.03em",
                      lineHeight: line.big ? 1.1 : 1.6,
                      marginBottom: line.big ? "1rem" : 0,
                      textShadow: line.highlight
                        ? "0 0 30px rgba(57,211,83,0.4)"
                        : "none",
                      maxWidth: line.multiline ? "680px" : "none",
                    }}
                  >
                    {currentTyping === i ? (
                      <TypewriterText text={line.text} speed={line.big ? 60 : 20} />
                    ) : (
                      line.text
                    )}
                  </div>
                )}
              </div>
            ))}
            {/* blinking cursor at end */}
            {visibleLines.length >= LINES.length && (
              <div
                className="mono"
                style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.5rem" }}
              >
                <span style={{ color: "var(--text-muted)" }}>jeremy@workstation</span>
                <span style={{ color: "var(--text-secondary)" }}>:</span>
                <span style={{ color: "var(--cyan)" }}>~</span>
                <span style={{ color: "var(--text-secondary)" }}> $ </span>
                <span
                  style={{
                    background: "var(--green-primary)",
                    color: "var(--bg-primary)",
                    padding: "0 3px",
                    animation: "blink 1s step-end infinite",
                  }}
                >
                  &nbsp;
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 6, duration: 0.5 }}
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#experience"
            className="mono"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              border: "1px solid var(--green-primary)",
              color: "var(--green-primary)",
              textDecoration: "none",
              fontSize: "0.82rem",
              letterSpacing: "0.08em",
              transition: "all 0.2s",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--green-glow)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 20px rgba(57,211,83,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            ./view_experience
          </a>
          <a
            href="#contact"
            className="mono"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.82rem",
              letterSpacing: "0.08em",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--green-primary)";
              (e.currentTarget as HTMLElement).style.color = "var(--green-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            ./get_in_touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
