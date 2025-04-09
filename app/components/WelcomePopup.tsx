"use client"

import { useEffect, useState } from "react"

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [tagline, setTagline] = useState("")

  const taglines = [
    "Your fridge is empty. Your soul too. Infronix delivers both.",
    "Life is hard. But at least groceries don't have to be.",
    "Lost the will to cook? Same. We've got food.",
    "When meds, food, and sanity are all out of stock... Infronix isn't.",
    "It's okay to fall apart. Just don't forget to order tissues through Infronix.",
    "Adulting is a scam. Outsource it to Infronix.",
    "You could try doing everything alone. Or... you could try not suffering.",
    "Depression can't cook. Infronix can.",
    "Your motivation left. Infronix enters.",
    "Sleep-deprived, broke & burnt out? Good. You're ready for Infronix."
  ]

  useEffect(() => {
    // Show popup on first visit or based on your logic
    const hasSeenPopup = localStorage.getItem('hasSeenPopup')
    if (!hasSeenPopup) {
      setIsVisible(true)
      localStorage.setItem('hasSeenPopup', 'true')
      setTagline(taglines[Math.floor(Math.random() * taglines.length)])
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full relative animate-fade-in-up">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">Welcome to Infronix 👁️‍🗨️</h2>
        <p className="text-gray-300 italic mb-4">{tagline}</p>
        
        <ul className="space-y-2 mb-4">
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
            <li key={i} className="text-gray-200 text-sm">{item}</li>
          ))}
        </ul>
        
        <p className="text-gray-500 text-xs italic">
          Infronix doesn't need you. But be honest... you need us.
          <br />Stay. Suffer less.
        </p>
      </div>
    </div>
  )
}
