/* ============================================================
   GOKUL KRISHNA — Portfolio JS
   ============================================================ */

/* ---- Sticky Header ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---- Active Nav Link on Scroll ---- */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNav = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', highlightNav, { passive: true });

/* ---- Hamburger / Mobile Nav ---- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ---- Smooth Scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h')
    ) || 72;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ---- Portfolio Filter ---- */
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

/* ---- Lightbox ---- */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img || img.style.display === 'none') return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Animated Counter (About Stats) ---- */
const statNums = document.querySelectorAll('.stat-num');

const animateCount = (el) => {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step     = Math.ceil(duration / target);
  let current    = 0;
  const timer    = setInterval(() => {
    current += Math.ceil(target / 60);
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current;
  }, step);
};

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(n => statsObserver.observe(n));

/* ---- Scroll Reveal ---- */
const reveals = document.querySelectorAll(
  '.portfolio-item, .stat-card, .about-para, .section-header'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const index    = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 0.07}s`;
      entry.target.classList.add('reveal', 'visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ---- Parallax on Hero BG ---- */
const heroBg = document.querySelector('.hero-img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
}

/* ---- Cursor spotlight on portfolio items ---- */
portfolioItems.forEach(item => {
  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    item.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  });
});

/* ---- Init ---- */
highlightNav();
console.log('%c✦ Gokul Krishna Portfolio — Loaded', 'color:#c9a84c;font-size:14px;font-weight:bold;');
