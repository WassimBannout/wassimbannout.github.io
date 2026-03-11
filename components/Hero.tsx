"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-10 lg:p-14">
      {/* Contained portrait frame */}
      <div
        className="relative w-full overflow-hidden border border-line/50"
        style={{ maxWidth: 340, aspectRatio: "3 / 4" }}
      >
        {!error ? (
          <>
            <Image
              src="/photo.jpg"
              fill
              alt="Wassim Bannout"
              className={`object-cover object-top transition-opacity duration-700 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              priority
            />
            {loaded && (
              <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-bg/60 to-transparent z-10" />
            )}
            {!loaded && !error && (
              <div className="absolute inset-0">
                <PhotoPlaceholder />
              </div>
            )}
          </>
        ) : (
          <PhotoPlaceholder />
        )}
      </div>
    </div>
  );
}

function PhotoPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#120a2a] via-[#0a0a18] to-bg">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(167,139,250,0.12) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72 h-72 rounded-full border border-accent/5" />
        <div className="absolute w-52 h-52 rounded-full border border-accent/8" />
        <div className="absolute w-36 h-36 rounded-full border border-accent/12" />
      </div>
      {/* Monogram */}
      <div className="relative z-10 w-24 h-24 rounded-2xl border border-accent/20 bg-accent/5 flex items-center justify-center mb-4 glow-accent-sm">
        <span className="font-syne font-extrabold text-3xl text-accent/60">WB</span>
      </div>
      <p className="relative z-10 font-mono text-[10px] text-muted/30 tracking-[0.3em] uppercase">
        photo.jpg → /public/
      </p>
    </div>
  );
}

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section className="relative min-h-screen grid lg:grid-cols-[58fr_42fr] overflow-hidden pt-16">
      {/* ── LEFT — content ── */}
      <div className="flex flex-col justify-between px-6 md:px-12 lg:px-16 py-12 lg:py-16">
        {/* Top: badge */}
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

        {/* Middle: name */}
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

          {/* Typewriter role */}
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

        {/* Bottom: description + CTAs + stats */}
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

          {/* CTAs */}
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

      {/* ── RIGHT — photo ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative hidden lg:block min-h-[600px]"
      >
        <PhotoPanel />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
