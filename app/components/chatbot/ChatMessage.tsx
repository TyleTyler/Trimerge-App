import type { ChatMessage as ChatMessageType } from '@/hooks/useChatbot'

type Props = {
  message: ChatMessageType
}

export default function ChatMessage({ message }: Props) {
  return (
    <div
      className={`tm-chatbot-message-row ${
        message.role === 'user' ? 'tm-chatbot-message-row-user' : 'tm-chatbot-message-row-assistant'
      }`}
    >
      <div
        className={`tm-chatbot-bubble ${
          message.role === 'user' ? 'tm-chatbot-bubble-user' : 'tm-chatbot-bubble-assistant'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}