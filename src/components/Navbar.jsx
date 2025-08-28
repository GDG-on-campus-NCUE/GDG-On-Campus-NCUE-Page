'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white shadow-md'
                : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-8 lg:px-10">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">G</span>
                        </div>
                        <div className={`pc-liner-bold transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'
                            }`}>
                            <span>Google Developer Groups</span>
                            <div className="text-xs font-light">on Campus NCUE</div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {[
                            { label: '核心使命', id: 'vision' },
                            { label: '過往活動', id: 'events' },
                            { label: '校園專案', id: 'projects' },
                            { label: '加入我們', id: 'join' },
                        ].map(({ label, id }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className={`pc-liner-bold transition-all duration-300 relative group ${isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
                                    }`}
                            >
                                {label}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2"
                    >
                        <div className={`w-6 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-800' : 'bg-white'
                            } mb-1 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                        <div className={`w-6 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-800' : 'bg-white'
                            } mb-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-800' : 'bg-white'
                            } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-20 right-0 h-screen bg-white shadow-lg transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } w-80`}>
                <div className="p-6 space-y-6">
                    {[
                        { label: '核心使命', id: 'vision' },
                        { label: '過往活動', id: 'events' },
                        { label: '校園專案', id: 'projects' },
                        { label: '加入我們', id: 'join' },
                    ].map(({ label, id }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className="block w-full text-left phone-liner-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
