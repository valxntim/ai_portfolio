import { Link } from 'react-router-dom'

const degrees = [
    {
        institution: 'University of Brasília (UnB)',
        location: 'Brasília, Brazil',
        degree: 'B.Sc. in Computer Engineering',
        period: '2020 – 2025',
        description: 'Strong foundation in computer science, software engineering, data structures, algorithms, distributed systems, and applied AI. Senior thesis on RAG systems for legal-domain document analysis with a public benchmark dataset.',
        icon: '🎓',
        color: 'blue',
    },
    {
        institution: 'Estácio University',
        location: 'Remote',
        degree: 'Associate Degree in IT Management',
        period: '2020 – 2022',
        description: 'Focused on IT governance, systems management, and organizational technology processes. Strengthened understanding of applied IT systems within business and institutional environments.',
        icon: '📘',
        color: 'emerald',
    },
]

const colorMap = {
    blue: 'border-blue-500/30 hover:border-blue-500/60',
    emerald: 'border-emerald-500/30 hover:border-emerald-500/60',
}

export default function Education() {
    return (
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-20">
            <Link to="/" className="text-slate-500 hover:text-blue-400 text-sm font-mono mb-8 inline-block transition-colors">
                ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
                Education
            </h1>
            <p className="text-slate-400 text-lg mb-12">Academic background that shaped my engineering foundation.</p>

            <div className="space-y-8">
                {degrees.map((deg, i) => (
                    <div key={i} className={`p-6 rounded-2xl border bg-slate-800/20 backdrop-blur-sm transition-all ${colorMap[deg.color]}`}>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">{deg.icon}</span>
                            <div>
                                <h2 className="text-xl font-bold text-slate-100">{deg.degree}</h2>
                                <p className="text-slate-400 text-sm">{deg.institution} · {deg.location}</p>
                            </div>
                        </div>
                        <span className="text-xs font-mono text-slate-500 mb-3 block">{deg.period}</span>
                        <p className="text-slate-300 text-sm leading-relaxed">{deg.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
