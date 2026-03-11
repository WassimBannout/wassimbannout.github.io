"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, ArrowUpRight } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;
const roles = ["Software Engineer", "Data Scientist", "Database Engineer"];

function useTypewriter(words: string[], speed = 75, pause = 2200) {
  const [text, setText] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    if (!del && cIdx < word.length) {
      const t = setTimeout(() => setCIdx((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!del && cIdx === word.length) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && cIdx > 0) {
      const t = setTimeout(() => setCIdx((c) => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (del && cIdx === 0) {
      setDel(false);
      setWIdx((w) => (w + 1) % words.length);
    }
  }, [cIdx, del, wIdx, words, speed, pause]);

  useEffect(() => setText(words[wIdx].slice(0, cIdx)), [cIdx, wIdx, words]);
  return text;
}

function PhotoPanel() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#120a2a] via-[#0a0a18] to-bg">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(167,139,250,0.15) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-28 h-28 rounded-2xl border border-accent/20 bg-accent/5 flex items-center justify-center mb-3">
            <span className="font-syne font-extrabold text-4xl text-accent/50">WB</span>
          </div>
          <p className="font-mono text-[10px] text-muted/25 tracking-[0.3em] uppercase">
            photo.jpg → /public/
          </p>
        </div>
        {/* Left gradient to blend with content */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/photo.jpg"
        alt="Wassim Bannout"
        className="w-full h-full object-cover object-center"
        onError={() => setError(true)}
      />
      {/* Left gradient — blends photo into the dark left panel */}
      <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg to-transparent" />
      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-bg to-transparent" />
    </div>
  );
}

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section className="relative min-h-screen grid lg:grid-cols-[58fr_42fr] overflow-hidden pt-16">
      {/* LEFT — content */}
      <div className="flex flex-col justify-between px-6 md:px-12 lg:px-16 py-12 lg:py-16 relative z-10">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2.5 mb-auto"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-mono text-xs text-muted tracking-[0.2em] uppercase">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <div className="my-8 lg:my-0">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: E, delay: 0.1 }}
              className="font-syne font-extrabold leading-[0.85] tracking-[-0.03em] text-fg select-none"
              style={{ fontSize: "clamp(5rem, 13vw, 11rem)" }}
            >
              WASSIM
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: E, delay: 0.16 }}
              className="font-syne font-extrabold leading-[0.85] tracking-[-0.03em] text-accent select-none"
              style={{ fontSize: "clamp(5rem, 13vw, 11rem)" }}
            >
              BANNOUT<span className="text-fg">.</span>
            </motion.h1>
          </div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 h-7 flex items-center"
          >
            <span className="font-inter text-base text-muted">
              {role}
              <span className="cursor-blink text-accent ml-0.5">|</span>
            </span>
          </motion.div>
        </div>

        {/* Description + CTAs */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="font-inter text-sm text-muted leading-relaxed max-w-sm mb-8"
          >
            Building impactful software at the intersection of engineering,
            data science, and intelligent systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 bg-accent text-bg font-syne font-bold text-sm tracking-wide transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
            >
              View My Work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="https://github.com/WassimBannout"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 border border-line hover:border-accent/40 text-muted hover:text-fg font-inter text-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </motion.div>
        </div>
      </div>

      {/* RIGHT — photo (full bleed, behind gradients) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative hidden lg:block"
      >
        <PhotoPanel />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-8 md:left-12 lg:left-16 flex items-center gap-3 text-muted"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
