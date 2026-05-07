"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// ── filesystem ────────────────────────────────────────────────────────────────
const FS: Record<string, { type: string; children: string[] }> = {
  "~":                      { type: "dir", children: ["about.txt", "role.txt", "summary.txt", "status/", "sections/"] },
  "~/status":               { type: "dir", children: ["available_for_collaboration.txt", "open_to_new_roles.txt"] },
  "~/sections":             { type: "dir", children: ["skills/", "experience/", "contact/"] },
  "~/sections/skills":      { type: "dir", children: [] },
  "~/sections/experience":  { type: "dir", children: [] },
  "~/sections/contact":     { type: "dir", children: [] },
};

const FILES: Record<string, string> = {
  "about.txt":                          "Jeremy Robertson — DevOps Engineer & Software Architect",
  "role.txt":                           "DevOps Engineer & Software Architect",
  "summary.txt":                        "Building resilient systems that scale to millions —\nfrom cancer research platforms to Fortune 500 enterprise solutions.",
  "available_for_collaboration.txt":    "status: OPEN\ntype: collaboration, consulting",
  "open_to_new_roles.txt":              "status: OPEN\npreference: remote, hybrid",
};

// ── types ─────────────────────────────────────────────────────────────────────
type OutputLine = {
  text: string;
  color?: string;
  indent?: boolean;
  big?: boolean;
};

type HistoryEntry = {
  cwd: string;
  input: string;
  output: OutputLine[];
};

// ── helpers ───────────────────────────────────────────────────────────────────
function resolveDir(cwd: string, arg: string): string | null {
  if (!arg || arg === "~") return "~";
  if (arg === "..") {
    if (cwd === "~") return "~";
    const parts = cwd.split("/");
    return parts.slice(0, -1).join("/") || "~";
  }
  const stripped = arg.replace(/\/$/, "");
  const abs = stripped.startsWith("~") ? stripped : `${cwd}/${stripped}`;
  return FS[abs] ? abs : null;
}

// ── command runner ────────────────────────────────────────────────────────────
function runCommand(
  input: string,
  cwd: string,
  setCwd: (d: string) => void
): OutputLine[] {
  const trimmed = input.trim();
  if (!trimmed) return [];
  const [cmd, ...rest] = trimmed.split(/\s+/);
  const arg = rest.join(" ");

  switch (cmd) {
    case "help":
      return [
        { text: "Available commands:", color: "var(--green-primary)" },
        { text: "" },
        { text: "  whoami  --          display current user",               color: "var(--text-secondary)", indent: true },
        { text: "  pwd     --          print working directory",            color: "var(--text-secondary)", indent: true },
        { text: "  ls  [dir] --        list directory contents",            color: "var(--text-secondary)", indent: true },
        { text: "  cd  <dir>  --       change directory / jump to section", color: "var(--text-secondary)", indent: true },
        { text: "  cat <file>  --      read a file",                        color: "var(--text-secondary)", indent: true },
        { text: "  echo <text> --      print text",                         color: "var(--text-secondary)", indent: true },
        { text: "  uname      --       system info",                        color: "var(--text-secondary)", indent: true },
        { text: "  history   --        command history",                    color: "var(--text-secondary)", indent: true },
        { text: "  clear      --       clear terminal",                     color: "var(--text-secondary)", indent: true },
        { text: "" },
        { text: "  Navigation:", color: "var(--amber)" },
        { text: "  cd sections/skills      → Skills section",      color: "var(--text-muted)", indent: true },
        { text: "  cd sections/experience  → Experience section",  color: "var(--text-muted)", indent: true },
        { text: "  cd sections/contact     → Contact section",     color: "var(--text-muted)", indent: true },
        { text: "" },
        { text: "  Keyboard:", color: "var(--cyan)" },
        { text: "  ↑ ↓  browse history   TAB  autocomplete   ctrl+l  clear", color: "var(--text-muted)", indent: true },
      ];

    case "whoami":
      return [{ text: "jeremy-robertson", color: "var(--green-primary)" }];

    case "pwd":
      return [{ text: cwd, color: "var(--cyan)" }];

    case "uname":
      return [{ text: "portfolio-os 2.0.1 #1 SMP jeremy-robertson x86_64 GNU/Linux", color: "var(--text-secondary)" }];

    case "echo":
      return [{ text: arg, color: "var(--text-secondary)" }];

    case "ls": {
      const target = arg ? resolveDir(cwd, arg) : cwd;
      if (!target || !FS[target]) return [{ text: `ls: cannot access '${arg}': No such file or directory`, color: "var(--amber)" }];
      const children = FS[target].children;
      if (!children.length) return [{ text: "(empty)", color: "var(--text-muted)" }];
      const out: OutputLine[] = [];
      children.filter(c => c.endsWith("/")).forEach(d => out.push({ text: d, color: "var(--cyan)" }));
      children.filter(c => !c.endsWith("/")).forEach(f => out.push({ text: f, color: "var(--text-secondary)" }));
      return out;
    }

    case "cd": {
      const normalized = arg.replace(/\/$/, "");
      // Resolve relative path
      const target = resolveDir(cwd, normalized || "~");
      if (!target) return [{ text: `cd: no such file or directory: ${arg}`, color: "var(--amber)" }];
      setCwd(target);

      const sectionMap: Record<string, string> = {
        "~/sections/skills":     "skills",
        "~/sections/experience": "experience",
        "~/sections/contact":    "contact",
      };
      if (sectionMap[target]) {
        const id = sectionMap[target];
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 250);
        return [
          { text: `Navigating to /${id}...`, color: "var(--green-primary)" },
          { text: `✓ jumped to #${id}`, color: "var(--text-muted)" },
        ];
      }
      return [];
    }

    case "cat": {
      if (!arg) return [{ text: "cat: missing operand", color: "var(--amber)" }];
      const fname = arg.split("/").pop()!;
      const content = FILES[fname];
      if (!content) return [{ text: `cat: ${arg}: No such file or directory`, color: "var(--amber)" }];
      return content.split("\n").map(line => ({ text: line, color: "var(--text-secondary)" }));
    }

    case "clear":
      return [{ text: "__CLEAR__" }];

    case "history":
      return [{ text: "__HISTORY__" }];

    case "sudo":
      return [{ text: "jeremy is not in the sudoers file. This incident will be reported.", color: "var(--amber)" }];

    case "git":
      return [
        { text: "On branch main", color: "var(--text-secondary)" },
        { text: "Your branch is up to date with 'origin/main'.", color: "var(--text-secondary)" },
        { text: "nothing to commit, working tree clean", color: "var(--green-primary)" },
      ];

    case "vim": case "nano": case "emacs":
      return [{ text: `${cmd}: not available in portfolio mode`, color: "var(--text-muted)" }];

    case "exit": case "quit":
      return [
        { text: "logout", color: "var(--text-muted)" },
        { text: "Connection to workstation closed.", color: "var(--text-muted)" },
      ];

    default:
      return [
        { text: `bash: ${cmd}: command not found`, color: "var(--amber)" },
        { text: "Type 'help' to see available commands.", color: "var(--text-muted)" },
      ];
  }
}

// ── prompt ────────────────────────────────────────────────────────────────────
function Prompt({ cwd, children }: { cwd: string; children?: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
      <span style={{ color: "#5a9960" }}>jeremy</span>
      <span style={{ color: "#3a5c3d" }}>@workstation</span>
      <span style={{ color: "#3a5c3d" }}>:</span>
      <span style={{ color: "#4fc3f7" }}>{cwd}</span>
      <span style={{ color: "#6b9c6f" }}> $ </span>
      {children}
    </span>
  );
}

// ── intro commands ────────────────────────────────────────────────────────────
const INTRO: { cmd: string; delay: number }[] = [
  { cmd: "whoami",       delay: 300  },
  { cmd: "cat role.txt", delay: 1100 },
  { cmd: "cat summary.txt", delay: 2100 },
  { cmd: "ls status",  delay: 3300 },
];

// ── main ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [introLines, setIntroLines]   = useState<HistoryEntry[]>([]);
  const [introReady, setIntroReady]   = useState(false);
  const [history, setHistory]         = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory]   = useState<string[]>([]);
  const [histIdx, setHistIdx]         = useState(-1);
  const [inputVal, setInputVal]       = useState("");
  const [cwd, setCwd]                 = useState("~");

  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Run intro
  useEffect(() => {
    let tempCwd = "~";
    INTRO.forEach(({ cmd, delay }, i) => {
      setTimeout(() => {
        const out = runCommand(cmd, tempCwd, d => { tempCwd = d; });
        setIntroLines(prev => [...prev, { cwd: "~", input: cmd, output: out }]);
        if (i === INTRO.length - 1) setTimeout(() => setIntroReady(true), 600);
      }, delay);
    });
  }, []);

  // Scroll to bottom whenever output changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [introLines, history, introReady]);

  const submit = useCallback(() => {
    const raw = inputVal.trim();
    const out = runCommand(raw, cwd, setCwd);

    if (out[0]?.text === "__CLEAR__") {
      setHistory([]);
      setInputVal("");
      raw && setCmdHistory(p => [raw, ...p]);
      setHistIdx(-1);
      return;
    }

    if (out[0]?.text === "__HISTORY__") {
      const hout = cmdHistory.map((c, i) => ({
        text: `  ${String(cmdHistory.length - i).padStart(3)}  ${c}`,
        color: "var(--text-secondary)",
      }));
      setHistory(p => [...p, { cwd, input: raw, output: hout }]);
      raw && setCmdHistory(p => [raw, ...p]);
      setHistIdx(-1);
      setInputVal("");
      return;
    }

    setHistory(p => [...p, { cwd, input: raw, output: out }]);
    raw && setCmdHistory(p => [raw, ...p]);
    setHistIdx(-1);
    setInputVal("");
  }, [inputVal, cwd, cmdHistory]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInputVal(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInputVal(""); }
      else { setHistIdx(next); setInputVal(cmdHistory[next] ?? ""); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = inputVal.split(" ");
      const last = parts[parts.length - 1];
      const dir = FS[cwd];
      if (dir && last) {
        const matches = dir.children.filter(c => c.startsWith(last));
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          setInputVal(parts.join(" "));
        }
      }
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      setHistory(p => [...p, { cwd, input: inputVal + "^C", output: [] }]);
      setInputVal("");
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setHistory([]);
    }
  };

  const renderOutput = (lines: OutputLine[]) =>
    lines.map((line, i) => {
      if (!line.text) return <div key={i} style={{ height: "0.5em" }} />;
      return (
        <div
          key={i}
          style={{
            color: line.color || "var(--text-secondary)",
            paddingLeft: line.indent ? "0.5rem" : 0,
            fontSize: line.big ? "clamp(1.8rem,4vw,3rem)" : "inherit",
            fontWeight: line.big ? 600 : 400,
            fontFamily: line.big ? "'Space Grotesk',sans-serif" : "inherit",
            textShadow: line.big ? "0 0 28px rgba(57,211,83,0.4)" : "none",
            letterSpacing: line.big ? "-0.02em" : "inherit",
            lineHeight: line.big ? 1.15 : "inherit",
            wordBreak: "break-word",
          }}
        >
          {line.text}
        </div>
      );
    });

  return (
    <section
      id="hero"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 2rem 4rem", position: "relative", overflow: "hidden" }}
    >
      {/* BG grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(57,211,83,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(57,211,83,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(ellipse,rgba(57,211,83,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, width: "100%", position: "relative" }}>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", boxShadow: "0 0 60px rgba(57,211,83,0.05)" }}
        >
          {/* Title bar */}
          <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["#e25555","#e8b23e","#39d353"].map((c,i) => <div key={i} style={{ width:10,height:10,borderRadius:"50%",background:c,opacity:0.8 }} />)}
              </div>
              <span className="mono" style={{ color: "var(--text-muted)", fontSize: "0.72rem", letterSpacing:"0.05em" }}>
                bash — jeremy@workstation: {cwd}
              </span>
            </div>
            <span className="mono" style={{ color: "var(--text-muted)", fontSize: "0.62rem", letterSpacing:"0.08em" }}>
              type &apos;help&apos; for commands
            </span>
          </div>

          {/* Body */}
          <div
            onClick={() => inputRef.current?.focus()}
            style={{ padding: "1.5rem 1.75rem 1.25rem", minHeight: 420, maxHeight: 520, overflowY: "auto", cursor: "text", fontFamily: "JetBrains Mono,monospace", fontSize: "0.85rem", lineHeight: 1.65 }}
          >
            {/* Boot text */}
            <div className="mono" style={{ color: "var(--text-muted)", fontSize: "0.72rem", marginBottom: "1.25rem" }}>
              Portfolio OS v2.0.1 — jeremy-robertson.dev
              <br /><span style={{ color: "rgba(57,211,83,0.2)" }}>{"─".repeat(42)}</span>
            </div>

            {/* Intro history */}
            {introLines.map((entry, i) => (
              <div key={`intro-${i}`} style={{ marginBottom: "0.6rem" }}>
                <div style={{ marginBottom: 2 }}>
                  <Prompt cwd="~"><span style={{ color: "var(--green-primary)" }}>{entry.input}</span></Prompt>
                </div>
                {renderOutput(entry.output)}
              </div>
            ))}

            {/* User command history */}
            {history.map((entry, i) => (
              <div key={`h-${i}`} style={{ marginBottom: "0.6rem" }}>
                <div style={{ marginBottom: 2 }}>
                  <Prompt cwd={entry.cwd}><span style={{ color: "var(--green-primary)" }}>{entry.input}</span></Prompt>
                </div>
                {renderOutput(entry.output)}
              </div>
            ))}

            {/* Active input */}
            {introReady ? (
              <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                <Prompt cwd={cwd} />
                <input
                  ref={inputRef}
                  autoFocus
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={handleKey}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "var(--green-primary)",
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: "0.85rem",
                    caretColor: "var(--green-primary)",
                    minWidth: 0,
                  }}
                />
              </div>
            ) : (
              <div style={{ marginTop: 4 }}>
                <Prompt cwd="~">
                  <span style={{ display:"inline-block", width:8, height:"1em", background:"var(--green-primary)", verticalAlign:"text-bottom", animation:"blink 1s step-end infinite" }} />
                </Prompt>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Status bar */}
          <div style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", padding: "5px 16px", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              ["PWD", cwd],
              ["CMDS", String(cmdHistory.length)],
              ["↑↓", "history"],
              ["TAB", "complete"],
              ["ctrl+l", "clear"],
            ].map(([label, val]) => (
              <span key={label} className="mono" style={{ fontSize:"0.62rem", color:"var(--text-muted)" }}>
                <span style={{ color:"var(--text-secondary)" }}>{label}</span> {val}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:5, duration:0.5 }}
          style={{ display:"flex", gap:"1rem", marginTop:"2rem", flexWrap:"wrap" }}
        >
          {[
            { href:"#experience", label:"./view_experience", primary:true },
            { href:"#contact",    label:"./get_in_touch",    primary:false },
          ].map(btn => (
            <a key={btn.href} href={btn.href} className="mono"
              style={{ display:"inline-block", padding:"10px 24px", border:`1px solid ${btn.primary ? "var(--green-primary)" : "var(--border)"}`, color:btn.primary ? "var(--green-primary)" : "var(--text-secondary)", textDecoration:"none", fontSize:"0.82rem", letterSpacing:"0.08em", transition:"all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background="var(--green-glow)"; el.style.borderColor="var(--green-primary)"; el.style.color="var(--green-primary)"; el.style.boxShadow="0 0 20px rgba(57,211,83,0.2)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.borderColor=btn.primary?"var(--green-primary)":"var(--border)"; el.style.color=btn.primary?"var(--green-primary)":"var(--text-secondary)"; el.style.boxShadow="none"; }}
            >{btn.label}</a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
