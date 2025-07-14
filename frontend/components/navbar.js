"use client"
import React, { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-blue-100' 
                : 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-lg'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3 group">
                        <div className="relative">
                            <img 
                                src="/img/logo4.jpg" 
                                alt="FinPilot Logo" 
                                className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                        </div>
                        <span className={`text-2xl md:text-3xl font-bold tracking-wide transition-all duration-300 ${
                            scrolled 
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500' 
                                : 'text-white drop-shadow-lg'
                        }`}>
                            FinPilot
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['About', 'Explore', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`relative font-medium transition-all duration-300 group ${
                                    scrolled 
                                        ? 'text-gray-700 hover:text-blue-600' 
                                        : 'text-white hover:text-blue-200'
                                }`}
                            >
                                {item}
                                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </a>
                        ))}
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => router.push('/login')}
                            className={`relative px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                                scrolled 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800' 
                                    : 'bg-white text-blue-700 shadow-lg hover:bg-blue-50 hover:shadow-xl'
                            }`}
                        >
                            <span className="relative z-10">Login</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                        </button>
                        <button
                            onClick={() => router.push('/signup')}
                            className={`relative px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                                scrolled 
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700' 
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800'
                            }`}
                        >
                            <span className="relative z-10">Sign Up</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                                scrolled 
                                    ? 'text-gray-700 hover:bg-gray-100' 
                                    : 'text-white hover:bg-white/10'
                            }`}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6 transform rotate-180 transition-transform duration-300" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
                isMenuOpen 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
            } overflow-hidden`}>
                <div className={`px-4 pt-2 pb-4 space-y-2 ${
                    scrolled 
                        ? 'bg-white/95 backdrop-blur-md border-t border-gray-200' 
                        : 'bg-gradient-to-b from-blue-600 to-blue-700'
                }`}>
                    {['About', 'Explore', 'Contact'].map((item, index) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                                scrolled 
                                    ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600' 
                                    : 'text-white hover:bg-white/10'
                            }`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                        <button onClick={()=>{router.push('/login')}} className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                            scrolled 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl' 
                                : 'bg-white text-blue-700 shadow-lg hover:bg-blue-50'
                        }`}>
                            Login
                        </button>
                        <button onClick={()=>{router.push('/signup')}} className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                            scrolled 
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl' 
                                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl'
                        }`}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar