import { Link } from 'react-router-dom'
import profileImg from '../assets/gustavo_2dpixel.png'
import HeroChat from '../components/HeroChat'

export default function Home() {
    return (
        <>
            {/* Hero Section — Split: Identity Left, AI Chat Right */}
            <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
                <div className="flex flex-col lg:flex-row gap-10 items-stretch min-h-[calc(100vh-12rem)]">

                    {/* Left Column — Identity */}
                    <div className="flex-1 flex flex-col justify-center lg:max-w-md">
                        {/* Profile Image */}
                        <div className="mb-8 flex items-center gap-5">
                            <div className="relative group shrink-0">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-xl opacity-40 blur-md group-hover:opacity-70 transition-opacity duration-500" />
                                <img
                                    src={profileImg}
                                    alt="Gustavo Valentim"
                                    className="relative w-20 h-20 object-cover rounded-xl border-2 border-slate-700 shadow-xl"
                                />
                            </div>
                            <div>
                                <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-1">Hey there, I'm</p>
                                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-transparent bg-clip-text">
                                    Gustavo Valentim
                                </h1>
                            </div>
                        </div>

                        <p className="text-xl text-slate-400 mb-3 font-semibold">AI Engineer &amp; Backend Developer</p>
                        <p className="text-base text-slate-500 leading-relaxed mb-8">
                            Computer Engineer from the University of Brasília. I build LLM-integrated systems,
                            data pipelines, and production-grade AI architectures — and I evaluate them rigorously.
                        </p>

                        <div className="flex gap-3 flex-wrap mb-10">
                            <Link to="/projects" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25">
                                View Projects
                            </Link>
                            <Link to="/experience" className="px-5 py-2.5 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white rounded-xl font-semibold text-sm transition-all">
                                My Experience
                            </Link>
                            <a href="https://github.com/valxntim" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-slate-700 hover:border-emerald-500 text-slate-400 hover:text-emerald-400 rounded-xl font-semibold text-sm transition-all">
                                GitHub ↗
                            </a>
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: '5+', label: 'Years exp.' },
                                { value: '97', label: 'Court systems scraped' },
                                { value: '1.6k+', label: 'Eval questions built' },
                            ].map((stat, i) => (
                                <div key={i} className="text-center p-3 rounded-xl border border-slate-800 bg-slate-800/20">
                                    <p className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">{stat.value}</p>
                                    <p className="text-[11px] text-slate-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column — AI Chat (The Star) */}
                    <div className="flex-1 lg:flex-[1.3]">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                                <span className="text-[10px] font-mono text-blue-400/60 tracking-widest uppercase px-2">Live AI — Ask me anything</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                            </div>
                            <div>
                                <HeroChat />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Highlights */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: '🧠', title: 'AI Engineering', desc: 'Multi-agent LLM systems, RAG pipelines, and hallucination evaluation frameworks.' },
                        { icon: '⚙️', title: 'Backend & Data', desc: 'FastAPI, ETL pipelines, large-scale web scraping across 97+ court systems.' },
                        { icon: '🎯', title: 'Measurable Quality', desc: 'Focus on reproducibility, benchmarks, and architectural clarity over demos.' },
                    ].map((card, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-800/30 backdrop-blur-sm hover:border-slate-700 transition-all group">
                            <span className="text-3xl mb-4 block">{card.icon}</span>
                            <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">{card.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Snapshot */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <h2 className="text-3xl font-bold mb-8 text-slate-100">Tech Stack</h2>
                <div className="flex flex-wrap gap-3">
                    {['Python', 'FastAPI', 'LangGraph', 'FAISS', 'SQL', 'MongoDB', 'Pandas', 'Docker', 'Git', 'Playwright', 'LLM APIs', 'Prompt Engineering', 'Power BI'].map((skill) => (
                        <span key={skill} className="px-4 py-2 rounded-full text-sm font-medium bg-slate-800/60 border border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-all cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            {/* Languages */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <h2 className="text-3xl font-bold mb-8 text-slate-100">Languages</h2>
                <div className="flex gap-6">
                    <div className="px-6 py-4 rounded-2xl border border-slate-800 bg-slate-800/20">
                        <p className="text-slate-100 font-semibold">Portuguese</p>
                        <p className="text-slate-500 text-sm">Native</p>
                    </div>
                    <div className="px-6 py-4 rounded-2xl border border-slate-800 bg-slate-800/20">
                        <p className="text-slate-100 font-semibold">English</p>
                        <p className="text-slate-500 text-sm">Advanced — C1</p>
                    </div>
                </div>
            </section>
        </>
    )
}
