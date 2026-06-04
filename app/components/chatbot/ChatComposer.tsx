type Props = {
  input: string
  isLoading: boolean
  onInputChange: (value: string) => void
  onSubmit: () => void
}

export default function ChatComposer({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}: Props) {
  return (
    <div className="tm-chatbot-composer">
      <input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            onSubmit()
          }
        }}
        className="tm-chatbot-input"
        placeholder="Ask about jobs, onboarding, applications, or password reset..."
        aria-label="Type a chatbot message"
        maxLength={280}
      />
      <button
        type="button"
        className="tm-chatbot-send"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? '...' : 'Send'}
      </button>
    </div>
  )
}