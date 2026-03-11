"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-5 mb-16 md:mb-20">
      <span className="font-mono text-xs text-accent shrink-0">{num}</span>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className="flex-1 h-px bg-line"
      />
      <span className="font-mono text-[10px] text-muted tracking-[0.25em] shrink-0 uppercase">
        {title}
      </span>
    </div>
  );
}

interface Project {
  num: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  featured: boolean;
  gradient: string;
}

const projects: Project[] = [
  {
    num: "001",
    title: "OctoPredict",
    description:
      "ML-powered GitHub repository analytics platform that predicts project success metrics, analyzes code quality trends, and provides actionable insights using advanced machine learning models trained on thousands of repositories.",
    tags: ["Python", "scikit-learn", "FastAPI", "PostgreSQL", "React", "Docker"],
    github: "https://github.com/WassimBannout/OctoPredict",
    featured: true,
    gradient: "from-violet-950/40 via-surface to-surface",
  },
  {
    num: "002",
    title: "AI Transcription Engine",
    description:
      "High-performance audio transcription service leveraging OpenAI Whisper with speaker diarization, real-time processing, and multi-language support. Designed for scale with async job queuing and WebSocket streaming.",
    tags: ["Python", "Whisper", "FastAPI", "Redis", "WebSockets", "Docker"],
    github: "https://github.com/WassimBannout",
    featured: true,
    gradient: "from-cyan-950/40 via-surface to-surface",
  },
  {
    num: "003",
    title: "Tic-Tac-Toe AI",
    description:
      "Unbeatable AI opponent using Minimax algorithm with alpha-beta pruning. Interactive web interface with adjustable difficulty settings.",
    tags: ["Python", "Minimax", "Alpha-Beta Pruning", "JavaScript"],
    github: "https://github.com/WassimBannout",
    featured: false,
    gradient: "from-emerald-950/30 via-surface to-surface",
  },
  {
    num: "004",
    title: "Password Manager",
    description:
      "Secure, encrypted local password manager with AES-256 encryption, master password hashing via bcrypt, and a clean CLI interface for everyday use.",
    tags: ["Python", "Cryptography", "SQLite", "bcrypt"],
    github: "https://github.com/WassimBannout",
    featured: false,
    gradient: "from-orange-950/30 via-surface to-surface",
  },
];

function FeaturedCard({ project, delay }: { project: Project; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${hovered ? 1.01 : 1})`,
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className="relative group"
    >
      {/* Animated border glow on hover */}
      <div
        className={`absolute -inset-px bg-gradient-to-br from-accent/40 via-transparent to-cyan/20 rounded-none transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      <div className={`relative bg-gradient-to-br ${project.gradient} border border-line p-8 md:p-10 h-full overflow-hidden`}>
        {/* Number */}
        <span className="font-mono text-[10px] text-muted tracking-widest block mb-6">
          {project.num}
        </span>

        {/* Title + link */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <h3
            className="font-syne font-bold text-fg group-hover:text-accent transition-colors duration-300 leading-tight"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            {project.title}
          </h3>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-2 border border-line hover:border-accent/40 text-muted hover:text-accent transition-all duration-200 mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Description */}
        <p className="font-inter text-sm text-muted leading-[1.85] mb-8">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="font-mono text-[10px] text-muted/60 border border-line/60 px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>

        {/* Subtle corner accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/3 blur-2xl rounded-full" />
      </div>
    </motion.div>
  );
}

function SmallCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative block border border-line hover:border-accent/30 p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
      <div className="relative z-10">
        <span className="font-mono text-[10px] text-muted tracking-widest block mb-4">{project.num}</span>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-syne font-bold text-lg text-fg group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1" />
        </div>
        <p className="font-inter text-sm text-muted leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="font-mono text-[10px] text-muted/50">{t}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const small = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionLabel num="03" title="Projects" />

      {/* Featured */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {featured.map((p, i) => <FeaturedCard key={p.num} project={p} delay={i * 0.1} />)}
      </div>

      {/* Regular */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {small.map((p, i) => <SmallCard key={p.num} project={p} delay={i * 0.08} />)}
      </div>

      {/* All projects link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="https://github.com/WassimBannout"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-inter text-xs text-muted hover:text-fg transition-colors duration-200 tracking-widest uppercase"
        >
          More on GitHub
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
