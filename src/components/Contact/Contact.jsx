import { useState } from 'react'
import './Contact.css'

const API_URL = '/api/contact'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-bg-pattern" />
      <div className="contact-content">
        <h2 className="contact-title">LET'S TALK ABOUT EVERYTHING</h2>
        <p className="contact-desc">
          Have a question about teams, judging, sponsorship, or challenge tracks? Send us a note and
          we will reply quickly.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">NAME</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">MESSAGE</label>
            <textarea
              id="message"
              placeholder="Tell us what you need..."
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="contact-submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
          {status === 'success' && (
            <p className="form-success">Message sent! We&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="form-error">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
