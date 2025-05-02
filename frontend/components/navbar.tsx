"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, User, LogOut } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Check if user is logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        setIsLoggedIn(true)
        setUser(JSON.parse(userData))
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    }
  }, [pathname])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    router.push("/")
  }

  // Hide navbar on login, signup, and chatbot pages
  const hideFooter = pathname === "/login" || pathname === "/signup" || pathname === "/chatbot"

  return (
    <nav
      className={`py-4 px-6 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/95 backdrop-blur-sm shadow-lg" : "bg-black"}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white flex items-center">
          <span className="text-3xl">Grub</span>
          <span className="text-green-500">&</span>
          <span className="text-3xl">Grind</span>
          <span className="text-green-500">.</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white hover:text-green-500 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`menu-item text-white hover:text-green-500 transition-colors ${pathname === "/" ? "text-green-500" : ""}`}
          >
            Home
          </Link>
          <a
            href="#about-us"
            onClick={(e) => scrollToSection(e, "about-us")}
            className="menu-item text-white hover:text-green-500 transition-colors"
          >
            About Us
          </a>
          <a
            href="#all-course"
            onClick={(e) => scrollToSection(e, "all-course")}
            className="menu-item text-white hover:text-green-500 transition-colors"
          >
            All Course
          </a>
          <Link
            href="/chatbot"
            className={`menu-item text-white hover:text-green-500 transition-colors ${pathname === "/chatbot" ? "text-green-500" : ""}`}
          >
            Chatbot
          </Link>
          <a
            href="#blog-section"
            onClick={(e) => scrollToSection(e, "blog-section")}
            className="menu-item text-white hover:text-green-500 transition-colors"
          >
            Blog
          </a>
          <Link
            href="/recipes"
            className={`menu-item text-white hover:text-green-500 transition-colors ${pathname === "/recipes" ? "text-green-500" : ""}`}
          >
            Recipes
          </Link>
          <a
            href="#contact-us"
            onClick={(e) => scrollToSection(e, "contact-us")}
            className="menu-item text-white hover:text-green-500 transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Auth Buttons or User Icon */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-white hover:text-green-500 transition-colors"
              >
                {user?.profileImage ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={user.profileImage || "/placeholder.svg"}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <User size={24} />
                )}
              </Link>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white hover:text-red-500 transition-colors"
              >
                <LogOut size={20} />
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="btn-animated border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="btn-animated bg-green-500 hover:bg-green-600 text-white">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-sm p-6 md:hidden flex flex-col space-y-6 shadow-lg animate-fadeIn">
            <Link
              href="/"
              className="text-white hover:text-green-500 transition-colors text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#about-us"
              onClick={(e) => scrollToSection(e, "about-us")}
              className="text-white hover:text-green-500 transition-colors text-lg"
            >
              About Us
            </a>
            <a
              href="#all-course"
              onClick={(e) => scrollToSection(e, "all-course")}
              className="text-white hover:text-green-500 transition-colors text-lg"
            >
              All Course
            </a>
            <Link
              href="/chatbot"
              className="text-white hover:text-green-500 transition-colors text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Chatbot
            </Link>
            <a
              href="#blog-section"
              onClick={(e) => scrollToSection(e, "blog-section")}
              className="text-white hover:text-green-500 transition-colors text-lg"
            >
              Blog
            </a>
            <Link
              href="/recipes"
              className="text-white hover:text-green-500 transition-colors text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Recipes
            </Link>
            <a
              href="#contact-us"
              onClick={(e) => scrollToSection(e, "contact-us")}
              className="text-white hover:text-green-500 transition-colors text-lg"
            >
              Contact Us
            </a>
            <div className="flex flex-col space-y-4 pt-4 border-t border-gray-800">
              {isLoggedIn ? (
                <div className="flex justify-between items-center">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-white hover:text-green-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user?.profileImage ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={user.profileImage || "/placeholder.svg"}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <User size={24} />
                    )}
                    <span>Profile</span>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <LogOut size={20} />
                    <span className="ml-2">Logout</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full btn-animated border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full btn-animated bg-green-500 hover:bg-green-600 text-white">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
