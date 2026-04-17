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

// Dashboard carousel
document.querySelectorAll('.dashboard-carousel').forEach(carousel => {
  const track = carousel.querySelector('.dashboard-track');
  const slides = Array.from(track.querySelectorAll('.dashboard-card'));
  const prevBtn = carousel.querySelector('.carousel-btn--prev');
  const nextBtn = carousel.querySelector('.carousel-btn--next');
  const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));

  const go = (i) => {
    const idx = Math.max(0, Math.min(slides.length - 1, i));
    slides[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  const currentIndex = () => {
    const x = track.scrollLeft;
    return Math.round(x / track.clientWidth);
  };

  prevBtn.addEventListener('click', () => go(currentIndex() - 1));
  nextBtn.addEventListener('click', () => go(currentIndex() + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));

  const sync = () => {
    const i = currentIndex();
    dots.forEach((d, j) => {
      d.classList.toggle('is-active', j === i);
      d.setAttribute('aria-selected', j === i ? 'true' : 'false');
    });
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === slides.length - 1;
  };
  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(sync);
  }, { passive: true });
  sync();
});

// Scroll indicator fades out on scroll
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrollIndicator) {
    scrollIndicator.style.opacity = Math.max(0, 1 - scrolled / 200);
  }
}, { passive: true });
