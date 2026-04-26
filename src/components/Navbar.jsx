'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import bracketsGif from '@/images/stickers/brackets.gif';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (sectionId) => {
        if (pathname === '/') {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push(`/#${sectionId}`);
        }
        setIsMobileMenuOpen(false);
    };

    const { language } = useLanguage();
    const loginLabel = language === 'zh' ? '登入' : 'Login';
    const navLinks = language === 'zh'
        ? [
            { label: '社群願景', id: 'vision' },
            { label: '活動回顧', id: 'events' },
            { label: '校園專案', id: 'projects' },
            { label: '社群行程', id: 'calendar' },
            { label: '加入我們', id: 'join' },
        ]
        : [
            { label: 'Our Vision', id: 'vision' },
            { label: 'Events', id: 'events' },
            { label: 'Projects', id: 'projects' },
            { label: 'Schedule', id: 'calendar' },
            { label: 'Join Us', id: 'join' },
        ];
    
    const navClasses = `fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-300 ${isScrolled || isMobileMenuOpen
            ? 'bg-surface/90 shadow-lg'
            : 'bg-transparent'
        }`;

    const logoColor = 'text-white drop-shadow-lg';
    const linkColor = 'text-white hover:text-gray-200 drop-shadow-md';
    const mobileIconColor = 'text-white';
    const switcherColor = 'text-white hover:text-gray-200 drop-shadow-md';
    const mobileMenuItemColor = 'text-white';

    return (
        <>
            <nav className={navClasses}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-24">
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-2 md:space-x-3" aria-label="Homepage">
                                <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center">
                                    <Image
                                        src={bracketsGif}
                                        alt="GDG Logo"
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-contain"
                                        draggable={false}
                                    />
                                </div>
                                <div className={`transition-colors duration-300 ${logoColor}`}>
                                    <div className="phone-liner-bold md:pc-liner-bold">Google Developer Group</div>
                                    <div className="text-xs md:text-sm font-light opacity-80">On Campus NCUE</div>
                                </div>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.map(({ label, id }) => (
                                <button
                                    key={id}
                                    onClick={() => handleNavClick(id)}
                                    className={`pc-liner-bold transition-all duration-300 relative group ${linkColor}`}
                                >
                                    {label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            ))}
                            
                            <Link
                                href="/admin/login"
                                className={`pc-liner-bold transition-all duration-300 relative group ${linkColor}`}
                            >
                                {loginLabel}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            
                            <LanguageSwitcher colorClass={switcherColor} />
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 transition-colors duration-300 ${mobileIconColor}`}
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[32rem] shadow-lg' : 'max-h-0'}`}
                >
                    <div className="p-4 space-y-4 bg-surface/95 backdrop-blur-xl">
                        {navLinks.map(({ label, id }) => (
                            <button
                                key={id}
                                onClick={() => handleNavClick(id)}
                                className={`block w-full text-left phone-liner-bold ${mobileMenuItemColor} hover:text-brand transition-colors duration-200 py-2`}
                            >
                                {label}
                            </button>
                        ))}

                        <Link
                            href="/admin/login"
                            className={`block w-full text-left phone-liner-bold ${mobileMenuItemColor} hover:text-brand transition-colors duration-200 py-2`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {loginLabel}
                        </Link>

                        <div className="pt-2 border-t border-surface-muted flex justify-center">
                            <LanguageSwitcher colorClass={mobileMenuItemColor} />
                        </div>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </>
    );
}
