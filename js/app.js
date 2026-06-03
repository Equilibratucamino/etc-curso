/* ═══════════════════════════════════════════════════════════════════
   ETC Recovery Program — App JS
   ═══════════════════════════════════════════════════════════════════ */

/* ── NAV SCROLL ─────────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
}

/* ── REVEAL ON SCROLL ────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

/* ── SMOOTH COUNT-UP ─────────────────────────────────────────────── */
function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target) + (el.dataset.suffix || '');
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const countEls = document.querySelectorAll('[data-count]');
if (countEls.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { countUp(e.target); countObserver.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => countObserver.observe(el));
}

/* ── MODULE PROGRESS (demo state) ───────────────────────────────── */
const PROGRESS = {
  completed: [1, 2, 3, 4],
  current: 5,
  total: 15
};

document.querySelectorAll('[data-module]').forEach(card => {
  const n = parseInt(card.dataset.module, 10);
  const badge = card.querySelector('.module-badge');
  if (!badge) return;
  if (PROGRESS.completed.includes(n)) {
    badge.classList.add('badge--done');
    badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    card.classList.add('module-done');
  } else if (n === PROGRESS.current) {
    badge.classList.add('badge--active');
    card.classList.add('module-active');
  } else if (n > PROGRESS.current) {
    card.classList.add('module-locked');
  }
});

/* Update progress bar */
const pFill = document.querySelector('.progress-fill[data-progress]');
if (pFill) {
  const pct = (PROGRESS.completed.length / PROGRESS.total) * 100;
  setTimeout(() => { pFill.style.width = pct + '%'; }, 400);
}
const pText = document.querySelector('[data-progress-text]');
if (pText) pText.textContent = `${PROGRESS.completed.length} / ${PROGRESS.total}`;

/* ── VIDEO PLAYER MOCK ───────────────────────────────────────────── */
const playBtn = document.querySelector('.video-play-btn');
const videoArea = document.querySelector('.video-area');
if (playBtn && videoArea) {
  playBtn.addEventListener('click', () => {
    videoArea.classList.add('playing');
    playBtn.style.opacity = '0';
    playBtn.style.pointerEvents = 'none';
  });
}

/* ── FAQ ACCORDION ───────────────────────────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  const trigger = item.querySelector('.faq-trigger');
  const body = item.querySelector('.faq-body');
  if (!trigger || !body) return;
  trigger.addEventListener('click', () => {
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-body').style.maxHeight = '0';
    });
    if (!open) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

/* ── MOBILE NAV ──────────────────────────────────────────────────── */
const menuBtn = document.querySelector('.nav__menu-btn');
const mobileMenu = document.querySelector('.nav__mobile');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });
}
