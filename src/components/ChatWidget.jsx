import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useChat } from '../context/ChatContext'
import roboImg from '../assets/robo_2d_pixel.png'

export default function ChatWidget() {
    const location = useLocation()
    const { messages, input, setInput, isLoading, handleSend, messagesEndRef, scrollToBottom } = useChat()
    const [isOpen, setIsOpen] = useState(false)

    // Hide on home page — the hero chat is already there
    const isHome = location.pathname === '/'

    useEffect(() => {
        if (isOpen) scrollToBottom()
    }, [messages, isOpen, scrollToBottom])

    const onSubmit = (e) => {
        e.preventDefault()
        handleSend()
    }

    if (isHome) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-[380px] h-[520px] bg-slate-950/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-blue-950/20 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/60 flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                            <img src={roboImg} alt="AI" className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                                <h3 className="font-semibold text-slate-100 text-sm">Portfolio AI</h3>
                                <p className="text-[10px] text-slate-500">Ask me anything</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors text-lg">
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                                    : 'bg-slate-800/60 border border-slate-700/50 text-slate-200 rounded-2xl rounded-tl-sm'
                                    }`}>
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-slate-700/50 text-[10px] text-slate-400">
                                            Sources: {msg.sources.join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800/60 border border-slate-700/50 text-slate-400 rounded-2xl rounded-tl-sm p-3 text-sm flex gap-1 items-center">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:100ms]" />
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:200ms]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={onSubmit} className="p-3 bg-slate-900/40 border-t border-slate-800/80 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value.slice(0, 500))}
                            placeholder="Ask about my experience..."
                            disabled={isLoading}
                            maxLength={500}
                            autoComplete="off"
                            className="flex-1 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-200 ${isOpen
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-blue-500/30 shadow-blue-600/20'
                    }`}
            >
                {isOpen ? '✕' : '💬'}
            </button>
        </div>
    )
}
