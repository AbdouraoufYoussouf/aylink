"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-500">AYLinker</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="#features" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Link href={'/auth/login'}>
              <Button variant="outline" className="mr-2">Login</Button>
            </Link>
            <Link href={'/auth/register'}>
              <Button>Register</Button>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="#features" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">Pricing</Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              <Link href={'/auth/login'}>
                <Button variant="outline" className="mr-2">Login</Button>
              </Link>
              <Link href={'/auth/register'}>
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}


