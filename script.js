// ============================================================
// ILM Portfolio — scroll interactions
// ============================================================

// Hero entrance animation (runs once on load)
window.addEventListener('load', () => {
  document.querySelector('.hero').classList.add('hero-animate');
});

// Sticky nav — shows after scrolling past hero
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

const navObserver = new IntersectionObserver(
  ([entry]) => {
    nav.classList.toggle('visible', !entry.isIntersecting);
  },
  { threshold: 0.1 }
);
navObserver.observe(hero);

// Monogram scrolls to top
document.querySelector('.nav-monogram').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll reveal for all .reveal and .reveal-left elements
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
  revealObserver.observe(el);
});

// Scroll indicator fades out on scroll
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrollIndicator) {
    scrollIndicator.style.opacity = Math.max(0, 1 - scrolled / 200);
  }
}, { passive: true });
