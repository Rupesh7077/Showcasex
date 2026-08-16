# ShowCaseX — AI & Static Portfolio Generator

A modern, fast, and minimalist portfolio generator web application built with pure vanilla HTML5, CSS3, and JavaScript, powered by Google Gemini AI. ShowCaseX allows developers, designers, and students to generate clean portfolios from a single natural language prompt or using a structured builder, with live preview, URL-encoded sharing, and standalone HTML download.

---

## 🌟 Key Features

- **Gemini AI Integration**:
  - **✨ AI Portfolio Prompt**: Describe yourself, work history, projects, and skills in natural language—Gemini extracts and structures your entire portfolio in seconds.
  - **✨ AI Polish**: One-click AI polishing for Bio, Work Experience impact statements, and Project summaries.
- **No Backend Required**: 100% client-side static application. Works out of the box with zero build step.
- **Zero External JS/CSS Frameworks**: Pure Vanilla JavaScript (ES6+) and modern CSS3 design tokens.
- **Structured Portfolio Builder**:
  - Personal Information (Name, Title, Bio, Profile Image URL, Resume URL)
  - Contact & Social Links (Email, Phone, Location, Website, GitHub, LinkedIn, Twitter/X)
  - Skills & Tech Stack (Tag pills with quick suggestions)
  - Work Experience (Dynamic multi-card timeline cards)
  - Education & Certifications (Dynamic multi-entry credentials)
  - Projects (Dynamic cards with technology tags, live demo & source repo links)
- **Minimalist Themes**:
  - `Minimal Light`: Clean, crisp editorial aesthetic.
  - `Modern Dark`: Deep charcoal palette with high contrast.
  - `Indigo Slate`: Tech-forward palette with subtle indigo highlights.
- **Shareable Encoded URLs**: Entire portfolio state is compressed and encoded in the URL hash (`#portfolio=...`), ensuring shared links render instantly on any browser and persist upon refresh.
- **Standalone HTML Download**: Export a single-file, self-contained `portfolio.html` with embedded styles and responsive layout.
- **Local Storage Auto-Save**: Your draft is preserved automatically in the browser.

---

## 📁 File Structure

Strict 4-file structure:

```
Portfolio generator/
├── index.html       # Semantic single-page HTML layout & AI modals
├── style.css        # Responsive CSS styling, themes & animations
├── script.js        # Form logic, Gemini AI client, router & renderer
└── README.md        # Documentation
```

---

## 🚀 How to Run Locally

Since ShowCaseX is a pure static website:

1. Double click `index.html` to open it directly in any modern web browser.
2. Alternatively, run a local static server:
   ```bash
   # Python 3
   python -m http.server 3000

   # or npx serve
   npx serve .
   ```
3. Open `http://localhost:3000` in your browser.

---

## 🌐 Deployment

Deploy to any static hosting service in seconds:

- **GitHub Pages**: Push to repository -> Enable Pages under Settings.
- **Vercel**: Run `vercel` in the project root.
- **Netlify**: Drag & drop the project folder onto Netlify Drop.
- **Cloudflare Pages / Render**: Connect Git repo and select static site deploy.

---

## 📄 License

MIT License. Free for personal and commercial use.
