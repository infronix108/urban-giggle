"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import StarRating from "./StarRating"

interface ServicePageProps {
  name: string
  description: string
  process: string[]
  image: string
  sites: {
    name: string
    url: string
    rating: number
    verified: boolean
  }[]
}

export default function ServicePageLayout({
  name,
  description,
  process,
  image,
  sites,
}: ServicePageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    isPhoneValid: false,
    isPhoneVerified: false,
    isValidating: false,
    validationMessage: "",
  })
  const [selectedSite, setSelectedSite] = useState(sites[0]?.name || "")
  const selectedSiteData = sites.find(site => site.name === selectedSite)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const validatePhone = (phone: string) => {
    // Basic phone validation - 10 digits
    const phoneRegex = /^\d{10}$/
    return phoneRegex.test(phone)
  }

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value,
      isPhoneValid: validatePhone(value),
      isPhoneVerified: false, // Reset verification when number changes
      validationMessage: "",
    }))
  }

  const verifyPhoneNumber = async () => {
    if (!formData.isPhoneValid) {
      setFormData(prev => ({
        ...prev,
        validationMessage: "Please enter a valid 10-digit number",
      }))
      return
    }

    setFormData(prev => ({
      ...prev,
      isValidating: true,
      validationMessage: "Verifying...",
    }))

    try {
      const response = await fetch('/api/verify-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formData.phone }),
      })

      const data = await response.json()

      setFormData(prev => ({
        ...prev,
        isValidating: false,
        isPhoneVerified: data.valid,
        validationMessage: data.message,
      }))
    } catch (error) {
      setFormData(prev => ({
        ...prev,
        isValidating: false,
        isPhoneVerified: false,
        validationMessage: "Verification failed. Please try again.",
      }))
    }
  }

  const isFormValid = 
    formData.name.trim() !== "" && 
    formData.isPhoneValid && 
    formData.isPhoneVerified &&
    selectedSite

  const saveCustomerData = async () => {
    if (!isFormValid) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const response = await fetch('/api/save-customer-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          number: formData.phone,
          company: selectedSite,
          sourceComponent: 'ServicePageLayout'
        }),
      })

      const data = await response.json()

      if (data.status !== 'success') {
        throw new Error(data.error || 'Failed to save data')
      }

      return true
    } catch (error) {
      console.error('Error saving customer data:', error)
      setSaveError('Failed to save your information. Please try again.')
      return false
    } finally {
      setIsSaving(false)
    }
  }

  const handleVisitSite = async () => {
    if (!isFormValid) return

    // Save data in background
    saveCustomerData()
    
    // Open site immediately
    if (selectedSiteData) {
      window.open(selectedSiteData.url, "_blank")
    }
  }

  const handleShare = async () => {
    if (!isFormValid) return

    // Save data in background
    saveCustomerData()
    
    // Share immediately
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: `Check out ${name} service`,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled share
        console.log('Share cancelled')
      }
    }
  }

  return (
    <div className="min-h-screen bg-deep-blue text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-12">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white">{name}</h1>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-electric-blue">About This Service</h2>
          <p className="text-lg leading-relaxed">{description}</p>
        </div>

        {/* Working Process */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-electric-blue">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
              >
                <div className="text-electric-blue text-xl font-bold mb-2">
                  Step {index + 1}
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sites Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-electric-blue">Available Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Dropdown */}
            <div>
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="w-full bg-white/10 text-white p-3 rounded-lg backdrop-blur-sm border border-white/20 focus:border-electric-blue outline-none appearance-none cursor-pointer hover:bg-white/20 transition-colors"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1em',
                  paddingRight: '2.5rem'
                }}
              >
                {sites.map((site, index) => (
                  <option 
                    key={index} 
                    value={site.name}
                    className="bg-gray-800 text-white hover:bg-gray-700"
                  >
                    {site.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ratings */}
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="text-sm text-gray-300 mb-1">Customer Rating</div>
              {selectedSiteData && (
                <StarRating rating={selectedSiteData.rating} />
              )}
            </div>

            {/* Verification Status */}
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20 flex items-center gap-2">
              {selectedSiteData?.verified ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white">Infronix Verified</span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">Not Verified</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Leads Form */}
        <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
          <h2 className="text-3xl font-semibold mb-6 text-electric-blue">Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white/5 p-3 rounded-lg border border-white/20 focus:border-electric-blue outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block mb-2">Phone Number</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full bg-white/5 p-3 rounded-lg border border-white/20 focus:border-electric-blue outline-none"
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                  />
                  {formData.validationMessage && (
                    <p className={`mt-1 text-sm ${formData.isPhoneVerified ? 'text-green-400' : 'text-red-400'}`}>
                      {formData.validationMessage}
                    </p>
                  )}
                </div>
                <button
                  onClick={verifyPhoneNumber}
                  disabled={formData.isValidating || !formData.isPhoneValid}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    formData.isValidating || !formData.isPhoneValid
                      ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                      : "bg-electric-blue text-black hover:bg-blue-600"
                  }`}
                >
                  {formData.isValidating ? "Verifying..." : "Verify"}
                </button>
              </div>
            </div>
          </div>
          {saveError && (
            <p className="text-red-400 mb-4">{saveError}</p>
          )}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleVisitSite}
              disabled={!isFormValid || isSaving}
              className={`px-6 py-3 rounded-lg transition-colors flex items-center justify-center ${
                isFormValid && !isSaving
                  ? "bg-electric-blue text-black hover:bg-blue-600"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              ) : (
                "Visit Site"
              )}
            </button>
            <button
              onClick={handleShare}
              disabled={!isFormValid || isSaving}
              className={`px-6 py-3 rounded-lg transition-colors flex items-center justify-center ${
                isFormValid && !isSaving
                  ? "bg-electric-blue text-black hover:bg-blue-600"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              ) : (
                "Share"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
