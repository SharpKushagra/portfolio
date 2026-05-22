/* ═══════════════════════════════════════════
   Portfolio Script — Kushagra Saxena
   ═══════════════════════════════════════════ */

// ─── Typed Text ───────────────────────────
const roles = [
  'SDE 1 @ PanScience',
  'Backend Engineer',
  'WebSocket & WebRTC Dev',
  'AWS Cloud Developer',
  'AI/LLM Builder',
  'Full Stack Engineer',
];

let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}

setTimeout(typeLoop, 600);

// ─── Navbar ───────────────────────────────
const navbar  = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = [...document.querySelectorAll('section[id]')];

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  let current = '';
  sections.forEach(s => {
    if (scrollY >= s.offsetTop) current = s.id;
  });
  navLinks.querySelectorAll('a[href^="#"]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

// ─── Smooth scroll ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ─── Scroll reveal ────────────────────────
const revealTargets = [
  '.section-header',
  '.about-text',
  '.about-stats',
  '.stat-card',
  '.timeline-item',
  '.skill-category',
  '.project-card',
  '.cert-card',
];

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(revealTargets.join(',')).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 6) * 60;
  revealObs.observe(el);
});

// ─── Cursor glow follow ───────────────────
const glow1 = document.querySelector('.hero-glow-1');
const glow2 = document.querySelector('.hero-glow-2');

document.addEventListener('mousemove', e => {
  if (!glow1) return;
  const x = e.clientX, y = e.clientY;
  glow1.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
});

// ─── Skill pill hover ripple ──────────────
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('mouseenter', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:6px; height:6px;
      background:rgba(0,200,255,0.4);
      left:${e.clientX - rect.left - 3}px;
      top:${e.clientY - rect.top - 3}px;
      animation: rippleOut 0.5s ease-out forwards;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Inject ripple keyframes once
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleOut {
    to { transform: scale(12); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ─── Stats counter animation ──────────────
const statNums = document.querySelectorAll('.stat-number');

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const rawText = el.textContent;
    const num = parseInt(rawText.replace(/\D/g, ''), 10);
    const suffix = rawText.replace(/\d/g, '');

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * num) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach(n => counterObs.observe(n));
