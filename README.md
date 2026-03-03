# Gustavo Valentim — AI Portfolio

A modern, responsive portfolio website with a **live AI assistant** that answers questions about my professional background using RAG (Retrieval-Augmented Generation).

**Live:** [gustavovalentim.com](https://gustavovalentim.com) *(or your Vercel URL)*

---

## What This Is

This is the frontend for my interactive AI-powered portfolio. Instead of a static resume site, visitors can **chat with an AI** trained on my professional experience, projects, education, and skills — and get grounded, real-time answers.

The AI assistant is embedded directly into the homepage hero section, and also available as a floating chat widget on all other pages.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router 7 |
| **Deployment** | Vercel (frontend + serverless API proxies) |
| **Backend** | FastAPI on DigitalOcean (separate repo) |
| **AI/ML** | Groq LLaMA 3.3 70B, OpenAI Embeddings, Supabase pgvector |

---

## Architecture

```
Browser (HTTPS)
    │
    ├── /api/proxy         → Vercel Serverless Function → FastAPI /api/ask
    └── /api/contact-proxy → Vercel Serverless Function → FastAPI /api/contact
```

The frontend never calls the backend directly. Vercel serverless functions in the `api/` folder act as HTTPS proxies, solving mixed-content issues and keeping the backend IP private.

---

## Project Structure

```
portfolio-frontend/
├── api/                    # Vercel serverless proxy functions
│   ├── proxy.js            # Chat API proxy → /api/ask
│   └── contact-proxy.js    # Contact form proxy → /api/contact
├── public/                 # Static assets (favicon, images)
├── src/
│   ├── assets/             # Images (profile, robot avatar)
│   ├── components/
│   │   ├── HeroChat.jsx    # Full AI chat embedded in homepage hero
│   │   ├── ChatWidget.jsx  # Floating chat bubble for other pages
│   │   ├── Navbar.jsx      # Navigation bar
│   │   └── ScrollToTop.jsx # Scroll reset on route change
│   ├── context/
│   │   └── ChatContext.jsx  # Shared chat state (messages, input, API calls)
│   ├── pages/
│   │   ├── Home.jsx        # Landing page with AI chat
│   │   ├── Experience.jsx  # Work experience timeline
│   │   ├── Projects.jsx    # Open-source projects
│   │   ├── Education.jsx   # Academic background
│   │   └── Contact.jsx     # Contact form + social links
│   ├── App.jsx             # Router + layout
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Features

- **Live AI Chat** — Ask anything about my experience, projects, or skills. Uses semantic search + reranking over curated professional data.
- **Shared Chat Context** — Conversation carries over between the hero chat and the floating widget across pages.
- **Serverless Proxy** — Backend IP is never exposed to the browser. All API calls go through Vercel's edge.
- **Responsive Design** — Works on desktop, tablet, and mobile.
- **Security Hardened** — Input sanitization, rate limit handling, CSP headers, no frontend API keys.
- **Contact Form** — Sends messages via the backend (Resend email integration).

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

```bash
# Clone the repo
git clone https://github.com/valxntim/ai_portfolio.git
cd ai_portfolio/portfolio-frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173`. Chat features require the backend to be running.

### Environment Variables

For local development, create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

For production (Vercel), set this **server-side** environment variable in the Vercel dashboard:

| Variable | Value | Where |
|----------|-------|-------|
| `BACKEND_URL` | `http://your-server-ip:8000` | Vercel → Settings → Environment Variables |

> `BACKEND_URL` is used by the serverless proxy functions only — it is never exposed to the browser.

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

---

## Deployment (Vercel)

1. Connect the GitHub repo to Vercel.
2. Set the **Root Directory** to `portfolio-frontend`.
3. Add the `BACKEND_URL` environment variable in Vercel's dashboard.
4. Deploy — Vercel automatically detects Vite and the `api/` serverless functions.

---

## Backend

The backend (FastAPI + RAG pipeline) is a separate service that handles:

- Semantic search over professional documents using Supabase pgvector
- OpenAI embeddings + Groq LLaMA 3.3 70B inference
- Importance-weighted reranking
- Rate limiting
- Contact form email delivery via Resend

---

## Author

**Gustavo Valentim**
Computer Engineer — University of Brasília (UnB)

- [LinkedIn](https://www.linkedin.com/in/gustavo-valentiim/)
- [GitHub](https://github.com/valxntim)

---

## License

This project is open source and available under the [MIT License](LICENSE).
