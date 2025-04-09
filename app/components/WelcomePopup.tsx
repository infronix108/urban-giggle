"use client"

import { useEffect, useState } from "react"

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [tagline, setTagline] = useState("")

  const taglines = [
    "No groceries. No meds. No problem. Infronix delivers survival.",
    "Modern life is broken. We deliver the patches.",
    "You're not lazy. The system is. Let Infronix handle it.",
    "Self-care is hard. Infronix makes it easy.",
    "Don’t panic—order. Infronix is your soft landing.",
    "Life's a glitch. We're the bug fix.",
    "Running on coffee and despair? Cool. We'll bring the rest.",
    "Infronix: For when adulting is not in your skill tree.",
    "You're burnt out. We're the recharge button.",
    "When motivation ghosts you, Infronix shows up."
  ]

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup")
    if (!hasSeenPopup) {
      setIsVisible(true)
      localStorage.setItem("hasSeenPopup", "true")
      setTagline(taglines[Math.floor(Math.random() * taglines.length)])
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1f1f1f] rounded-2xl p-8 max-w-lg w-full relative shadow-2xl border border-yellow-500/20 animate-fade-in-up">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        
        <h2 className="text-3xl font-bold text-yellow-400 mb-2 tracking-tight">
          Welcome to Infronix 👁️‍🗨️
        </h2>
        <p className="text-gray-300 italic text-base mb-6">{tagline}</p>
        
        <ul className="space-y-2 mb-6 text-sm text-gray-200">
          <li>🍱 Food – for when cooking feels illegal</li>
          <li>💊 Medicine – to keep functioning</li>
          <li>🧹 Cleaning – because chaos isn't cozy</li>
          <li>🔧 Repairs – tech, taps, emotional damage</li>
          <li>🎁 Gifts – perform love, get rewards</li>
          <li>🛏️ Hotels – escape responsibly</li>
          <li>🎮 Tech Setup – rage-proof installs</li>
          <li>💆 Spa – fake peace, real glow-up</li>
          <li>🛒 Groceries – silence the fridge’s anxiety</li>
          <li>🚖 Travel – teleport from burnout</li>
        </ul>

        <p className="text-gray-500 text-xs italic">
          Infronix isn’t just a service. It’s survival, in style.<br />
          Let go. We’ve got you.
        </p>
      </div>
    </div>
  )
}
