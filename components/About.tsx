"use client";

import { motion } from "framer-motion";

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

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionLabel num="01" title="Who I Am" />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
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

    </section>
  );
}
