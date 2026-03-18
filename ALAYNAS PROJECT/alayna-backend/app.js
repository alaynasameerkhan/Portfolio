/* =============================================
   ALAYNA SAMEER KHAN — Portfolio Frontend App
   Connects to Node.js/Express + MongoDB backend
   File: app.js
   ============================================= */

const API_BASE = 'http://localhost:5000/api';

// --- Custom Cursor ---
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// --- Typing Effect ---
const typedEl   = document.querySelector('.typed');
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

// --- Scroll Reveal ---
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============================================
//   API FETCH HELPERS
// =============================================

async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error(`[API Error] ${endpoint}:`, err.message);
    return null;
  }
}

// =============================================
//   RENDER: SKILLS
// =============================================

function renderSkills(skills) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  if (!skills || skills.length === 0) {
    grid.innerHTML = '<p class="api-error">// Failed to load skills from database</p>';
    return;
  }

  grid.innerHTML = skills.map((skill, i) => `
    <div class="skill-card" style="animation-delay: ${i * 0.1}s">
      <div class="skill-icon">${escapeHTML(skill.icon)}</div>
      <div class="skill-name">${escapeHTML(skill.name)}</div>
      <div class="skill-desc">${escapeHTML(skill.description)}</div>
    </div>
  `).join('');

  // Re-observe newly rendered cards
  grid.querySelectorAll('.skill-card').forEach(el => revealObserver.observe(el));
}

// =============================================
//   RENDER: CERTIFICATIONS
// =============================================

function renderCertifications(certs) {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;

  if (!certs || certs.length === 0) {
    grid.innerHTML = '<p class="api-error">// Failed to load certifications from database</p>';
    return;
  }

  grid.innerHTML = certs.map((cert, i) => `
    <div class="cert-card" style="animation-delay: ${i * 0.1}s">
      <div class="cert-badge">${escapeHTML(cert.badge || 'CERT')}</div>
      <div class="cert-issuer">${escapeHTML(cert.issuer)}</div>
      <div class="cert-name">${escapeHTML(cert.name)}</div>
      ${cert.year ? `<div class="cert-year">${cert.year}</div>` : ''}
    </div>
  `).join('');
}

// =============================================
//   RENDER: PROJECTS
// =============================================

function renderProjects(projects) {
  const section = document.getElementById('projects-section');
  const grid    = document.getElementById('projects-grid');
  if (!grid || !section) return;

  if (!projects || projects.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  grid.innerHTML = projects.map((proj, i) => `
    <div class="project-card reveal" style="animation-delay: ${i * 0.1}s">
      <div class="project-header">
        <div class="project-title">${escapeHTML(proj.title)}</div>
        ${proj.featured ? '<span class="project-badge">Featured</span>' : ''}
      </div>
      <div class="project-desc">${escapeHTML(proj.description)}</div>
      <div class="project-tags">
        ${(proj.tags || []).map(tag => `<span class="project-tag">${escapeHTML(tag)}</span>`).join('')}
      </div>
      <div class="project-links">
        ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="project-link">[GitHub]</a>` : ''}
        ${proj.liveUrl   ? `<a href="${proj.liveUrl}"   target="_blank" class="project-link">[Live]</a>`   : ''}
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.project-card').forEach(el => revealObserver.observe(el));
}

// =============================================
//   RENDER: LOADING SKELETONS
// =============================================

function showSkeleton(containerId, count = 4) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array(count).fill(`
    <div class="skeleton-card">
      <div class="skeleton-line short"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
    </div>
  `).join('');
}

// =============================================
//   UTILITY
// =============================================

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

// =============================================
//   INIT — Load all data from API
// =============================================

async function init() {
  // Show skeletons while loading
  showSkeleton('skills-grid', 4);
  showSkeleton('certs-grid', 3);

  // Fetch all data in parallel
  const [skills, certs, projects] = await Promise.all([
    fetchAPI('/skills'),
    fetchAPI('/certifications'),
    fetchAPI('/projects')
  ]);

  renderSkills(skills);
  renderCertifications(certs);
  renderProjects(projects);
}

document.addEventListener('DOMContentLoaded', init);
