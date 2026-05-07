"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const JOBS = [
  {
    id: "ncs",
    company: "NCS",
    title: "Software Developer / Solutions Architect",
    period: "Present",
    status: "active",
    domain: "Car Wash Industry",
    color: "var(--green-primary)",
    summary: "Architecting and developing business solutions for the car wash industry, modernizing operations and enabling data-driven decision making for operators nationwide.",
    highlights: [
      "Designed scalable business solution platforms tailored to car wash operators",
      "Built real-time operational dashboards and reporting pipelines",
      "Implemented integrations connecting POS systems, payment rails, and fleet management",
      "Led architecture decisions for cloud-native, multi-tenant deployments",
    ],
    tags: ["Google Cloud", "React", "Node.js", "PostgreSQL", "Microservices", "Django"],
  },
  {
    id: "1904",
    company: "1904Labs",
    title: "Software Developer / DevOps Engineer",
    period: "2021 – 2023",
    status: "past",
    domain: "Fortune 500 Enterprise Consulting",
    color: "var(--amber)",
    summary: "Contractor embedded with Fortune 500 clients, engineering and operating high-throughput systems that served millions of concurrent users — with the reliability and scale those brands demand.",
    highlights: [
      "Delivered cloud-native platforms handling millions of users across Fortune 500 clients",
      "Established CI/CD pipelines reducing deployment lead times from days to minutes",
      "Architected distributed microservice systems with 99.9% uptime SLAs",
      "Mentored engineering teams on DevOps culture and infrastructure-as-code practices",
    ],
    tags: ["Kubernetes", "AWS", "Terraform", "GitHub Actions", "TypeScript", "Kafka"],
  },
  {
    id: "radialogica",
    company: "Radialogica",
    title: "Software Developer",
    period: "2019 – 2021",
    status: "past",
    domain: "Medical Technology / Oncology",
    color: "var(--cyan)",
    summary: "Part of a mission-driven team building software that improves cancer treatment outcomes for patients worldwide — combining rigorous engineering with life-critical precision.",
    highlights: [
      "Developed radiation treatment planning software used by oncologists globally",
      "Built data pipelines processing medical imaging data (DICOM) at clinical scale",
      "Worked within strict regulatory and compliance frameworks",
      "Contributed to platform improvements that reduced treatment planning time and increased efficacy",
    ],
    tags: ["Python", ".NET", "C#", "DICOM", "Medical Imaging", "SQL Server"],
  },
];

export default function Experience() {
  const [inView, setInView] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("ncs");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: "6rem 2rem",
        maxWidth: "860px",
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
          # section_03
        </div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Experience Log
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

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            left: "16px",
            top: 0,
            bottom: 0,
            width: "1px",
            background:
              "linear-gradient(to bottom, var(--green-primary), var(--border) 80%, transparent)",
          }}
        />

        {JOBS.map((job, ji) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: ji * 0.15 }}
            style={{ paddingLeft: "48px", marginBottom: "1.5rem", position: "relative" }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: "10px",
                top: "22px",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                border: `2px solid ${job.color}`,
                background:
                  job.status === "active" ? job.color : "var(--bg-primary)",
                boxShadow:
                  job.status === "active"
                    ? `0 0 12px ${job.color}`
                    : "none",
                animation:
                  job.status === "active"
                    ? "pulse-green 2s ease-in-out infinite"
                    : "none",
              }}
            />

            {/* Card */}
            <div
              onClick={() =>
                setExpanded(expanded === job.id ? null : job.id)
              }
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${expanded === job.id ? job.color : "var(--border)"}`,
                borderRadius: "4px",
                padding: "1.25rem 1.5rem",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow:
                  expanded === job.id ? `0 0 20px ${job.color}22` : "none",
              }}
              onMouseEnter={(e) => {
                if (expanded !== job.id)
                  (e.currentTarget as HTMLElement).style.borderColor = `${job.color}66`;
              }}
              onMouseLeave={(e) => {
                if (expanded !== job.id)
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <h3
                      style={{
                        color: job.color,
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {job.company}
                    </h3>
                    {job.status === "active" && (
                      <span
                        className="mono"
                        style={{
                          fontSize: "0.62rem",
                          color: "var(--green-primary)",
                          border: "1px solid var(--green-primary)",
                          padding: "1px 6px",
                          letterSpacing: "0.1em",
                        }}
                      >
                        CURRENT
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      fontWeight: 500,
                    }}
                  >
                    {job.title}
                  </div>
                  <div
                    className="mono"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.72rem",
                      marginTop: "3px",
                    }}
                  >
                    {job.domain}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="mono"
                    style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
                  >
                    {job.period}
                  </span>
                  <span
                    className="mono"
                    style={{ color: job.color, fontSize: "0.8rem" }}
                  >
                    {expanded === job.id ? "[-]" : "[+]"}
                  </span>
                </div>
              </div>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {expanded === job.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ paddingTop: "1.25rem" }}>
                      <div
                        style={{
                          borderTop: "1px solid var(--border)",
                          paddingTop: "1.25rem",
                        }}
                      >
                        <p
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.88rem",
                            lineHeight: 1.7,
                            marginBottom: "1rem",
                          }}
                        >
                          {job.summary}
                        </p>
                        <ul style={{ listStyle: "none", marginBottom: "1rem" }}>
                          {job.highlights.map((h, hi) => (
                            <li
                              key={hi}
                              className="mono"
                              style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.78rem",
                                paddingLeft: "1.2rem",
                                position: "relative",
                                marginBottom: "6px",
                                lineHeight: 1.5,
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  color: job.color,
                                }}
                              >
                                ▸
                              </span>
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {job.tags.map((t) => (
                            <span
                              key={t}
                              className="mono"
                              style={{
                                padding: "2px 8px",
                                background: `${job.color}15`,
                                border: `1px solid ${job.color}40`,
                                color: job.color,
                                fontSize: "0.68rem",
                                letterSpacing: "0.05em",
                                borderRadius: "2px",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
