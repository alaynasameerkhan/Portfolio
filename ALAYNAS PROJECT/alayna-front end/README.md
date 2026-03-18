# Alayna Sameer Khan — Portfolio Website

> A dark, sleek cybersecurity-themed personal portfolio website.

---

## 📁 Project Structure

```
portfolio/
├── index.html     # Main HTML structure & page content
├── style.css      # All styles, animations & responsive design
├── app.js         # JavaScript — cursor, typing effect, scroll reveal
└── README.md      # Project documentation (this file)
```

---

## 🚀 Getting Started

No build tools or installations required. This is a pure HTML/CSS/JS project.

### Run Locally

1. Download or clone all files into the same folder
2. Open `index.html` in any modern browser

> ⚠️ **Important:** All four files must be in the **same folder** for the CSS and JS to load correctly.

---

## ✨ Features

- **Custom animated cursor** — dot with a lagging ring effect
- **Typing animation** — hero title types out on page load
- **Scroll reveal** — sections animate in as you scroll
- **Glitch bar** — animated vertical accent bars in the hero
- **Hover interactions** — cards lift, buttons fill, nav links highlight
- **Scanline + grid overlay** — terminal/hacker aesthetic
- **Fully responsive** — adapts to mobile screens

---

## 🎨 Design System

| Token       | Value       | Usage                        |
|-------------|-------------|------------------------------|
| `--bg`      | `#050a0f`   | Page background              |
| `--surface` | `#0b1520`   | Card / section backgrounds   |
| `--accent`  | `#00e5ff`   | Primary cyan accent          |
| `--accent2` | `#00ff88`   | Secondary green accent       |
| `--muted`   | `#4a6277`   | Subdued text / borders       |
| `--danger`  | `#ff3c5a`   | Alert / glitch accent        |

**Fonts:**
- Display: `Syne` (800 weight) — headings
- Mono: `Share Tech Mono` — labels, code, UI elements

---

## 📄 Sections

| Section         | ID          | Description                          |
|-----------------|-------------|--------------------------------------|
| Hero            | `#hero`     | Name, title, bio, CTA buttons        |
| Skills & Tools  | `#skills`   | C Programming, Python, Threat Analysis, Network Security |
| Certifications  | `#certs`    | Infosys, Cisco, NASSCOM              |
| Contact         | `#contact`  | Email, availability, location        |

---

## 🛠️ Customization

### Update your email
In `index.html`, find the contact section and replace:
```html
<div class="contact-item-value">alaynasameerKhan@gmail.com</div>
```

### Add a new skill card
In `index.html`, inside `.skills-grid`, copy and paste:
```html
<div class="skill-card">
  <div class="skill-icon">[XX]</div>
  <div class="skill-name">Skill Name</div>
  <div class="skill-desc">Brief description of this skill.</div>
</div>
```

### Change accent color
In `style.css`, update the CSS variable:
```css
--accent: #00e5ff; /* change to any color */
```

---

## 🌐 Deployment

You can deploy this for free on:
- **GitHub Pages** — push files to a repo, enable Pages in settings
- **Netlify** — drag & drop the folder at netlify.com
- **Vercel** — import the folder via vercel.com

---

## 👤 Author

**Alayna Sameer Khan**  
Junior Cybersecurity Analyst  
📧 alaynasameerKhan@gmail.com

---

*Built with HTML, CSS & Vanilla JavaScript — no frameworks, no dependencies.*
