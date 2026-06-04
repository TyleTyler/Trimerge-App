'use client'

import { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatSuggestions from './ChatSuggestions'
import type { ChatSuggestion } from '@/hooks/useChatbot'

type Props = {
  isOpen: boolean
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    text: string
    createdAt: number
  }>
  suggestions: ChatSuggestion[]
  onClose: () => void
  onClear: () => void
  onSuggestionSelect: (suggestion: ChatSuggestion) => void
  onSendText: (text: string) => void
}

export default function ChatbotPanel({
  isOpen,
  messages,
  suggestions,
  onClose,
  onClear,
  onSuggestionSelect,
  onSendText,
}: Props) {
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    if (!messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  if (!isOpen) return null

  const handleSend = () => {
    if (!input.trim()) return
    onSendText(input)
    setInput('')
  }

  return (
    <section
      className="tm-chatbot-panel"
      role="dialog"
      aria-label="TriMergePro Assistant"
      aria-modal="false"
    >
      <header className="tm-chatbot-header">
        <div>
          <div className="tm-chatbot-eyebrow">Assistant</div>
          <strong className="tm-chatbot-title">TriMergePro Assistant</strong>
          <p className="tm-chatbot-subtitle">
            Quick help for jobs, onboarding, and account support.
          </p>
        </div>

        <div className="tm-chatbot-header-actions">
          <button type="button" className="tm-chatbot-header-btn" onClick={onClear}>
            Clear
          </button>
          <button type="button" className="tm-chatbot-header-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </header>

      <div className="tm-chatbot-messages" ref={messagesRef}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <ChatSuggestions suggestions={suggestions} onSelect={onSuggestionSelect} />

      <div className="tm-chatbot-composer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSend()
            }
          }}
          className="tm-chatbot-input"
          placeholder="Ask something simple..."
          aria-label="Type a chatbot message"
          maxLength={180}
        />
        <button type="button" className="tm-chatbot-send" onClick={handleSend}>
          Send
        </button>
      </div>

      <p className="tm-chatbot-note">
        Choose an option or ask a simple question.
      </p>
    </section>
  )
}