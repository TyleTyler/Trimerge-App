import { useMemo, useState } from 'react'

export type ChatRole = 'user' | 'assistant'

export type ChatSuggestion = {
  label: string
  value: string
  action?: {
    type: 'navigate'
    href: string
  }
}

export type ChatMessage = {
  id: string
  role: ChatRole
  text: string
  createdAt: number
}

const MAIN_MENU: ChatSuggestion[] = [
  { label: 'Browse jobs', value: 'browse_jobs', action: { type: 'navigate', href: '/browse-jobs' } },
  { label: 'Candidate help', value: 'candidate_help' },
  { label: 'Employer help', value: 'employer_help' },
  { label: 'Reset password', value: 'reset_password', action: { type: 'navigate', href: '/forgot-password' } },
  { label: 'Resume upload', value: 'resume_upload' },
  { label: 'Company logo', value: 'company_logo' },
]

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-message',
  role: 'assistant',
  text: 'Hi! I’m the TriMergePro Assistant. Choose an option below or ask me a simple question.',
  createdAt: Date.now(),
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `chat-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getReply(value: string): { text: string; suggestions?: ChatSuggestion[] } {
  switch (value) {
    case 'browse_jobs':
      return {
        text: 'You can browse open jobs from the jobs page. Use department, search, and location filters to narrow the results.',
        suggestions: MAIN_MENU,
      }

    case 'candidate_help':
      return {
        text: 'Candidate tools include onboarding, browsing jobs, uploading your resume, viewing applications, and updating your profile.',
        suggestions: [
          { label: 'Browse jobs', value: 'browse_jobs', action: { type: 'navigate', href: '/browse-jobs' } },
          { label: 'Resume upload', value: 'resume_upload' },
          { label: 'Reset password', value: 'reset_password', action: { type: 'navigate', href: '/forgot-password' } },
          { label: 'Main menu', value: 'main_menu' },
        ],
      }

    case 'employer_help':
      return {
        text: 'Employer tools include recruiter onboarding, job posting, reviewing applicants, candidate matches, and company profile settings.',
        suggestions: [
          { label: 'Browse jobs', value: 'browse_jobs', action: { type: 'navigate', href: '/browse-jobs' } },
          { label: 'Company logo', value: 'company_logo' },
          { label: 'Reset password', value: 'reset_password', action: { type: 'navigate', href: '/forgot-password' } },
          { label: 'Main menu', value: 'main_menu' },
        ],
      }

    case 'reset_password':
      return {
        text: 'To reset your password, go to forgot password, request a reset code, then enter the OTP on the reset password screen.',
        suggestions: [
          { label: 'Go to forgot password', value: 'reset_password', action: { type: 'navigate', href: '/forgot-password' } },
          { label: 'Main menu', value: 'main_menu' },
        ],
      }

    case 'resume_upload':
      return {
        text: 'Candidates can upload or replace their resume using the resume upload flow. Supported formats are PDF and DOCX.',
        suggestions: [
          { label: 'Candidate help', value: 'candidate_help' },
          { label: 'Browse jobs', value: 'browse_jobs', action: { type: 'navigate', href: '/browse-jobs' } },
          { label: 'Main menu', value: 'main_menu' },
        ],
      }

    case 'company_logo':
      return {
        text: 'Employers can upload or update their company logo from settings.',
        suggestions: [
          { label: 'Employer help', value: 'employer_help' },
          { label: 'Main menu', value: 'main_menu' },
        ],
      }

    case 'main_menu':
      return {
        text: 'Here are the main things I can help you with.',
        suggestions: MAIN_MENU,
      }

    default:
      return {
        text: 'Please choose one of the options below so I can help you quickly.',
        suggestions: MAIN_MENU,
      }
  }
}

function getFreeTextReply(input: string): { text: string; suggestions?: ChatSuggestion[] } {
  const text = input.toLowerCase().trim()

  if (text.includes('password') || text.includes('reset')) {
    return getReply('reset_password')
  }

  if (text.includes('job') || text.includes('jobs') || text.includes('work')) {
    return getReply('browse_jobs')
  }

  if (text.includes('candidate') || text.includes('resume') || text.includes('application')) {
    return getReply('candidate_help')
  }

  if (text.includes('employer') || text.includes('recruiter') || text.includes('applicant')) {
    return getReply('employer_help')
  }

  if (text.includes('logo')) {
    return getReply('company_logo')
  }

  return {
    text: 'I can help with jobs, candidate tools, employer tools, resume upload, and password reset. Try one of the buttons below.',
    suggestions: MAIN_MENU,
  }
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [suggestions, setSuggestions] = useState<ChatSuggestion[]>(MAIN_MENU)

  const openChat = () => setIsOpen(true)
  const closeChat = () => setIsOpen(false)
  const toggleChat = () => setIsOpen((prev) => !prev)

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE])
    setSuggestions(MAIN_MENU)
  }

  const appendAssistantMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: 'assistant',
        text,
        createdAt: Date.now(),
      },
    ])
  }

  const chooseOption = (value: string, label: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: 'user',
        text: label,
        createdAt: Date.now(),
      },
    ])

    const reply = getReply(value)

    setTimeout(() => {
      appendAssistantMessage(reply.text)
      setSuggestions(reply.suggestions ?? MAIN_MENU)
    }, 180)
  }

  const sendFreeText = (input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: 'user',
        text: trimmed,
        createdAt: Date.now(),
      },
    ])

    const reply = getFreeTextReply(trimmed)

    setTimeout(() => {
      appendAssistantMessage(reply.text)
      setSuggestions(reply.suggestions ?? MAIN_MENU)
    }, 180)
  }

  return useMemo(
    () => ({
      isOpen,
      messages,
      suggestions,
      openChat,
      closeChat,
      toggleChat,
      clearChat,
      chooseOption,
      sendFreeText,
    }),
    [isOpen, messages, suggestions]
  )
}