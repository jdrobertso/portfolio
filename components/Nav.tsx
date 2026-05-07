"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#hero", label: "~/home" },
  { href: "#skills", label: "~/skills" },
  { href: "#experience", label: "~/experience" },
  { href: "#contact", label: "~/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(8,12,8,0.95)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(57,211,83,0.12)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        className="mono"
        style={{
          color: "var(--green-primary)",
          textDecoration: "none",
          fontSize: "0.85rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
        }}
      >
        <span style={{ color: "var(--text-muted)" }}>root@</span>
        jeremy-robertson
        <span style={{ color: "var(--text-muted)" }}>:~#</span>
      </a>

      {/* Desktop Links */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
        }}
        className="desktop-nav"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setActive(link.href)}
            className="mono"
            style={{
              color:
                active === link.href
                  ? "var(--green-primary)"
                  : "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.78rem",
              letterSpacing: "0.03em",
              transition: "color 0.2s ease",
              position: "relative",
              paddingBottom: "2px",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--green-primary)")
            }
            onMouseLeave={(e) => {
              if (active !== link.href)
                (e.target as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            {link.label}
            {active === link.href && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "var(--green-primary)",
                  boxShadow: "0 0 6px var(--green-primary)",
                }}
              />
            )}
          </a>
        ))}
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        style={{
          background: "none",
          border: "1px solid var(--border)",
          color: "var(--green-primary)",
          padding: "6px 10px",
          cursor: "pointer",
          display: "none",
          fontFamily: "JetBrains Mono",
          fontSize: "0.75rem",
        }}
        aria-label="Toggle menu"
      >
        {menuOpen ? "[×]" : "[≡]"}
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute",
              top: "60px",
              left: 0,
              right: 0,
              background: "rgba(8,12,8,0.98)",
              borderBottom: "1px solid var(--border)",
              padding: "1rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mono"
                onClick={() => {
                  setActive(link.href);
                  setMenuOpen(false);
                }}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
