"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: "infra",
    label: "Infrastructure & Cloud",
    icon: "☁",
    color: "var(--cyan)",
    skills: [
      { name: "Kubernetes / Docker", level: 92 },
      { name: "AWS / Azure", level: 88 },
      { name: "Terraform / IaC", level: 85 },
      { name: "CI/CD Pipelines", level: 94 },
      { name: "Linux / Bash", level: 90 },
    ],
  },
  {
    id: "arch",
    label: "Architecture & Design",
    icon: "⬡",
    color: "var(--amber)",
    skills: [
      { name: "Microservices", level: 91 },
      { name: "Event-Driven Systems", level: 87 },
      { name: "API Design (REST/gRPC)", level: 89 },
      { name: "High Availability", level: 85 },
      { name: "System Scalability", level: 93 },
    ],
  },
  {
    id: "dev",
    label: "Development",
    icon: "</>",
    color: "var(--green-primary)",
    skills: [
      { name: "TypeScript / Node.js", level: 90 },
      { name: "React / Next.js", level: 86 },
      { name: "Python", level: 83 },
      { name: "PostgreSQL / MongoDB", level: 84 },
      { name: ".NET / C#", level: 80 },
    ],
  },
  {
    id: "ops",
    label: "Observability & Security",
    icon: "◈",
    color: "#c084fc",
    skills: [
      { name: "Prometheus / Grafana", level: 88 },
      { name: "ELK Stack", level: 82 },
      { name: "Security Hardening", level: 79 },
      { name: "Incident Response", level: 86 },
      { name: "Zero-Downtime Deploys", level: 91 },
    ],
  },
];

function SkillBar({ name, level, color, animate }: { name: string; level: number; color: string; animate: boolean }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <span
          className="mono"
          style={{ color: "var(--text-secondary)", fontSize: "0.78rem" }}
        >
          {name}
        </span>
        <span
          className="mono"
          style={{ color: color, fontSize: "0.72rem", opacity: 0.8 }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: "3px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          style={{
            height: "100%",
            background: color,
            borderRadius: "2px",
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "6rem 2rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
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
          # section_02
        </div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Technical Arsenal
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
      </motion.div>

      {/* Skills grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = cat.color;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${cat.color}22`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Corner accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "40px",
                height: "40px",
                background: `linear-gradient(225deg, ${cat.color}20 0%, transparent 60%)`,
              }}
            />
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "1.25rem",
              }}
            >
              <span
                className="mono"
                style={{ color: cat.color, fontSize: "1rem" }}
              >
                {cat.icon}
              </span>
              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {cat.label}
              </h3>
            </div>
            {/* Skills */}
            {cat.skills.map((s) => (
              <SkillBar
                key={s.name}
                name={s.name}
                level={s.level}
                color={cat.color}
                animate={inView}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Tech stack pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ marginTop: "2.5rem" }}
      >
        <div
          className="mono"
          style={{
            color: "var(--text-muted)",
            fontSize: "0.72rem",
            marginBottom: "1rem",
            letterSpacing: "0.08em",
          }}
        >
          $ echo $STACK
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {[
            "Kubernetes","Docker","Terraform","AWS","Azure","GitHub Actions",
            "Prometheus","Grafana","PostgreSQL","Redis","Kafka","Next.js","Node.js",
            "Python","Go","Bash","Nginx","Vault","Istio"
          ].map((tech) => (
            <span
              key={tech}
              className="mono"
              style={{
                padding: "4px 10px",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                fontSize: "0.72rem",
                letterSpacing: "0.05em",
                borderRadius: "2px",
                transition: "all 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--green-primary)";
                (e.currentTarget as HTMLElement).style.color = "var(--green-primary)";
                (e.currentTarget as HTMLElement).style.background = "var(--green-subtle)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
