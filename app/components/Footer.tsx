import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-electric-blue">About Infronix</h3>
            <p className="text-gray-400">Elevating lifestyles through premium services and unparalleled experiences.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-electric-blue">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-electric-blue">Contact Us</h3>
            <p className="text-gray-400">1234 Luxury Lane</p>
            <p className="text-gray-400">Elegance City, EC 56789</p>
            <p className="text-gray-400">contact@infronix.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-electric-blue">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                <Facebook />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                <Twitter />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                <Instagram />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2023 Infronix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

