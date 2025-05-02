"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: () => void
}

interface LoginResponse {
  status: string
  message?: string
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOTP = async () => {
    if (!email) {
      setError("Please enter your email address")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Invalid email format")
      return
    }

    try {
      setLoading(true)
      setError("")

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "send_otp",
          email
        })
      })

      const data: LoginResponse = await response.json()

      if (data.status === "success") {
        setStep(2)
        toast.success("OTP sent successfully! Please check your email.")
      } else {
        setError(data.message || "Failed to send OTP")
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    try {
      setLoading(true)
      setError("")

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "verify_otp",
          email,
          otp
        })
      })

      const data: LoginResponse = await response.json()

      if (data.status === "success") {
        localStorage.setItem("infronix_user", email)
        toast.success("Login successful!")
        onLoginSuccess()
        onClose()
      } else {
        setError(data.message || "Invalid or expired OTP")
      }
    } catch (err) {
      setError("Failed to verify OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setEmail("")
    setOtp("")
    setStep(1)
    setError("")
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="bg-deep-blue rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {step === 1 ? "Enter Email" : "Verify OTP"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  const value = e.target.value.trim().toLowerCase()
                  setEmail(value)
                }}
                className="w-full px-4 py-3 rounded-lg bg-deep-blue/20 border border-white/10 text-black focus:outline-none focus:border-electric-blue"
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={loading || !email}
              className="w-full py-3 rounded-lg bg-electric-blue hover:bg-electric-blue/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-white font-medium">Email: {email}</p>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.trim()
                  if (value.length <= 6) {
                    setOtp(value)
                  }
                }}
                maxLength={6}
                className="w-full px-4 py-3 rounded-lg bg-deep-blue/20 border border-white/10 text-black focus:outline-none focus:border-electric-blue"
              />
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={loading || !otp || otp.length !== 6}
              className="w-full py-3 rounded-lg bg-electric-blue hover:bg-electric-blue/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setError("")
                if (step === 2) setOtp("")
              }}
              className="text-white hover:text-electric-blue transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && (
          <button
            onClick={handleClose}
            className="mt-6 text-white hover:text-electric-blue transition-colors"
          >
            Close
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
