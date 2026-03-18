/* =============================================
   ALAYNA SAMEER KHAN — Portfolio App Script
   ============================================= */

// --- Custom Cursor ---
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// --- Scroll Reveal ---
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

// --- Skill & Cert Card Stagger ---
document.querySelectorAll('.skill-card, .cert-card').forEach((card, i) => {
  card.style.animationDelay = `${i * 0.1}s`;
});

// --- Typing Effect ---
const typedEl = document.querySelector('.typed');
const typedText = typedEl.textContent;
typedEl.textContent = '';
let charIndex = 0;

setTimeout(() => {
  function typeChar() {
    if (charIndex < typedText.length) {
      typedEl.textContent += typedText[charIndex++];
      setTimeout(typeChar, 80);
    }
  }
  typeChar();
}, 600);
