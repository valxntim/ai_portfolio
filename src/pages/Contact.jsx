import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://165.227.222.180:8000/api'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' })

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setStatusMessage({ text: '', type: '' })

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                }),
            })

            if (response.status === 429) {
                setStatusMessage({ text: "You're sending messages too fast! Please try again later.", type: 'error' })
                return
            }

            if (!response.ok) {
                throw new Error('Request failed')
            }

            setStatusMessage({ text: 'Message sent successfully!', type: 'success' })
            setForm({ name: '', email: '', message: '' })
        } catch {
            setStatusMessage({ text: 'Something went wrong. Please try again.', type: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-20 text-center">
            <Link to="/" className="text-slate-500 hover:text-blue-400 text-sm font-mono mb-8 inline-block transition-colors">
                ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
                Let's Connect
            </h1>
            <p className="text-slate-400 text-lg mb-12">
                I'm actively seeking roles in applied AI engineering, backend systems, and intelligent data infrastructure.
            </p>

            {/* Social Links */}
            <div className="space-y-4 max-w-sm mx-auto mb-16">
                <a href="https://linkedin.com/in/gustavovalentim" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/40 hover:border-blue-500 hover:bg-slate-800/70 text-slate-300 hover:text-white transition-all group">
                    <span className="text-xl">💼</span>
                    <span className="font-semibold">LinkedIn</span>
                    <span className="text-slate-600 group-hover:text-blue-400 ml-auto transition-colors">↗</span>
                </a>
                <a href="https://github.com/valxntim" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/40 hover:border-emerald-500 hover:bg-slate-800/70 text-slate-300 hover:text-white transition-all group">
                    <span className="text-xl">💻</span>
                    <span className="font-semibold">GitHub</span>
                    <span className="text-slate-600 group-hover:text-emerald-400 ml-auto transition-colors">↗</span>
                </a>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 max-w-sm mx-auto mb-12">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">or send a message</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            </div>

            {/* Contact Form */}
            <div className="relative max-w-md mx-auto">
                {/* Glow effect */}
                <div className="absolute -inset-px bg-gradient-to-b from-blue-500/20 via-cyan-500/10 to-transparent rounded-2xl opacity-50" />

                <form
                    onSubmit={handleSubmit}
                    className="relative bg-slate-950/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 space-y-5 shadow-2xl shadow-blue-950/20 text-left"
                >
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            maxLength={100}
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            maxLength={150}
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            maxLength={1000}
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Tell me about the opportunity..."
                            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                        />
                        <p className="text-[10px] text-slate-600 mt-1 text-right font-mono">
                            {form.message.length}/1000
                        </p>
                    </div>

                    {/* Status Message */}
                    {statusMessage.text && (
                        <div className={`p-3 rounded-xl text-sm font-medium text-center ${statusMessage.type === 'success'
                                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                : 'bg-red-500/10 border border-red-500/30 text-red-400'
                            }`}>
                            {statusMessage.type === 'success' ? '✅' : '⚠️'} {statusMessage.text}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Pro tip */}
            <div className="mt-16 p-6 rounded-2xl border border-slate-800 bg-slate-800/20 text-left max-w-md mx-auto">
                <p className="text-slate-300 text-sm leading-relaxed">
                    💡 <strong className="text-slate-100">Pro tip:</strong> Try asking my AI assistant (bottom-right chat bubble) about my experience — it knows everything about my background and can answer your questions in real time.
                </p>
            </div>
        </div>
    )
}