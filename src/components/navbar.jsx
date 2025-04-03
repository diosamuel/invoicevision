"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Receipt, ChevronDown } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Receipt className="h-6 w-6" />
          <span className="text-xl font-bold">Nota AI</span>
        </Link>
        {/* CTA and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Link
            href="/scan"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Scan Nota
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Dashboard
          </Link>
        </div>
      </div>

    </nav>
  )
}

