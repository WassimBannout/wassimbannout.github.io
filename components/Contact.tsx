"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

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

function MagneticButton() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = btnRef.current!.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btnRef.current!.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };

  const onLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={btnRef}
      href="https://github.com/WassimBannout"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group inline-flex items-center gap-4 font-syne font-bold text-fg border border-subtle hover:border-accent/50 px-8 py-4 transition-colors duration-300 text-base md:text-lg"
      style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, color 0.3s" }}
    >
      <span className="group-hover:text-accent transition-colors duration-300">
        github.com/WassimBannout
      </span>
      <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-line">
      <SectionLabel num="04" title="Contact" />

      {/* Headline */}
      <div className="mb-14 md:mb-16">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: E }}
            className="font-syne font-extrabold text-fg leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            Let&apos;s build
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: E, delay: 0.07 }}
            className="font-syne font-extrabold leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            <span className="text-gradient">something</span>
            <span className="text-fg">.</span>
          </motion.h2>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="font-inter text-sm text-muted leading-[1.8] max-w-xs"
        >
          Interested in working together or just want to say hi?
          Find me on GitHub — I&apos;d love to connect.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <MagneticButton />
        </motion.div>
      </div>
    </section>
  );
}
