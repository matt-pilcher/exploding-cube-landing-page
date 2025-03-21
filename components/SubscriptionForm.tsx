'use client'

import { useState } from 'react'

interface SubscriptionFormProps {
  onSubscriptionSuccess: (success: boolean) => void
}
/**
 * This component handles the state of the email input field on 
 * the landing page. If you want user submissions to go to your
 * own email, you can change that at api/subscribe/route.ts

 */
export default function SubscriptionForm({ onSubscriptionSuccess }: SubscriptionFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const setSubmissionState = (loading: boolean) => {
    setIsLoading(loading)
    setStatus('idle')
    setMessage('')
  }

  const subscribeUser = async (email: string) => {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error(`Subscription failed: ${response.statusText}`)
    }

    return response
  }

  const handleSuccess = () => {
    setEmail('')
    setStatus('success')
    setMessage('Thanks for subscribing! We\'ll keep you posted.')
    onSubscriptionSuccess(true)
  }

  const handleError = (error: unknown) => {
    setStatus('error')
    setMessage(error instanceof Error 
      ? error.message 
      : 'Something went wrong. Please try again.'
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setSubmissionState(true)

    try {
      await subscribeUser(email)
      handleSuccess()
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email-input"></label>
      <input 
        placeholder="Email" 
        required
        type="email" 
        id="email-input" 
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-6 py-3 border border-blue-400 rounded mr-2" 
        disabled={isLoading}
      />
      <button type="submit" className="primary-cta">
        {isLoading ? 'Subscribing...' : 'Notify Me'}
      </button>
      {/* This div only displays after the user submits the form */}
      {message && (
        <p className={`mt-2 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  )
} 