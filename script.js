/* ═══════════════════════════════════════════════════
   Portfolio — Kushagra Saxena  ·  2026
   ═══════════════════════════════════════════════════ */

/* ── Spotlight effect ─────────────────────────── */
const spotlight = document.getElementById('spotlight');
document.addEventListener('mousemove', e => {
  spotlight.style.setProperty('--x', e.clientX + 'px');
  spotlight.style.setProperty('--y', e.clientY + 'px');
}, { passive: true });

/* ── Navbar ───────────────────────────────────── */
const header    = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
}, { passive: true });

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Active nav link ──────────────────────────── */
const sections = [...document.querySelectorAll('section[id]')];

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop) current = s.id; });
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === `#${current}`);
  });
}

/* ── Smooth scroll ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Scroll reveal ────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.07,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

/* ── Stats counter ────────────────────────────── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const dur    = 1200;
    const start  = performance.now();

    function tick(now) {
      const p  = Math.min((now - start) / dur, 1);
      const ep = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ep * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-n[data-target]').forEach(el => counterObserver.observe(el));

/* ── Skill tag hover ripple ───────────────────── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.transition = 'none';
    tag.style.background = 'rgba(124, 58, 237, 0.25)';
    setTimeout(() => {
      tag.style.transition = '';
      tag.style.background = '';
    }, 300);
  });
});

/* ── Project card subtle tilt ─────────────────── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `translateY(-5px) perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Typing role text in hero ─────────────────── */
const typedSpan = document.querySelector('.hero-role-text');
if (typedSpan) {
  const roles = [
    'SDE 1 · PanScience Innovations',
    'Backend Engineer · AWS & Python',
    'Real-time Systems · WebSocket & WebRTC',
    'AI Builder · LLM & RAG',
  ];
  let ri = 0, ci = 0, deleting = false;

  function typeLoop() {
    const current = roles[ri];
    if (!deleting) {
      typedSpan.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(typeLoop, 2000);
        return;
      }
    } else {
      typedSpan.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 75);
  }

  setTimeout(typeLoop, 1200);
}
