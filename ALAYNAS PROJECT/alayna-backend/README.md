# Alayna Sameer Khan — Portfolio (Full Stack)

> Dark & Sleek cybersecurity portfolio — Node.js + Express + MongoDB backend, connected to a vanilla HTML/CSS/JS frontend.

---

## 📁 Project Structure

```
portfolio/
│
├── 🖥️  BACKEND
│   ├── server.js              # Express app entry point
│   ├── seed.js                # Seeds MongoDB with default data
│   ├── .env                   # Environment variables (edit this!)
│   ├── package.json           # Node dependencies
│   │
│   ├── models/
│   │   ├── Skill.js           # MongoDB schema for skills
│   │   ├── Certification.js   # MongoDB schema for certifications
│   │   └── Project.js         # MongoDB schema for projects
│   │
│   └── routes/
│       ├── skills.js          # GET/POST/PUT/DELETE /api/skills
│       ├── certifications.js  # GET/POST/PUT/DELETE /api/certifications
│       └── projects.js        # GET/POST/PUT/DELETE /api/projects
│
└── 🌐  FRONTEND
    ├── index.html             # Main HTML (fetches data from API)
    ├── style.css              # All styles + animations
    └── app.js                 # JS — API calls, rendering, cursor, animations
```

---

## 🚀 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally (or a MongoDB Atlas URI)

---

### Step 1 — Install Dependencies

```bash
npm install
```

---

### Step 2 — Configure Environment

Edit the `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/alayna_portfolio
PORT=5000
CLIENT_URL=http://127.0.0.1:5500
```

> If using **MongoDB Atlas**, replace `MONGO_URI` with your Atlas connection string.

---

### Step 3 — Seed the Database

Populates MongoDB with Alayna's skills, certifications, and sample projects:

```bash
node seed.js
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Seeded 4 skills
✅ Seeded 3 certifications
✅ Seeded 3 projects
🎉 Database seeded successfully!
```

---

### Step 4 — Start the Backend Server

```bash
# Production
npm start

# Development (auto-restarts on changes)
npm run dev
```

Server runs at: **http://localhost:5000**

---

### Step 5 — Open the Frontend

Open `index.html` in a browser using **Live Server** (VS Code extension) or any local server. The frontend automatically fetches data from the API.

> ⚠️ Do **not** open `index.html` by double-clicking — use a local server so the API calls work. Recommended: VS Code **Live Server** extension (default: `http://127.0.0.1:5500`).

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000`

### Skills
| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | /api/skills      | Get all skills      |
| GET    | /api/skills/:id  | Get one skill       |
| POST   | /api/skills      | Create a skill      |
| PUT    | /api/skills/:id  | Update a skill      |
| DELETE | /api/skills/:id  | Delete a skill      |

### Certifications
| Method | Endpoint                  | Description            |
|--------|---------------------------|------------------------|
| GET    | /api/certifications       | Get all certifications |
| GET    | /api/certifications/:id   | Get one certification  |
| POST   | /api/certifications       | Create a certification |
| PUT    | /api/certifications/:id   | Update a certification |
| DELETE | /api/certifications/:id   | Delete a certification |

### Projects
| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| GET    | /api/projects      | Get all projects   |
| GET    | /api/projects/:id  | Get one project    |
| POST   | /api/projects      | Create a project   |
| PUT    | /api/projects/:id  | Update a project   |
| DELETE | /api/projects/:id  | Delete a project   |

---

## 📦 Example API Payloads

### POST /api/skills
```json
{
  "icon": "[KL]",
  "name": "Kali Linux",
  "description": "Penetration testing and ethical hacking using Kali Linux toolset",
  "order": 5
}
```

### POST /api/certifications
```json
{
  "issuer": "CompTIA",
  "name": "CompTIA Security+",
  "badge": "CERT",
  "year": 2024
}
```

### POST /api/projects
```json
{
  "title": "Password Strength Analyzer",
  "description": "Python tool that evaluates password entropy and suggests improvements",
  "tags": ["Python", "Security", "CLI"],
  "githubUrl": "https://github.com/alaynasameerKhan/project",
  "featured": true
}
```

---

## 🎨 How Frontend Connects to Backend

`app.js` fetches all data on page load:

```js
const API_BASE = 'http://localhost:5000/api';

// Fetches in parallel
const [skills, certs, projects] = await Promise.all([
  fetchAPI('/skills'),
  fetchAPI('/certifications'),
  fetchAPI('/projects')
]);
```

- Skills & certs are rendered into their respective grid sections
- Projects section is shown only if data exists
- Skeleton loaders are shown while fetching
- Error messages appear if the API is unreachable

---

## 🛠️ Customization

**Change accent color** — in `style.css`:
```css
--accent: #00e5ff;  /* any color */
```

**Add a new skill** — POST to API or edit `seed.js` and re-run `node seed.js`

**Use MongoDB Atlas** — in `.env`:
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/alayna_portfolio
```

---

## 👤 Author

**Alayna Sameer Khan**  
Junior Cybersecurity Analyst  
📧 alaynasameerKhan@gmail.com

---

*Stack: HTML · CSS · Vanilla JS · Node.js · Express · MongoDB · Mongoose*
