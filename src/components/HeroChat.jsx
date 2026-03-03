import { useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import roboImg from '../assets/robo_2d_pixel.png'

export default function HeroChat() {
    const { messages, input, setInput, isLoading, handleSend, messagesEndRef, scrollToBottom, SUGGESTIONS } = useChat()

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    const onSubmit = (e) => {
        e.preventDefault()
        handleSend()
    }

    const showSuggestions = messages.length <= 1 && !isLoading

    return (
        <div className="relative group/chat h-full">
            {/* Glow border */}
            <div className="absolute -inset-px bg-gradient-to-b from-blue-500/20 via-cyan-500/10 to-transparent rounded-2xl opacity-60 group-hover/chat:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full bg-slate-950/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-blue-950/20">
                {/* Header — always pinned */}
                <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/60 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img src={roboImg} alt="AI" className="w-9 h-9 rounded-lg object-cover shadow-lg shadow-blue-500/20" />
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-100 text-sm">Portfolio AI Assistant</h3>
                                <p className="text-[11px] text-slate-500">Trained on Gustavo's professional background</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] text-emerald-400/80 font-mono uppercase tracking-wider">Live</span>
                        </div>
                    </div>
                </div>

                {/* Messages — scrollable area */}
                <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 scrollbar-thin">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'ai' && (
                                <img src={roboImg} alt="AI" className="w-7 h-7 rounded-md object-cover border border-blue-500/20 mr-2.5 mt-0.5 shrink-0" />
                            )}
                            <div className={`max-w-[80%] ${msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3'
                                : 'text-slate-200'
                                }`}>
                                <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-slate-700/40 flex flex-wrap gap-1.5">
                                        {msg.sources.map((src, i) => (
                                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-400 font-mono">
                                                {src}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <img src={roboImg} alt="AI" className="w-7 h-7 rounded-md object-cover border border-blue-500/20 mr-2.5 shrink-0" />
                            <div className="flex items-center gap-1.5 py-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:100ms]" />
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:200ms]" />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {showSuggestions && (
                    <div className="px-5 pb-2 shrink-0">
                        <p className="text-[10px] text-slate-600 font-mono uppercase tracking-wider mb-2">Try asking</p>
                        <div className="grid grid-cols-2 gap-1.5">
                            {SUGGESTIONS.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(s)}
                                    className="text-left text-[12px] text-slate-400 hover:text-blue-400 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/30 rounded-lg px-3 py-2 transition-all leading-tight"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input — always pinned */}
                <form onSubmit={onSubmit} className="p-4 border-t border-slate-800/80 bg-slate-900/40 shrink-0">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                                placeholder="Ask about experience, projects, skills..."
                                disabled={isLoading}
                                maxLength={500}
                                autoComplete="off"
                                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 focus:bg-slate-800/80 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-2 text-center font-mono">
                        AI-powered semantic search across verified professional data
                    </p>
                </form>
            </div>
        </div>
    )
}
