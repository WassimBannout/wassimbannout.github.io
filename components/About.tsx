"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

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

function CountUp({ to, inView }: { to: number; inView: boolean }) {
  const [n, setN] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    let i = 0;
    const steps = 35;
    const inc = to / steps;
    const t = setInterval(() => {
      i++;
      setN(Math.min(Math.round(inc * i), to));
      if (i >= steps) clearInterval(t);
    }, 35);
    return () => clearInterval(t);
  }, [inView, to]);
  return <>{n}</>;
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionLabel num="01" title="Who I Am" />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20 md:mb-28">
        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-syne font-bold text-fg leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
          >
            Engineer by passion,{" "}
            <span className="text-accent">builder</span> by nature.
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-5"
        >
          <p className="font-inter text-sm text-muted leading-[1.9]">
            I&apos;m a passionate engineer working at the crossroads of
            software development, data science, and database engineering.
            I build systems that are not just functional, but thoughtfully
            designed and impactful.
          </p>
          <p className="font-inter text-sm text-muted leading-[1.9]">
            From crafting intelligent ML pipelines to designing robust
            database architectures and modern web applications — I thrive
            on solving complex problems with elegant solutions. Every
            project is an opportunity to create something that matters.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Python", "TypeScript", "PostgreSQL", "React", "FastAPI", "TensorFlow"].map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-3 py-1.5 border border-line text-muted hover:border-accent/30 hover:text-fg transition-all duration-200"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 pt-10 md:pt-14 border-t border-line">
        {[
          { to: 5, suffix: "+", label: "Projects Completed" },
          { to: 10, suffix: "+", label: "Technologies" },
          { to: 3, suffix: "", label: "Domains" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div
              className="font-syne font-extrabold text-fg leading-none mb-2"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              <CountUp to={s.to} inView={inView} />
              <span className="text-accent">{s.suffix}</span>
            </div>
            <div className="font-mono text-[10px] text-muted tracking-[0.2em] uppercase">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
