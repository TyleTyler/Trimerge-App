'use client'

import { useRouter } from 'next/navigation'
import ChatbotLauncher from './ChatbotLauncher'
import ChatbotPanel from './ChatbotPanel'
import { useChatbot } from '@/hooks/useChatbot'

export default function ChatbotProvider() {
  const router = useRouter()

  const {
    isOpen,
    messages,
    suggestions,
    toggleChat,
    closeChat,
    clearChat,
    chooseOption,
    sendFreeText,
  } = useChatbot()

  return (
    <div className="tm-chatbot-shell">
      <ChatbotPanel
        isOpen={isOpen}
        messages={messages}
        suggestions={suggestions}
        onClose={closeChat}
        onClear={clearChat}
        onSuggestionSelect={(suggestion) => {
          chooseOption(suggestion.value, suggestion.label)

          if (suggestion.action?.type === 'navigate') {
            setTimeout(() => {
              router.push(suggestion.action!.href)
            }, 250)
          }
        }}
        onSendText={sendFreeText}
      />
      <ChatbotLauncher isOpen={isOpen} onClick={toggleChat} />
    </div>
  )
}