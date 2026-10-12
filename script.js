/* ═══════════════════════════════════════════════════
   Portfolio — Kushagra Saxena
   Editorial Minimalist Presentation Logic
   ═══════════════════════════════════════════════════ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Navbar & Mobile Drawer ───────────────────── */
const header    = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
  updateActiveLink();
}, { passive: true });

if (navToggle && navMenu) {
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
}

/* ── Active nav link on scroll ────────────────── */
const sections = [...document.querySelectorAll('section[id]')];

function updateActiveLink() {
  const scrollY = window.scrollY + 140;
  let current = '';
  sections.forEach(s => {
    if (scrollY >= s.offsetTop) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === `#${current}`);
  });
}

/* ── Smooth scroll between sections ──────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

/* ── Soft fade-and-rise reveals ───────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

/* ── Metric stats counter ─────────────────────── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);

    if (prefersReducedMotion) {
      el.textContent = target;
      counterObserver.unobserve(el);
      return;
    }

    const dur   = 1200;
    const start = performance.now();

    function tick(now) {
      const p  = Math.min((now - start) / dur, 1);
      const ep = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ep * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-n[data-target]').forEach(el => counterObserver.observe(el));

/* ── Typing role text in hero ─────────────────── */
const typedSpan = document.querySelector('.hero-role-text');
if (typedSpan) {
  const roles = [
    'AIML Engineer · Eastern Book Company',
    'RAG & Knowledge Bases · AWS Bedrock',
    'NLP Pipelines & Multi-Vector DBs',
    'High-Throughput Systems · SDE',
    'Former SDE 1 · PanScience Innovations'
  ];

  if (prefersReducedMotion) {
    typedSpan.textContent = roles[0];
  } else {
    let ri = 0, ci = 0, deleting = false;

    function typeLoop() {
      const current = roles[ri];
      if (!deleting) {
        typedSpan.textContent = current.slice(0, ci + 1);
        ci++;
        if (ci === current.length) {
          deleting = true;
          setTimeout(typeLoop, 2200);
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
      setTimeout(typeLoop, deleting ? 30 : 65);
    }

    setTimeout(typeLoop, 900);
  }
}

/* ── Project Filter Tabs ──────────────────────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const categories = card.dataset.category || '';
      if (filter === 'all' || categories.split(' ').includes(filter)) {
        card.style.display = 'flex';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  });
});

/* ── Interactive Email Copy & Toast ───────────── */
const copyEmailBtn = document.getElementById('copyEmailBtn');
const toast        = document.getElementById('toast');
const emailText    = document.getElementById('emailText');

if (copyEmailBtn && toast && emailText) {
  copyEmailBtn.addEventListener('click', () => {
    const textToCopy = emailText.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Email copied to clipboard');
      }).catch(() => {
        window.location.href = `mailto:${textToCopy}`;
      });
    } else {
      window.location.href = `mailto:${textToCopy}`;
    }
  });
}

function showToast(message) {
  if (!toast) return;
  const span = toast.querySelector('span');
  if (span) span.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
