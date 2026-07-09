'use client'

import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import useSWR from 'swr'

const EMAIL = 'kabilansakthivel1290@gmail.com'

type EmailConfig = {
  configured: boolean
  serviceId: string
  templateId: string
  publicKey: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json() as Promise<EmailConfig>)

type Status = 'idle' | 'sending' | 'success' | 'error'

type FieldErrors = {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function ContactSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // load emailjs config at runtime from the server (never relies on build-time env inlining)
  const { data: config } = useSWR<EmailConfig>('/api/contact-config', fetcher, {
    revalidateOnFocus: false,
  })

  const validate = (): boolean => {
    const next: FieldErrors = {}
    if (!values.name.trim()) next.name = 'name is required'
    if (!values.email.trim()) next.email = 'email is required'
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'enter a valid email'
    if (!values.message.trim()) next.message = 'message is required'
    else if (values.message.trim().length < 10) next.message = 'message must be at least 10 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    if (!validate()) return

    setStatus('sending')
    try {
      // fetch fresh config if SWR hasn't resolved yet
      const cfg = config ?? (await fetcher('/api/contact-config'))
      if (!cfg?.configured) {
        throw new Error('email service not configured')
      }

      // template params match the EmailJS "Contact Us" + "Auto-Reply" templates:
      // {{name}}, {{email}}, {{title}}, {{message}}, {{time}}
      await emailjs.send(
        cfg.serviceId,
        cfg.templateId,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          title: `portfolio inquiry from ${values.name.trim()}`,
          message: values.message.trim(),
          time: new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
        },
        { publicKey: cfg.publicKey },
      )
      setStatus('success')
      setValues({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('[contact] emailjs error:', error)
      setStatus('error')
    }
    if (noticeTimer.current) clearTimeout(noticeTimer.current)
    noticeTimer.current = setTimeout(() => setStatus('idle'), 6000)
  }

  return (
    <div className="contact-wrap">
      {/* channels */}
      <div className="contact-block fade-row">
        <p className="contact-row">
          <span className="ct-prompt">{'>'}</span>
          <a href="https://x.com/kabilan1290" target="_blank" rel="noopener noreferrer" className="clink">
            x
          </a>
          <span className="sep">/</span>
          <a href="https://github.com/kabilan1290" target="_blank" rel="noopener noreferrer" className="clink">
            github
          </a>
          <span className="sep">/</span>
          <a href={`mailto:${EMAIL}`} className="clink">
            email
          </a>
        </p>
      </div>

      <p className="contact-note fade-row">
        available for security research collaborations and speaking engagements. reach out directly — i respond fast.
      </p>
    </div>
  )
}
