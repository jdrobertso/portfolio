export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        className="mono"
        style={{ color: "var(--text-muted)", fontSize: "0.72rem", letterSpacing: "0.05em" }}
      >
        <span style={{ color: "var(--green-dim)" }}>jeremy@workstation:~$ </span>
        built with Next.js + Framer Motion
        <span style={{ color: "var(--green-dim)" }}>  //  </span>
        {new Date().getFullYear()}
      </div>
    </footer>
  );
}
