'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import gdgLogo from '@/images/icon/google_developer_groups_logo.svg';
import githubIcon from '@/images/icon/github.svg';
import instagramIcon from '@/images/icon/instagram.svg';
import gdgCommunityIcon from '@/images/icon/gdg_community.svg';
import lineIcon from '@/images/icon/line.svg';

export default function JoinUs() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const socialLinks = [
        { name: 'GitHub', icon: githubIcon, url: 'https://github.com/GDG-on-campus-NCUE' },
        { name: 'Instagram', icon: instagramIcon, url: 'https://www.instagram.com/gdg_ncue' },
        { name: 'GDG Community', icon: gdgCommunityIcon, url: 'https://gdg.community.dev/gdg-on-campus-national-changhua-university-of-education-changhua-city-taiwan/' },
    ];

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

    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <section id="join" className="bg-surface-muted" ref={ref}>
            {/* === 區塊一：行動號召 (CTA) - 全新設計與文案 === */}
            <div className="relative py-20 md:py-32 px-4 md:px-8 text-center overflow-hidden bg-surface">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-brand/20 via-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                
                <div className="relative z-10">
                    <h2 className={`phone-h1 md:pc-h1 text-heading mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        你的程式碼，是校園的下一個未來。
                    </h2>
                    <p className={`phone-liner md:pc-h3 text-muted max-w-3xl mx-auto mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s' }}>
                        我們相信，每一行程式碼都蘊含著改變的潛力。無論你的起點在哪，只要你對技術懷抱熱情，渴望將想法付諸實踐，這裡就是你連結同好、共同成長的最佳社群。
                    </p>
                    
                    <button
                        onClick={() => openLink('https://line.me/R/ti/g/s4qeWSAWR9')}
                        className={`inline-flex items-center justify-center gap-x-3 md:gap-x-4 bg-brand text-text-on-brand font-bold phone-liner-bold md:pc-liner-bold px-8 py-4 md:px-10 md:py-5 rounded-xl shadow-lg shadow-brand/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-brand/50 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        style={{ transitionDelay: '0.4s' }}
                    >
                        <Image src={lineIcon} alt="Line Icon" width={28} height={28} className="w-6 h-6 md:w-7 md:h-7" />
                        <span>立即加入 Line 社群</span>
                        <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            {/* === 區塊二：頁尾 (Footer) - 全新設計與文案 === */}
            <footer className="bg-surface border-t border-border py-12 md:py-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10">
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.6s' }}>
                            <a href="#" className="inline-block mb-4">
                                <Image src={gdgLogo} alt="GDG on Campus NCUE Logo" width={200} height={40} />
                            </a>
                            <p className="text-muted text-sm max-w-sm">
                                一個由學生主導、Google 支持的校園技術方舟。我們致力於連結校園與真實世界，透過實戰專案、前沿分享與社群協作，賦能每一位懷抱理想的開發者。
                            </p>
                        </div>
                        
                        <div className={`flex flex-col md:items-end gap-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.8s' }}>
                            <div>
                                <h3 className="font-bold text-heading mb-4 text-left md:text-right">關注我們</h3>
                                <div className="flex items-center justify-start md:justify-end gap-x-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group w-12 h-12 bg-surface-muted border border-border rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand hover:border-brand hover:scale-110"
                                            title={social.name}
                                        >
                                            <Image src={social.icon} alt={social.name} width={24} height={24} className="w-6 h-6 transition-all duration-300 group-hover:invert group-hover:brightness-0" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2 text-sm text-muted">
                                <EnvelopeIcon className="w-5 h-5 text-brand" />
                                <a href="mailto:gdg-core@ncuesa.org.tw" className="hover:text-brand transition-colors">
                                    gdg-core@ncuesa.org.tw
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={`border-t border-border pt-8 mt-8 text-center text-xs text-muted transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1s' }}>
                        <p>© {new Date().getFullYear()} GDG on Campus NCUE. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </section>
    );
}