'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import gdgLogo from '@/images/icon/brackets.gif';
import githubIcon from '@/images/icon/github (1).png';
import instagramIcon from '@/images/icon/instagram.png';
import gdgCommunityIcon from '@/images/icon/google_sticker_3.gif';
import lineIcon from '@/images/icon/line.png';

export default function JoinUs() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const { language } = useLanguage();

    const socialLinks = [
        { name: 'GitHub', icon: githubIcon, url: 'https://github.com/GDG-on-campus-NCUE' },
        { name: 'Instagram', icon: instagramIcon, url: 'https://www.instagram.com/gdg_ncue' },
        { name: 'GDG Community', icon: gdgCommunityIcon, url: 'https://gdg.community.dev/gdg-on-campus-national-changhua-university-of-education-changhua-city-taiwan/' },
    ];

    // 色彩調色盤（取自圖中色標）
    const colorPalette = [
        '#4285F4', // Blue 500
        '#34A853', // Green 500
        '#F9AB00', // Yellow 600
        '#EA4335', // Red 500
        '#57CAFF', // Halftone Blue
        '#5CDB6F', // Halftone Green
        '#FFD427', // Halftone Yellow
        '#FF7DAF', // Halftone Red
        '#C3ECF6', // Pastel Blue
        '#C6FFC6', // Pastel Green
        '#FFE7A5', // Pastel Yellow
        '#F8D8D8', // Pastel Red
    ];
    // 目前使用的色彩索引
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current) };
    }, []);

    // 當區塊可見時開始切換文字色彩
    useEffect(() => {
        if (!isVisible) return;
        const timer = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % colorPalette.length);
        }, 2000);
        return () => clearInterval(timer);
    }, [isVisible]);

    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <section id="join" className="bg-surface-muted" ref={ref}>
            {/* === 區塊一：行動號召 (CTA) - 全新設計與文案 === */}
            <div className="relative py-20 md:py-32 px-4 md:px-8 text-center overflow-hidden bg-surface">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-brand/20 via-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10">
                    <h2
                        className={`phone-h1 md:pc-h1 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ color: colorPalette[colorIndex] }}
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
                        <span>{language === 'zh' ? '立即加入 Line 社群' : 'Join our Line group now'}</span>
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
                                <Image src={gdgLogo} alt="GDG on Campus NCUE Logo" width={200} height={40} />
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
                                <div className="flex items-center justify-center md:justify-end gap-x-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={social.name}
                                            aria-label={social.name}
                                            className="group w-12 h-12 bg-surface-muted rounded-full flex items-center justify-center transition-transform duration-300 ease-out hover:scale-110 hover:shadow-lg hover:shadow-brand/30 hover:bg-gradient-to-br hover:from-brand/10 hover:to-purple-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                                        >
                                            <Image
                                                src={social.icon}
                                                alt={social.name}
                                                width={24}
                                                height={24}
                                                className="w-6 h-6 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-end gap-x-2 text-sm text-muted">
                                <EnvelopeIcon className="w-5 h-5 text-brand" />
                                <a href="mailto:gdg-core@ncuesa.org.tw" className="hover:text-brand transition-colors">
                                    gdg-core@ncuesa.org.tw
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={`mt-12 text-center text-xs text-muted transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1s' }}>
                        <p>© {new Date().getFullYear()} GDG on Campus NCUE. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </section>
    );
}
