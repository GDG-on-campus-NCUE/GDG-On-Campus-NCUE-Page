'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import gdgLogoDark from '@/images/icon/GDG_On_Campus_dark.png';
import gdgLogoLight from '@/images/icon/GDG_On_Campus_light.png';
import githubIcon from '@/images/icon/github.png';
import instagramIcon from '@/images/icon/instagram.png';
import gdgCommunityIcon from '@/images/icon/GDG_icon.png';
import lineIcon from '@/images/icon/line.png';

// Gmail 圖示，使用 SVG 繪製
function GmailIcon({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
            <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
            <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
            <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
            <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
            <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
        </svg>
    );
}

export default function JoinUs() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const { language } = useLanguage();
    const { theme } = useTheme();

    // 社群連結與圖示設定（新增 Gmail）
    const socialLinks = [
        {
            name: 'GitHub',
            icon: githubIcon,
            url: 'https://github.com/GDG-on-campus-NCUE',
            labelZh: 'GitHub',
            labelEn: 'GitHub',
            isImage: true,
        },
        {
            name: 'Instagram',
            icon: instagramIcon,
            url: 'https://www.instagram.com/gdg_ncue',
            labelZh: 'Instagram',
            labelEn: 'Instagram',
            isImage: true,
        },
        {
            name: 'Gmail',
            icon: GmailIcon,
            url: 'https://groups.google.com/a/ncuesa.org.tw/g/gdg',
            labelZh: 'GDG mail 通知',
            labelEn: 'GDG Mail Notifications',
            isImage: false,
        },
        {
            name: 'GDG Community',
            icon: gdgCommunityIcon,
            url: 'https://gdg.community.dev/gdg-on-campus-national-changhua-university-of-education-changhua-city-taiwan/',
            labelZh: 'GDG 官網',
            labelEn: 'GDG Official',
            isImage: true,
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // 依據可見狀態切換動畫
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current) };
    }, []);


    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <section id="join" className="relative bg-surface-muted overflow-hidden" ref={ref}>
            {/* 呼吸流動背景 */}
            <div className="breathing-light"></div>
            {/* === 區塊一：行動號召 (CTA) - 全新設計與文案 === */}
            <div className="relative py-20 md:py-32 px-4 md:px-8 text-center overflow-hidden bg-surface">
                {/* 底部光暈，與下方 joinus 區塊光效相連 */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(66,133,244,0.15),transparent)]"></div>

                <div className="relative z-10">
                    <h2
                        className={`rainbow-text phone-h1 md:pc-h1 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        {language === 'zh' ? '你的程式碼，是校園的下一個未來。' : 'Your code is the next future of campus.'}
                    </h2>
                    <p className={`phone-liner md:pc-h3 text-muted max-w-3xl mx-auto mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s' }}>
                        {language === 'zh'
                            ? '我們相信，每一行程式碼都蘊含著改變的潛力。無論你的起點在哪，只要你對技術懷抱熱情，渴望將想法付諸實踐，這裡就是你連結同好、共同成長的最佳社群。'
                            : 'We believe every line of code carries the power to change. Wherever you start, if you love technology and want to turn ideas into reality, this is the community to connect and grow.'}
                    </p>

                    {/* 手機版寬度全滿，桌機保持原樣 */}
                    <button
                        onClick={() => openLink('https://line.me/R/ti/g/s4qeWSAWR9')}
                        className={`w-full md:w-auto inline-flex items-center justify-center gap-x-3 md:gap-x-4 bg-brand text-text-on-brand font-bold phone-liner-bold md:pc-liner-bold px-8 py-4 md:px-10 md:py-5 rounded-xl shadow-lg shadow-brand/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-brand/50 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        style={{ transitionDelay: '0.4s' }}
                    >
                        <Image src={lineIcon} alt="Line Icon" width={28} height={28} className="w-6 h-6 md:w-7 md:h-7" />
                        <span>{language === 'zh' ? '立即加入 LINE 社群' : 'Join our LINE group now'}</span>
                        <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            {/* === 區塊二：頁尾 (Footer) - 重新設計與互動 === */}
            <footer className="relative overflow-hidden bg-gradient-to-b from-surface to-surface-muted py-16 md:py-20 px-6 md:px-8">
                {/* 裝飾用漸層光暈 */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,133,244,0.15),transparent)]"></div>

                <div className="relative max-w-7xl mx-auto">
                    {/* RWD 兩欄版面 */}
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        {/* 左側：社群介紹 */}
                        <div className={`flex flex-col items-center md:items-start text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.6s' }}>
                            <a href="#" className="inline-block mb-4 md:mb-6">
                                {/* 依照主題顯示不同 Logo */}
                                <Image
                                    src={theme === 'dark' ? gdgLogoDark : gdgLogoLight}
                                    alt="GDG on Campus NCUE Logo"
                                    width={350}
                                    height={70}
                                />
                            </a>
                            <p className="text-muted text-sm max-w-sm">
                                {language === 'zh'
                                    ? '一個由學生主導、Google 支持的校園技術方舟。我們致力於連結校園與真實世界，透過實戰專案、前沿分享與社群協作，賦能每一位懷抱理想的開發者。'
                                    : 'A student-led, Google-supported tech hub. We bridge campus and the real world through practical projects, cutting-edge talks and community collaboration to empower every aspiring developer.'}
                            </p>
                        </div>

                        {/* 右側：社群連結與聯絡方式 */}
                        <div className={`flex flex-col items-center md:items-end text-center md:text-right gap-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.7s' }}>
                            <div>
                                <h3 className="font-bold text-heading mb-4">{language === 'zh' ? '關注我們' : 'Follow Us'}</h3>
                                <div className="flex items-center justify-center md:justify-end gap-x-6">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={social.name}
                                            aria-label={social.name}
                                            className="group flex flex-col items-center focus:outline-none select-none"
                                        >
                                            {/* 圓形圖示容器 */}
                                            <div className="w-12 h-12 bg-surface-muted rounded-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand/30 group-hover:bg-gradient-to-br group-hover:from-brand/10 group-hover:to-purple-600/10 group-focus-visible:ring-2 group-focus-visible:ring-brand group-focus-visible:ring-offset-2">
                                                {social.isImage ? (
                                                    <Image
                                                        src={social.icon}
                                                        alt={social.name}
                                                        width={24}
                                                        height={24}
                                                        className="w-6 h-6 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
                                                    />
                                                ) : (
                                                    <social.icon className="w-6 h-6 text-muted transition-transform duration-300 ease-out group-hover:scale-110 group-hover:text-brand" />
                                                )}
                                            </div>
                                            {/* 圖示下方文字說明 */}
                                            <span className="mt-2 text-xs text-muted group-hover:text-brand text-center">
                                                {language === 'zh' ? social.labelZh : social.labelEn}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-end gap-x-2 text-sm text-muted">
                                <EnvelopeIcon className="w-5 h-5 text-brand" />
                                <span>{language === 'zh' ? '聯絡我們:' : 'Contact Us:'}</span>
                                <a href="mailto:gdg-core@ncuesa.org.tw" className="hover:text-brand transition-colors">
                                    gdg-core@ncuesa.org.tw
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={`mt-12 text-center text-xs text-muted transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1s' }}>
                        <p>© {new Date().getFullYear()} GDG On Campus NCUE. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </section>
    );
}
