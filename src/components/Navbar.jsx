'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import bracketsGif from '@/images/stickers/brackets.gif';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // 設定初始狀態
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
            { label: '加入我們', id: 'join' },
        ]
        : [
            { label: 'Our Vision', id: 'vision' },
            { label: 'Events', id: 'events' },
            { label: 'Projects', id: 'projects' },
            { label: 'Join Us', id: 'join' },
        ];

    // 讓導覽列維持毛玻璃效果，僅針對顏色變化做轉場以避免滾動時位置產生位移
    const navClasses = `fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-300 ${isScrolled || isMobileMenuOpen
            ? 'bg-surface/90 shadow-lg'
            : 'bg-surface/50'
        }`;

    const logoColor = isScrolled || isMobileMenuOpen ? 'text-heading' : 'text-white drop-shadow-lg';
    const linkColor = isScrolled || isMobileMenuOpen ? 'text-muted hover:text-heading' : 'text-white hover:text-gray-200 drop-shadow-md';
    // 根據滾動與漢堡選單狀態切換 icon 顏色
    const mobileIconColor = isScrolled || isMobileMenuOpen ? 'text-heading' : 'text-white';
    const themeSwitcherColor = isScrolled || isMobileMenuOpen ? 'text-heading hover:text-brand' : 'text-white hover:text-gray-200 drop-shadow-md';

    return (
        <>
            {/* 導覽列本體 */}
            <nav className={navClasses}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-24">
                        {/* 標誌區塊 */}
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

                        {/* 桌面版選單 */}
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

                        {/* 手機版漢堡選單按鈕 */}
                        <div className="md:hidden flex items-center">
                            <LanguageSwitcher colorClass={themeSwitcherColor} />
                            <ThemeSwitcher colorClass={themeSwitcherColor} />
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 ml-2 transition-colors duration-300 ${mobileIconColor}`}
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? (
                                    // 開啟時顯示關閉 icon
                                    <XMarkIcon className="w-6 h-6" />
                                ) : (
                                    // 關閉時顯示漢堡 icon
                                    <Bars3Icon className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 毛玻璃選單容器 */}
                <div
                    className={`md:hidden absolute top-full left-0 w-full bg-surface/80 backdrop-blur-lg transition-[max-height] duration-300 ease-in-out overflow-hidden z-50 ${isMobileMenuOpen ? 'max-h-screen shadow-lg' : 'max-h-0'
                        }`}
                >
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

            {/* 背景遮罩，移到 nav 之外以確保固定定位相對於視窗 */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-background/60 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </>
    );
}
