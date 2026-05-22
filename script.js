/* ═══════════════════════════════════════════════
   Portfolio Script — Kushagra Saxena
   ═══════════════════════════════════════════════ */

/* ─── Loader ─────────────────────────────────── */
const loader     = document.getElementById('loader');
const loaderText = document.getElementById('loaderText');
let loadCount    = 0;

const loadInterval = setInterval(() => {
  loadCount += Math.floor(Math.random() * 18) + 6;
  if (loadCount >= 100) {
    loadCount = 100;
    clearInterval(loadInterval);
    loaderText.textContent = '100';
    setTimeout(() => {
      loader.classList.add('done');
      revealHeroText();
    }, 350);
  }
  loaderText.textContent = String(loadCount).padStart(2, '0');
}, 60);

/* ─── Hero Text Reveal ───────────────────────── */
function revealHeroText() {
  const names = document.querySelectorAll('.hero-name');
  names.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });
  document.querySelectorAll('.reveal-up[data-delay]').forEach(el => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay + 200);
  });
}

/* ─── Custom Cursor ──────────────────────────── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .proj-card, .cert-row, .skill-list li').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.mixBlendMode = 'difference';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.mixBlendMode = 'normal';
  });
});

/* ─── Navbar ──────────────────────────────────── */
const nav        = document.getElementById('nav');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  setActiveLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── Active Nav Link ────────────────────────── */
const sections = [...document.querySelectorAll('section[id]')];

function setActiveLink() {
  const y = window.scrollY + 120;
  let active = '';
  sections.forEach(s => { if (y >= s.offsetTop) active = s.id; });
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${active}`);
  });
}

/* ─── Smooth Scroll ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── Scroll Reveal ──────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay);
    revealObs.unobserve(el);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up:not([data-hero])').forEach(el => revealObs.observe(el));

/* ─── Section Rule Animate ───────────────────── */
const ruleObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'scaleX(1)';
      ruleObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section-rule').forEach(rule => {
  rule.style.transform = 'scaleX(0)';
  rule.style.transformOrigin = 'left';
  rule.style.transition = 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)';
  ruleObs.observe(rule);
});

/* ─── Stats Counter ──────────────────────────── */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target);
    const dur    = 1400;
    const start  = performance.now();

    function tick(now) {
      const p  = Math.min((now - start) / dur, 1);
      const ep = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(ep * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-n[data-target]').forEach(el => counterObs.observe(el));

/* ─── Sparkle rotate on scroll ───────────────── */
const sparkle = document.querySelector('.sparkle');
if (sparkle) {
  window.addEventListener('scroll', () => {
    const deg = window.scrollY * 0.15;
    sparkle.style.transform = `rotate(${deg}deg)`;
  }, { passive: true });
}

/* ─── Magnetic Buttons ───────────────────────── */
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-contact').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    btn.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
  });
});

/* ─── Skill list stagger on block hover ──────── */
document.querySelectorAll('.skill-block').forEach(block => {
  const items = block.querySelectorAll('.skill-list li');
  block.addEventListener('mouseenter', () => {
    items.forEach((li, i) => {
      li.style.transitionDelay = `${i * 30}ms`;
      li.style.paddingLeft = '6px';
    });
  });
  block.addEventListener('mouseleave', () => {
    items.forEach(li => {
      li.style.transitionDelay = '0ms';
      li.style.paddingLeft = '0px';
    });
  });
});

/* ─── Project card tilt ──────────────────────── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s';
  });
});

/* ─── Text scramble on section display hover ─── */
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function scramble(el) {
  const original = el.dataset.original || el.textContent;
  el.dataset.original = original;
  let iter = 0;
  const clean = original.replace(/\n/g, '\n');
  const words = clean.split('');
  const interval = setInterval(() => {
    el.textContent = words.map((ch, i) => {
      if (ch === '\n') return '\n';
      if (ch === ' ') return ' ';
      if (i < iter) return original[i];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    if (iter >= words.length) clearInterval(interval);
    iter += 2;
  }, 28);
}

document.querySelectorAll('.section-display').forEach(el => {
  el.style.cursor = 'default';
  el.addEventListener('mouseenter', () => scramble(el));
});
