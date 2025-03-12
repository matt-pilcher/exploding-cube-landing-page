'use client'

import dynamic from "next/dynamic"
import ThemeSwitch from "@/components/ThemeSwitch"
import SubscriptionForm from "@/components/SubscriptionForm"
import { useState } from "react"

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

export default function Home() {
  const [formCompleted, setFormCompleted] = useState('idle')

  return (
    // <!-- Landing Page 1 -->
    <div className="container grid py-2 m-auto md:grid-cols-2 h-full test-grid">
      <nav className="grid grid-cols-2 px-2 py-6 col-span-full">
        <div className="text-blue-900 dark:text-white text-2xl">
          <a href="/">Logo</a>
        </div>
        {/* Dark Mode Toggle */}
        <ThemeSwitch />
      </nav>

      <section className="grid items-center py-2">
        {/* <!-- center align content container --> */}
        <div className="px-2 py-6">
          <h1 className="text-5xl pb-4 text-blue-900 leading-tight text-pretty max-w-[15ch] dark:text-white purple">3D Email Capture Landing Page</h1>
          <p className="pb-6 leading-relaxed text-slate-700 max-w-[50ch] dark:text-white">
            A production-ready Next.js landing page template with an interactive email capture form. Submit the form to see the cube
            expand. You can interact with the cube by grabbing it which triggers an animation.
          </p>
          <SubscriptionForm onSubscriptionSuccess={(success) => setFormCompleted(success ? 'success' : 'idle')} />
        </div>
      </section>
      
      <aside className="grid items-center overflow-hidden">
        <div className="px-2 overflow-hidden cursor-grab three-d-container relative">
          {/* TODO: Fix mobile zoom for cube to not be cutoff */}
          {/* https://drei.docs.pmnd.rs/abstractions/screen-space */}
          {/* @ts-ignore */}
          <Scene onSubscriptionSuccess={formCompleted === 'success'} />
        </div>
      </aside>
      
      <footer className="grid grid-cols-2 px-2 py-6 col-span-full">
        {/* <!-- Social Media Icons --> */}
        <div className="flex items-center">
          {/* <!-- Github --> */}
          <svg xmlns="http://www.w3.org/2000/svg" className="dark:stroke-white" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
          </svg>
          {/* <!-- LinkedIn --> */}
          <svg xmlns="http://www.w3.org/2000/svg" className="dark:stroke-white" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
            <path d="M8 11l0 5" />
            <path d="M8 8l0 .01" />
            <path d="M12 16l0 -5" />
            <path d="M16 16v-3a2 2 0 0 0 -4 0" />
          </svg>
          {/* <!-- Twitter --> */}
          <svg xmlns="http://www.w3.org/2000/svg" className="dark:stroke-white" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
          {/* <!-- Facebook --> */}
          <svg xmlns="http://www.w3.org/2000/svg" className="dark:stroke-white"  width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5"  stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
          </svg>
        </div>
        {/* <!-- Privacy Policy --> */}
        <div className="flex items-center justify-end">
					<a href="/privacy" className="underline text-slate-800 dark:text-white">Privacy Policy</a>
				</div>
				
      </footer>
    </div>
  )
}
