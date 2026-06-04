type Props = {
  isOpen: boolean
  onClick: () => void
}

export default function ChatbotLauncher({ isOpen, onClick }: Props) {
  return (
    <button
      type="button"
      className="tm-chatbot-launcher"
      aria-expanded={isOpen}
      aria-label="Open chatbot"
      onClick={onClick}
    >
      <span className="tm-chatbot-launcher-dot" />
      TriMergePro Assistant
    </button>
  )
}