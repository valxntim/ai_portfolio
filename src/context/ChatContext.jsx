import { createContext, useContext, useState, useRef, useCallback } from 'react'

const ChatContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || '/api'

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
            content: "Welcome. I'm an AI trained on Gustavo's professional background — experience, projects, and technical skills. Ask me anything, and I'll give you a direct, grounded answer."
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const abortControllerRef = useRef(null)

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
            const response = await fetch(`${API_URL}/ask`, {
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
