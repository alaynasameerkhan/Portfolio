/* =============================================
   ALAYNA SAMEER KHAN — Portfolio App Script
   ============================================= */

// --- Custom Cursor ---
/*const cursor = document.getElementById('cursor');
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
});*/
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

// =============================================
//   CONTACT FORM LOGIC
// =============================================

(function initContactForm() {
  const nameInput    = document.getElementById('cf-name');
  const emailInput   = document.getElementById('cf-email');
  const subjectSel   = document.getElementById('cf-subject');
  const messageTA    = document.getElementById('cf-message');
  const submitBtn    = document.getElementById('cf-submit');
  const btnText      = submitBtn?.querySelector('.btn-text');
  const btnLoader    = document.getElementById('btn-loader');
  const formStatus   = document.getElementById('form-status');
  const formSuccess  = document.getElementById('form-success');
  const formReset    = document.getElementById('form-reset');
  const charCount    = document.getElementById('char-count');
  const charCounter  = charCount?.parentElement;
  const MAX_CHARS    = 500;

  if (!nameInput) return; // Guard — form not in DOM

  // --- Character counter ---
  messageTA.addEventListener('input', () => {
    const len = messageTA.value.length;
    charCount.textContent = len;
    if (len > MAX_CHARS) {
      messageTA.value = messageTA.value.slice(0, MAX_CHARS);
      charCount.textContent = MAX_CHARS;
      charCounter.classList.add('warn');
    } else {
      charCounter.classList.remove('warn');
    }
  });

  // --- Field focus — highlight label via CSS :focus-within, nothing needed here ---

  // --- Validation ---
  function validate() {
    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const subject = subjectSel.value;
    const message = messageTA.value.trim();

    if (!name) {
      setStatus('// error: name field is required', false);
      nameInput.focus();
      return false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('// error: enter a valid email address', false);
      emailInput.focus();
      return false;
    }
    if (!subject) {
      setStatus('// error: please select a reason for contact', false);
      subjectSel.focus();
      return false;
    }
    if (!message || message.length < 10) {
      setStatus('// error: message must be at least 10 characters', false);
      messageTA.focus();
      return false;
    }
    return true;
  }

  function setStatus(msg, ok = false) {
    formStatus.textContent = msg;
    formStatus.className = 'form-status' + (ok ? ' ok' : '');
  }

  // --- Submit via mailto ---
  submitBtn.addEventListener('click', () => {
    setStatus('');
    if (!validate()) return;

    // Show loader state
    btnText.style.display  = 'none';
    btnLoader.style.display = 'inline';
    submitBtn.disabled      = true;

    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const subject = subjectSel.value;
    const message = messageTA.value.trim();

    // Compose mailto body
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Reason: ${subject}`,
      ``,
      `Message:`,
      message
    ].join('\n');

    const mailto = `mailto:alaynasameerKhan@gmail.com`
      + `?subject=${encodeURIComponent(`[Portfolio] ${subject} — ${name}`)}`
      + `&body=${encodeURIComponent(body)}`;

    // Slight delay for UX feel, then open mail client
    setTimeout(() => {
      window.location.href = mailto;

      // Reset loader and show success overlay
      btnText.style.display  = 'inline';
      btnLoader.style.display = 'none';
      submitBtn.disabled      = false;

      showSuccess();
    }, 900);
  });

  // --- Show success state ---
  function showSuccess() {
    formSuccess.style.display = 'flex';
    formSuccess.style.flexDirection = 'column';
    formSuccess.style.alignItems = 'center';
    formSuccess.style.justifyContent = 'center';
  }

  // --- Reset form ---
  formReset?.addEventListener('click', () => {
    nameInput.value    = '';
    emailInput.value   = '';
    subjectSel.value   = '';
    messageTA.value    = '';
    charCount.textContent = '0';
    charCounter.classList.remove('warn');
    setStatus('');
    formSuccess.style.display = 'none';
  });

  // --- Clear status on any input change ---
  [nameInput, emailInput, subjectSel, messageTA].forEach(el => {
    el.addEventListener('input', () => {
      if (formStatus.textContent) setStatus('');
    });
  });

})();
