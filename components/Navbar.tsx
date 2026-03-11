"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-px bg-accent origin-left z-[100]"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-500 ${
          scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-line" : ""
        }`}
      >
        <div className="flex items-center justify-between h-full px-6 md:px-12 max-w-7xl mx-auto">
          {/* Logo */}
          <a href="#" className="font-syne font-extrabold text-sm tracking-widest text-fg">
            WB<span className="text-accent">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-inter text-xs text-muted hover:text-fg tracking-widest uppercase transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/WassimBannout"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-inter text-xs font-medium px-5 py-2 text-fg border border-subtle hover:border-accent/50 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">
                GitHub ↗
              </span>
              <span className="absolute inset-0 bg-accent/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden font-mono text-xs text-muted tracking-widest"
            aria-label="menu"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-line overflow-hidden"
            >
              <div className="px-6 py-6 space-y-5">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-inter text-sm text-muted hover:text-fg transition-colors py-1 tracking-widest uppercase"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="https://github.com/WassimBannout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-inter text-sm text-fg pt-4 border-t border-line"
                >
                  GitHub ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
