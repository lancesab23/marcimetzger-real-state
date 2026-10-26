'use strict';

// Navigation: homepage sections only (no subpages or frameworks).
const menuButton = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = isOpen;
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

// Highlight current section as the visitor scrolls.
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const trackedSections = ['top', 'about', 'services', 'gallery', 'contact'];
const navObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + visible.target.id));
}, {rootMargin:'-25% 0px -60% 0px',threshold:0});
trackedSections.forEach(id => {const el=document.getElementById(id); if(el)navObserver.observe(el);});

// Subtle entrance reveal. Respects the reduced-motion media query in CSS.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
    });
  }, { threshold: 0.09, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('visible'));
}

// Contact interactions: mailto is intentional. This static site has no email backend.
const CONTACT_EMAIL = 'Marcimetzger@gmail.com';
function setupMailForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const feedback = form.querySelector('.form-feedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    feedback.textContent = '';
    feedback.classList.remove('error');
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const name = String(values.get('name') || '').trim();
    const email = String(values.get('email') || '').trim();
    const phone = String(values.get('phone') || '').trim();
    const interest = String(values.get('interest') || '').trim();
    const message = String(values.get('message') || '').trim();
    const subject = `Website inquiry from ${name}`;
    const body = [
      `Hello Marci,`, '',
      `I'm reaching out from the homepage.`, '',
      `Name: ${name}`, `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      interest && `Interested in: ${interest}`,
      message && `Message: ${message}`, '',
      `Thank you!`
    ].filter(line => line !== false && line !== undefined).join('\n');
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    feedback.textContent = 'Opening your email application. Review and send the drafted message there.';
    window.location.href = url;
  });
}
setupMailForm('hero-form');
setupMailForm('contact-form');

// Gallery lightbox with arrows, Escape, next/previous and focus restoration.
const galleryButtons = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCounter = document.getElementById('lightbox-counter');
let activePhoto = 0;
let lastFocusedGalleryButton = null;
function showPhoto(index) {
  activePhoto = (index + galleryButtons.length) % galleryButtons.length;
  lightboxImage.src = galleryButtons[activePhoto].dataset.src;
  lightboxImage.alt = galleryButtons[activePhoto].dataset.alt || 'Property photograph';
  lightboxCounter.textContent = `${activePhoto + 1} / ${galleryButtons.length}`;
}
galleryButtons.forEach((button, index) => button.addEventListener('click', () => {
  lastFocusedGalleryButton = button;
  showPhoto(index);
  if (typeof lightbox.showModal === 'function') lightbox.showModal();
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.getElementById('prev-photo').addEventListener('click', () => showPhoto(activePhoto - 1));
document.getElementById('next-photo').addEventListener('click', () => showPhoto(activePhoto + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => {lightboxImage.removeAttribute('src');lastFocusedGalleryButton?.focus();});
lightbox.addEventListener('keydown', event => {
  if(event.key === 'ArrowLeft') showPhoto(activePhoto - 1);
  if(event.key === 'ArrowRight') showPhoto(activePhoto + 1);
});

// Back-to-top visibility and footer date.
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 580), {passive:true});
document.getElementById('year').textContent = new Date().getFullYear();
