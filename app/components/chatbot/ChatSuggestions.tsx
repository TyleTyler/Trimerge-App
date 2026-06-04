import type { ChatSuggestion } from '@/hooks/useChatbot'

type Props = {
  suggestions: ChatSuggestion[]
  onSelect: (suggestion: ChatSuggestion) => void
}

export default function ChatSuggestions({ suggestions, onSelect }: Props) {
  if (!suggestions.length) return null

  return (
    <div className="tm-chatbot-suggestions" aria-label="Chat suggestions">
      {suggestions.map((suggestion) => (
        <button
          key={`${suggestion.label}-${suggestion.value}`}
          type="button"
          className="tm-chatbot-chip"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  )
}