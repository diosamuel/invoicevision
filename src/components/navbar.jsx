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

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          <Link href="#features" className="text-sm font-medium hover:text-gray-600">
            Fitur
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-gray-600">
            Harga
          </Link>
          <Link href="#blog" className="text-sm font-medium hover:text-gray-600">
            Blog
          </Link>
        </div>

        {/* CTA and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Link
            href="/scan"
            className="hidden rounded-md border border-black px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 md:block"
          >
            Mulai
          </Link>
          <Link
            href="/dashboard"
            className="hidden rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 md:block"
          >
            Dashboard
          </Link>
          <button
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container mx-auto border-t border-gray-200 px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link href="#features" className="text-sm font-medium hover:text-gray-600" onClick={toggleMenu}>
              Fitur
            </Link>
            <div className="space-y-2">
              <p className="text-sm font-medium">Solusi</p>
              <div className="ml-4 flex flex-col space-y-2">
                <Link href="#personal" className="text-sm hover:text-gray-600" onClick={toggleMenu}>
                  Untuk Pribadi
                </Link>
                <Link href="#business" className="text-sm hover:text-gray-600" onClick={toggleMenu}>
                  Untuk Bisnis
                </Link>
                <Link href="#enterprise" className="text-sm hover:text-gray-600" onClick={toggleMenu}>
                  Untuk Enterprise
                </Link>
              </div>
            </div>
            <Link href="#pricing" className="text-sm font-medium hover:text-gray-600" onClick={toggleMenu}>
              Harga
            </Link>
            <Link href="#blog" className="text-sm font-medium hover:text-gray-600" onClick={toggleMenu}>
              Blog
            </Link>
            <div className="flex space-x-4 pt-2">
              <Link
                href="/login"
                className="rounded-md border border-black px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                onClick={toggleMenu}
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

