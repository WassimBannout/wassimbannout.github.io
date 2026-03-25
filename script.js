/* ============================================================
   WASSIM BANNOUT — PORTFOLIO  v3
   ============================================================ */

(function () {
  'use strict';

  /* ── All DOM refs up front (const TDZ safety) ────────────── */
  const navbar    = document.getElementById('navbar');
  const progress  = document.getElementById('scroll-progress');
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
  const reveals   = document.querySelectorAll('.reveal');


  /* ── Scroll handler ──────────────────────────────────────── */
  function onScroll() {
    const y = window.scrollY;

    // Navbar blur
    navbar.classList.toggle('scrolled', y > 50);

    // Reading progress
    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    }

    // Active nav
    updateActiveNav(y);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ── Active nav link ─────────────────────────────────────── */
  function updateActiveNav(y) {
    const threshold = y + window.innerHeight * 0.35;
    let active = '';
    sections.forEach((s) => { if (s.offsetTop <= threshold) active = s.id; });
    navLinks.forEach((l) => {
      l.classList.toggle('active', l.getAttribute('href') === `#${active}`);
    });
  }


  /* ── Smooth scroll ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const href   = this.getAttribute('href');
      const target = href && href !== '#' ? document.querySelector(href) : null;
      if (!target) return;
      e.preventDefault();

      // Close mobile menu
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show')) {
        try { bootstrap.Collapse.getInstance(collapse)?.hide(); } catch (_) {}
      }

      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 66;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - navH,
        behavior: 'smooth',
      });
    });
  });


  /* ── Reveal on scroll ────────────────────────────────────── */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -28px 0px' }
  );

  reveals.forEach((el) => revealObs.observe(el));

  // Stagger project cards
  document.querySelectorAll('.pcard.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });


  /* ── Cursor glow (pointer devices only) ─────────────────── */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);

    let mx = -1000, my = -1000, raf = null;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        glow.style.left = mx + 'px';
        glow.style.top  = my + 'px';
        raf = null;
      });
    }, { passive: true });
  }


  /* ── Email: copy to clipboard + visual feedback ──────────── */
  document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
    a.addEventListener('click', () => {
      const email = a.getAttribute('href').replace('mailto:', '');
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(email).catch(() => {});

      const label = a.querySelector('.clink-label');
      if (!label) return;
      const orig = label.textContent;
      label.textContent = 'Copied!';
      setTimeout(() => { label.textContent = orig; }, 2000);
    });
  });

})();
