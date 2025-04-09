import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import type React from "react"
import WelcomePopup from "./components/WelcomePopup"


const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Infronix - Premium Service Marketplace",
  description: "Discover and book premium services for an elevated lifestyle",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}><WelcomePopup />{children}</body>
    </html>
  )
}

