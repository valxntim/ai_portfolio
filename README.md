# Gustavo Valentim — AI-Powered Portfolio

A modern full-stack portfolio featuring a **live AI assistant** capable of answering questions about my experience, projects, and skills using **Retrieval-Augmented Generation (RAG)**.

**Live:** [gustavovalentim.com](https://gustavovalentim.com) *(or your Vercel URL)*

---

## Overview

This project is an **AI-native portfolio website** designed to demonstrate practical AI engineering and modern full-stack architecture.

The application combines:

- A **React frontend** with a real-time chat interface
- A **Python FastAPI backend** orchestrating LLM interactions
- A **vector database** enabling semantic search over professional data

Users can ask questions such as:

- “What projects has Gustavo worked on?”
- “What AI technologies does he use?”
- “What is his background in machine learning?”

The AI retrieves relevant information from a vector store and generates grounded responses.

---

## Tech Stack

| Layer | Technology |
|------|-------------|
| **Frontend** | React 19, Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **Backend API** | Python, FastAPI |
| **LLM Inference** | Groq (LLaMA 3.3 70B) |
| **Embeddings** | OpenAI Embeddings |
| **Vector Database** | Supabase pgvector |
| **Deployment** | Vercel (Frontend) + DigitalOcean (Backend) |

---

## Architecture

```
User Browser
      │
      │ HTTPS
      ▼
Vercel Frontend (React)
      │
      │ Serverless Proxy
      ▼
FastAPI Backend (DigitalOcean VPS)
      │
      ├── Groq LLM
      ├── OpenAI Embeddings
      └── Supabase Vector Database
```

### Why This Architecture?

- **Security** — Backend IP is hidden via Vercel proxy
- **Scalability** — Frontend served globally via CDN
- **Low Latency** — Groq inference for fast LLM responses
- **Structured Outputs** — LLM responses validated with Pydantic

---

## Key AI Engineering Features

### Retrieval-Augmented Generation (RAG)

The AI assistant retrieves relevant context from a **vector database containing professional data** before generating responses.

```
User Question
      ↓
Embedding Generation
      ↓
Vector Similarity Search (Supabase pgvector)
      ↓
Context Retrieval
      ↓
LLM Response Generation
```

---

### Structured LLM Outputs

Responses are constrained to a **Pydantic schema** to guarantee reliable formatting.

```python
LLMResponse.model_validate_json(response)
```

If the model returns invalid output:

1. The system catches the validation error  
2. The LLM is prompted to correct its response  
3. The corrected output is validated again  

This creates a **self-correcting LLM pipeline**.

---

### Rate Limiting

API endpoints use **SlowAPI** to limit requests.

```
3 requests per minute per IP
```

This prevents abuse and protects compute resources.

---

## Project Structure

```
ai_portfolio/
│
├── backend/
│   └── main.py
│
├── portfolio-frontend/
│   ├── api/
│   │   ├── proxy.js
│   │   └── contact-proxy.js
│   │
│   ├── src/
│   └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+

---

## Frontend Setup

```bash
git clone https://github.com/valxntim/ai_portfolio.git

cd ai_portfolio/portfolio-frontend

npm install
```

Create `.env`:

```
VITE_API_URL=http://localhost:8000
```

Run the development server:

```bash
npm run dev
```

---

## Backend Setup

```bash
cd ai_portfolio/backend

pip install fastapi uvicorn supabase openai groq pydantic slowapi httpx python-dotenv
```

Create `.env` with:

```
SUPABASE_URL=
SUPABASE_KEY=
OPENAI_API_KEY=
GROQ_API_KEY=
RESEND_API_KEY=
```

Start the API:

```bash
uvicorn main:app --reload
```

---

## Security Considerations

- Frontend **never exposes API keys**
- Backend protected with **CORS restrictions**
- **Rate limiting** applied to public endpoints
- **Proxy architecture** hides backend infrastructure

---

## Author

**Gustavo Valentim**  
Computer Engineer — University of Brasília (UnB)

🔗 LinkedIn  
https://linkedin.com/in/gustavovalentim

💻 GitHub  
https://github.com/valxntim

---

## License

MIT License