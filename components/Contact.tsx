"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const FIELDS = [
  { id: "name", label: "your_name", type: "text", placeholder: "John Doe" },
  { id: "email", label: "your_email", type: "email", placeholder: "john@example.com" },
  { id: "message", label: "message", type: "textarea", placeholder: "Let's build something great together..." },
];

export default function Contact() {
  const [inView, setInView] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("done");
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "6rem 2rem 8rem",
        maxWidth: "860px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "3rem" }}
      >
        <div
          className="mono"
          style={{
            color: "var(--text-muted)",
            fontSize: "0.78rem",
            marginBottom: "0.5rem",
            letterSpacing: "0.1em",
          }}
        >
          # section_04
        </div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Open a Connection
        </h2>
        <div
          style={{
            width: "40px",
            height: "2px",
            background: "var(--green-primary)",
            marginTop: "0.75rem",
            boxShadow: "0 0 8px var(--green-primary)",
          }}
        />
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            marginTop: "1rem",
            lineHeight: 1.7,
            maxWidth: "480px",
          }}
        >
          Whether you're scaling a platform, building something new, or looking for a
          DevOps architect — I'd love to hear about it.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
      >

        {/* Right: info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              padding: "1.5rem",
              borderRadius: "4px",
              marginBottom: "1.5rem",
            }}
          >
            <div
              className="mono"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.68rem",
                marginBottom: "1rem",
                letterSpacing: "0.08em",
              }}
            >
              $ cat contact.json
            </div>
            <div className="mono" style={{ fontSize: "0.78rem", lineHeight: 2 }}>
              <span style={{ color: "var(--text-muted)" }}>{"{"}</span>
              <br />
              &nbsp;&nbsp;
              <span style={{ color: "var(--cyan)" }}>"role"</span>
              <span style={{ color: "var(--text-muted)" }}>: </span>
              <span style={{ color: "var(--amber)" }}>"DevOps & Architect"</span>
              <span style={{ color: "var(--text-muted)" }}>,</span>
              <br />
              &nbsp;&nbsp;
              <span style={{ color: "var(--cyan)" }}>"location"</span>
              <span style={{ color: "var(--text-muted)" }}>: </span>
              <span style={{ color: "var(--amber)" }}>"United States"</span>
              <span style={{ color: "var(--text-muted)" }}>,</span>
              <br />
              &nbsp;&nbsp;
              <span style={{ color: "var(--cyan)" }}>"status"</span>
              <span style={{ color: "var(--text-muted)" }}>: </span>
              <span style={{ color: "var(--green-primary)" }}>"open_to_opportunities"</span>
              <br />
              <span style={{ color: "var(--text-muted)" }}>{"}"}</span>
            </div>
          </div>

          {/* Links */}
          {[
            { label: "LinkedIn", handle: "/in/jeremyrobertson", icon: "◈", href: "https://www.linkedin.com/in/jdrobertso/" },
            { label: "GitHub", handle: "@jeremyrobertson", icon: "⌥", href: "https://github.com/jdrobertso" },
            { label: "Email", handle: "jrobertson.88@gmail.com", icon: "✉", href: "mailto:jrobertson.88@gmail.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                marginBottom: "8px",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--green-primary)";
                (e.currentTarget as HTMLElement).style.background = "var(--green-subtle)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
              }}
            >
              <span
                className="mono"
                style={{ color: "var(--green-primary)", fontSize: "0.9rem" }}
              >
                {link.icon}
              </span>
              <div>
                <div
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </div>
                <div
                  className="mono"
                  style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}
                >
                  {link.handle}
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
