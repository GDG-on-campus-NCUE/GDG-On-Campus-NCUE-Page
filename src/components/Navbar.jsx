'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme'; // 新增 import
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import bracketsGif from '@/images/stickers/brackets.gif';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme } = useTheme(); // 新增，取得目前主題

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10); // 稍微降低觸發滾動的閾值
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const { language } = useLanguage();
    const navLinks = language === 'zh'
        ? [
            { label: '核心使命', id: 'vision' },
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
    
    // 在淺色主題下無論是否位於頂端皆套用深色元件
    const useDarkStyle = theme === 'light';

    const navClasses = `fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-300 ${isScrolled || isMobileMenuOpen
            ? 'bg-surface/90 shadow-lg'
            : 'bg-transparent' // 在頂部時完全透明
        }`;

    const logoColor = useDarkStyle ? 'text-slate-800' : 'text-white drop-shadow-lg';
    const linkColor = useDarkStyle ? 'text-slate-700 hover:text-slate-900' : 'text-white hover:text-gray-200 drop-shadow-md';
    const mobileIconColor = useDarkStyle ? 'text-slate-800' : 'text-white';
    const themeSwitcherColor = useDarkStyle ? 'text-slate-700 hover:text-brand' : 'text-white hover:text-gray-200 drop-shadow-md';
    const mobileMenuItemColor = useDarkStyle ? 'text-heading' : theme === 'dark' ? 'text-heading' : 'text-white';

    return (
        <>
            <nav className={navClasses}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-24">
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
                                    <div className="text-xs md:text-sm font-light opacity-80">On Campus NCUE</div>
                                </div>
                            </a>
                        </div>

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
                            <LanguageSwitcher colorClass={themeSwitcherColor} />
                            <ThemeSwitcher colorClass={themeSwitcherColor} />
                        </div>

                        <div className="md:hidden flex items-center">
                            <ThemeSwitcher colorClass={themeSwitcherColor} />
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 ml-2 transition-colors duration-300 ${mobileIconColor}`}
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 shadow-lg' : 'max-h-0'}`}
                >
                    <div className="p-4 space-y-4">
                        {navLinks.map(({ label, id }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className={`block w-full text-left phone-liner-bold ${mobileMenuItemColor} hover:text-brand transition-colors duration-200 py-2`}
                            >
                                {label}
                            </button>
                        ))}
                        {/* 手機版選單底部的語言切換 */}
                        <div className="pt-2 border-t border-surface-muted flex justify-center">
                            <LanguageSwitcher colorClass={mobileMenuItemColor} />
                        </div>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-background/60 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </>
    );
}
