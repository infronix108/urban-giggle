"use client"

import { useEffect, useState } from "react"

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [tagline, setTagline] = useState("")

  const taglines = [
    "Your fridge is empty. Your soul too. Infronix delivers both.",
    "Sleep-deprived, broke & burnt out? Good. You're ready for Infronix.",
    "When meds, food, and sanity are all out of stock... Infronix isn’t.",
    "You could try doing everything alone. Or... you could try not suffering.",
    "Infronix: Because adulting is a full-time scam.",
    "Depression can't cook. Infronix can.",
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
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in-up border border-yellow-500">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4 text-center">
          Welcome to Infronix 👁️‍🗨️
        </h2>
        <p className="text-gray-300 italic text-center mb-6">{tagline}</p>

        <ul className="space-y-2 mb-6 text-sm text-gray-200">
          {[
            "🍱 Food – for when cooking feels illegal",
            "💊 Medicine – to survive society",
            "🧹 Cleaning – because depression isn't tidy",
            "🔧 Repairs – tech, taps, trust issues",
            "🎁 Gifts – fake affection, real fast",
            "🛏️ Hotels – run away, recharge, return maybe",
            "🎮 Tech Setup – for those who rage at routers",
            "💆 Spa – fake peace, real glow",
            "🛒 Groceries – silence the fridge's emptiness",
            "🚖 Travel – escape mode: unlocked"
          ].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <button
          onClick={() => setIsVisible(false)}
          className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-xl shadow-lg hover:bg-yellow-400 transition-all animate-pulse hover:scale-105 active:scale-95"
        >
          Dependency acknowledged. Let the chaos continue.
        </button>

        <p className="text-gray-600 text-xs text-center mt-4 italic">
          Free will is overrated anyway.
        </p>
      </div>
    </div>
  )
}
