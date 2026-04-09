// ── Year in footer ──────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Lightbox ─────────────────────────────────────────────
const lightbox    = document.getElementById('lightbox');
const lbImg       = document.getElementById('lightbox-img');
const lbTitle     = document.getElementById('lightbox-title');
const lbMeta      = document.getElementById('lightbox-meta');
const items       = Array.from(document.querySelectorAll('.gallery-item'));
let current       = 0;

function openLightbox(index) {
  current = index;
  const item  = items[index];
  const img   = item.querySelector('img');
  lbImg.src   = img.src;
  lbImg.alt   = img.alt;
  lbTitle.textContent = item.dataset.title  || '';
  lbMeta.textContent  = [item.dataset.medium, item.dataset.year].filter(Boolean).join(' · ');
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showNext() {
  openLightbox((current + 1) % items.length);
}

function showPrev() {
  openLightbox((current - 1 + items.length) % items.length);
}

items.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-next').addEventListener('click', showNext);
document.querySelector('.lightbox-prev').addEventListener('click', showPrev);

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  showNext();
  if (e.key === 'ArrowLeft')   showPrev();
});

// ── Scroll fade-in ───────────────────────────────────────
const fadeEls = document.querySelectorAll(
  '.gallery-item, .about-inner, .contact-link, .section-header'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ── Stagger gallery items ────────────────────────────────
items.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.07}s`;
});
