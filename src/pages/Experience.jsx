import { Link } from 'react-router-dom'

const experiences = [
    {
        role: 'AI Engineer',
        company: 'Brazilian Hardware Institute (HBR)',
        location: 'Brazil',
        period: 'Oct 2025 – Present',
        type: 'Private (NDA)',
        highlights: [
            'Built custom LLM agents using Python for medical hardware environments.',
            'Developed the initial MVP in Streamlit and integrated devices securely via the MCP protocol.',
            'Designed strict evaluation mechanisms to reduce hallucinations as the project scales to production.',
        ],
        tags: ['Python', 'LLM Systems', 'API Design', 'Hardware Integration', 'C++'],
        color: 'blue',
    },
    {
        role: 'Data Engineer Researcher',
        company: 'University of Brasília (UnB)',
        location: 'Brasília, Brazil',
        period: 'Jun 2025 – Oct 2025',
        type: 'Academic Research',
        highlights: [
            'Developed automated web scraping for Instagram disinformation research',
        ],
        tags: ['Python', 'Web Scraping', 'MongoDB', 'LLM Analysis'],
        color: 'cyan',
    },
    {
        role: 'Automation & Data Analyst Intern',
        company: 'Vivo (Telefônica Brazil)',
        location: 'Brasília, Brazil (Hybrid)',
        period: 'Feb 2024 – Dec 2025',
        type: 'Corporate Internship',
        highlights: [
            'Automated Excel-based workflows with Python, reducing manual processing time',
            'Built ETL routines with Pandas and SQL for Power BI dashboards',
            'Identified supply chain bottlenecks through data analysis',
            'Cross-functional collaboration with operational and management teams',
        ],
        tags: ['Python', 'Pandas', 'SQL', 'ETL', 'Power BI'],
        color: 'emerald',
    },
    {
        role: 'Data Engineering Intern',
        company: 'National Council of Justice (CNJ)',
        location: 'Brasília, Brazil',
        period: 'May 2022 – Feb 2024',
        type: 'Government',
        highlights: [
            'Built scraping pipelines to collect judicial data from 97 court systems',
            'Handled anti-bot mechanisms including captchas and dynamic rendering',
            'Normalized unstructured legal text into standardized structured formats',
            'Designed robust and maintainable pipelines for heterogeneous public systems',
        ],
        tags: ['Python', 'Playwright', 'Web Scraping', 'Data Normalization'],
        color: 'violet',
    },
]

const colorMap = {
    blue: { dot: 'bg-blue-500', border: 'hover:border-blue-500/50', tag: 'border-blue-500/30 text-blue-400' },
    cyan: { dot: 'bg-cyan-500', border: 'hover:border-cyan-500/50', tag: 'border-cyan-500/30 text-cyan-400' },
    emerald: { dot: 'bg-emerald-500', border: 'hover:border-emerald-500/50', tag: 'border-emerald-500/30 text-emerald-400' },
    violet: { dot: 'bg-violet-500', border: 'hover:border-violet-500/50', tag: 'border-violet-500/30 text-violet-400' },
}

export default function Experience() {
    return (
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-20">
            <Link to="/" className="text-slate-500 hover:text-blue-400 text-sm font-mono mb-8 inline-block transition-colors">
                ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
                Experience
            </h1>
            <p className="text-slate-400 text-lg mb-12">My professional journey across government, corporate, research, and AI engineering.</p>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-800" />

                <div className="space-y-12">
                    {experiences.map((exp, i) => {
                        const c = colorMap[exp.color]
                        return (
                            <div key={i} className="relative pl-10">
                                {/* Timeline dot */}
                                <div className={`absolute left-0 top-2 w-[15px] h-[15px] rounded-full ${c.dot} ring-4 ring-slate-900`} />

                                <div className={`p-6 rounded-2xl border border-slate-800 bg-slate-800/20 backdrop-blur-sm ${c.border} transition-all`}>
                                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                                        <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                                        <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-1">{exp.company} · {exp.location}</p>
                                    <span className="text-xs text-slate-600 font-mono">{exp.type}</span>

                                    <ul className="mt-4 space-y-2">
                                        {exp.highlights.map((h, j) => (
                                            <li key={j} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                                                <span className="text-slate-600 mt-1 shrink-0">▸</span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {exp.tags.map((tag) => (
                                            <span key={tag} className={`text-[11px] px-2.5 py-1 rounded-full border ${c.tag} font-medium`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
