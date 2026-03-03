import { createContext, useContext, useState, useRef, useCallback } from 'react'

const ChatContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || ''

const MAX_INPUT_LENGTH = 500

const SUGGESTIONS = [
    "What has Gustavo built in AI engineering?",
    'What tech stack does he work with?',
    'Tell me about his most recent project',
    'What was his role at Vivo?',
]

export function ChatProvider({ children }) {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            content: "Hey! 👋 I'm Gustavo's AI. Treat me like a first-round technical interview—ask me anything about his Python skills, data pipelines, or LLM projects! Just a quick heads-up: like any AI, my outputs can sometimes hallucinate details. For the 100% verified truth (or to hire him!), hit the Contact tab to reach out directly."
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const abortControllerRef = useRef(null)

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            const el = messagesEndRef.current
            if (el?.parentElement) {
                el.parentElement.scrollTop = el.parentElement.scrollHeight
            }
        }, 50)
    }, [])

    const sanitizeInput = (text) => {
        return text
            .trim()
            .slice(0, MAX_INPUT_LENGTH)
            .replace(/<[^>]*>/g, '')
    }

    // ...existing code...

    const handleSend = useCallback(async (overrideMessage) => {
        const raw = (overrideMessage || input)
        const text = sanitizeInput(raw)
        if (!text) return

        // Cancel any in-flight request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }
        const controller = new AbortController()
        abortControllerRef.current = controller

        // Build history from the last 3 messages BEFORE adding the new user message
        const history = messages.slice(-3).map(msg => ({
            role: msg.role === 'ai' ? 'assistant' : msg.role,
            content: msg.content
        }))

        setMessages(prev => [...prev, { role: 'user', content: text }])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch(`${API_URL}/api/proxy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    question: text,
                    history: history
                }),
                signal: controller.signal,
            })
            if (!response.ok) {
                if (response.status === 429) throw new Error('Too many requests — please wait a moment and try again.')
                if (response.status >= 500) throw new Error('The server is temporarily unavailable. Please try again shortly.')
                throw new Error('Something went wrong. Please try again.')
            }

            const data = await response.json()
            setMessages(prev => [...prev, { role: 'ai', content: data.answer, sources: data.sources }])
        } catch (error) {
            if (error.name === 'AbortError') return
            setMessages(prev => [...prev, { role: 'ai', content: error.message }])
        } finally {
            setIsLoading(false)
            abortControllerRef.current = null
        }
    }, [input])

    return (
        <ChatContext.Provider value={{ messages, input, setInput, isLoading, handleSend, messagesEndRef, scrollToBottom, SUGGESTIONS }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const ctx = useContext(ChatContext)
    if (!ctx) throw new Error('useChat must be used within ChatProvider')
    return ctx
}
