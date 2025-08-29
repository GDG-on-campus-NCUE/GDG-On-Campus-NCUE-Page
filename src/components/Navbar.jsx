'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import bracketsGif from '@/images/stickers/brackets.gif';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // Set initial state
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { label: '核心使命', id: 'vision' },
        { label: '過往活動', id: 'events' },
        { label: '校園專案', id: 'projects' },
        { label: '加入我們', id: 'join' },
    ];

    const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
            ? 'bg-surface/90 backdrop-blur-xl border-b border-border shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`;

    const logoColor = isScrolled || isMobileMenuOpen ? 'text-heading' : 'text-white drop-shadow-lg';
    const linkColor = isScrolled || isMobileMenuOpen ? 'text-muted hover:text-heading' : 'text-white hover:text-gray-200 drop-shadow-md';
    const mobileIconColor = isScrolled || isMobileMenuOpen ? 'bg-heading' : 'bg-white';
    const themeSwitcherColor = isScrolled || isMobileMenuOpen ? 'text-heading hover:text-brand' : 'text-white hover:text-gray-200 drop-shadow-md';

    return (
        <nav className={navClasses}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" className="flex items-center space-x-2 md:space-x-3" aria-label="Homepage">
                            <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center">
                                <Image
                                    src={bracketsGif}
                                    alt="GDG Logo"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className={`transition-colors duration-300 ${logoColor}`}>
                                <div className="phone-liner-bold md:pc-liner-bold">Google Developer Groups</div>
                                <div className="text-xs md:text-sm font-light opacity-80">on Campus NCUE</div>
                            </div>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(({ label, id }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className={`pc-liner-bold transition-all duration-300 relative group ${linkColor}`}
                            >
                                {label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        ))}
                        <ThemeSwitcher colorClass={themeSwitcherColor} />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <ThemeSwitcher colorClass={themeSwitcherColor} />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 ml-2"
                            aria-label="Open menu"
                        >
                            <div className={`w-6 h-0.5 transition-all duration-300 ${mobileIconColor} ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></div>
                            <div className={`w-6 h-0.5 transition-all duration-300 ${mobileIconColor} my-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`w-6 h-0.5 transition-all duration-300 ${mobileIconColor} ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-screen border-t border-border' : 'max-h-0'
                }`}>
                <div className="p-4 space-y-4">
                    {navLinks.map(({ label, id }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className="block w-full text-left phone-liner-bold text-heading hover:text-brand transition-colors duration-200 py-2"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
