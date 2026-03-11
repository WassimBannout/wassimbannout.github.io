"use client";

import { motion } from "framer-motion";

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-5 mb-16 md:mb-20 px-6 md:px-12 max-w-7xl mx-auto">
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

// All skills from categories — row1: Languages + Backend, row2: Data&ML + Frontend + Tools
const row1 = [
  "Python", "TypeScript", "JavaScript", "Java", "C#", "SQL", "Bash",
  "FastAPI", "Node.js", "ASP.NET Core", "PostgreSQL", "MySQL", "MongoDB", "Redis",
];
const row2 = [
  "Pandas", "NumPy", "scikit-learn", "TensorFlow", "PyTorch", "Matplotlib",
  "React", "Next.js", "Tailwind CSS", "Framer Motion",
  "Git", "Docker", "GitHub Actions", "Linux", "Postman",
];

const categories = [
  { title: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "C#", "SQL", "Bash"] },
  { title: "Backend", items: ["FastAPI", "Node.js", "ASP.NET Core", "PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { title: "Data & ML", items: ["Pandas", "NumPy", "scikit-learn", "TensorFlow", "PyTorch", "Matplotlib"] },
  { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { title: "Tools", items: ["Git", "Docker", "GitHub Actions", "Linux", "Postman"] },
];

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-block shrink-0 font-mono text-xs text-muted border border-line px-4 py-2 mx-2 whitespace-nowrap hover:text-fg hover:border-accent/20 transition-all duration-200">
      {children}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <SectionLabel num="02" title="Skills" />

      {/* Marquee */}
      <div className="mb-16 md:mb-20 space-y-3 overflow-hidden">
        {/* Row 1 → */}
        <div className="flex w-max marquee-left">
          {[...row1, ...row1].map((s, i) => <Badge key={i}>{s}</Badge>)}
        </div>
        {/* Row 2 ← */}
        <div className="flex w-max marquee-right">
          {[...row2, ...row2].map((s, i) => <Badge key={i}>{s}</Badge>)}
        </div>
      </div>

      {/* Category grid */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: ci * 0.08 }}
          >
            <div className="font-mono text-[10px] text-muted tracking-[0.25em] uppercase pb-3 mb-4 border-b border-line">
              {cat.title}
            </div>
            <ul className="space-y-2.5">
              {cat.items.map((item, ii) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: ci * 0.06 + ii * 0.03 }}
                  className="font-inter text-sm text-fg/60 hover:text-fg transition-colors duration-150"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
