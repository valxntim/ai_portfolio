import { Link } from 'react-router-dom'

const projects = [
    {
        title: 'RAG System for Brazilian Official Gazette',
        description: 'A complete RAG pipeline for extracting exact monetary values from Brazilian public contracts published in the Diário Oficial. Includes a public benchmark dataset with 554 validated extracts and 1,662+ evaluation questions. Developed as undergraduate thesis at UnB.',
        highlights: [
            'Custom Neighbor Retriever strategy for expanded semantic context',
            'FAISS vector search with GPU support',
            'Local LLaMA 3.1 inference via Ollama',
            'BGE-M3 local embeddings',
            'Grid search across chunk size, top-k, and neighbor parameters',
            'Automated hallucination evaluation with exact monetary value comparison',
            'Designed to rigorously evaluate retrieval precision in Portuguese legal-domain RAG',
        ],
        tags: ['FAISS', 'LLaMA 3.1', 'BGE-M3', 'Ollama', 'Python', 'RAG'],
        github: 'https://github.com/valxntim/rag-diario-oficial',
        dataset: 'https://huggingface.co/datasets/valxntim/DiarioOficial-Contratos-BR-GT',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'AI Portfolio Assistant (This Site!)',
        description: 'A RAG-powered chatbot that answers questions about my professional background, built with semantic search, reranking, and Groq-hosted LLaMA inference. Try it — click the chat bubble in the bottom right.',
        highlights: [
            'Supabase pgvector for semantic document search',
            'OpenAI embeddings + Groq LLaMA 3.3 70B inference',
            'Importance-weighted reranking',
            'Rate-limited FastAPI backend',
            'React + Tailwind floating chat widget',
        ],
        tags: ['FastAPI', 'Supabase', 'OpenAI', 'Groq', 'React', 'Tailwind'],
        color: 'from-violet-500 to-purple-500',
    },
]

export default function Projects() {
    return (
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
            <Link to="/" className="text-slate-500 hover:text-blue-400 text-sm font-mono mb-8 inline-block transition-colors">
                ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
                Projects
            </h1>
            <p className="text-slate-400 text-lg mb-12">Open-source work and production systems I've built.</p>

            <div className="space-y-8">
                {projects.map((project, i) => (
                    <div key={i} className="group p-6 rounded-2xl border border-slate-800 bg-slate-800/20 backdrop-blur-sm hover:border-slate-700 transition-all">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <h2 className={`text-2xl font-bold bg-gradient-to-r ${project.color} text-transparent bg-clip-text`}>
                                {project.title}
                            </h2>
                            <div className="flex gap-2 shrink-0">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                                        GitHub ↗
                                    </a>
                                )}
                                {project.dataset && (
                                    <a href={project.dataset} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                                        Dataset ↗
                                    </a>
                                )}
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

                        <ul className="space-y-1.5 mb-4">
                            {project.highlights.map((h, j) => (
                                <li key={j} className="text-sm text-slate-300 flex gap-2">
                                    <span className="text-slate-600 shrink-0">▸</span>
                                    {h}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full border border-slate-700 text-slate-400 font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
