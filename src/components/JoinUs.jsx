'use client';

import { useState, useEffect, useRef } from 'react';

export default function JoinUs() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: '/images/icon/linkedin.png',
            url: 'https://www.linkedin.com/in/gdg-on-campus-ncue-a9942a381',
        },
        {
            name: 'Instagram',
            icon: '/images/icon/instagram.png',
            url: 'https://www.instagram.com/gdg_ncue',
        },
        {
            name: 'GDG',
            icon: '/images/icon/google_sticker_3.gif',
            url: 'https://gdg.community.dev/gdg-on-campus-national-changhua-university-of-education-changhua-city-taiwan/',
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <section id="join" className="bg-surface" ref={ref}>
            {/* CTA Section with gradient transition */}
            <div className="bg-gradient-to-b from-brand via-brand to-blue-600 py-12 md:py-16 px-6 md:px-8 relative overflow-hidden">
                {/* Gradient overlay for smooth transition */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/20"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h2 className={`mb-6 md:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{
                            fontSize: 'clamp(1.75rem, 5vw, 4rem)',
                            fontWeight: '700',
                            fontFamily: 'var(--font-source-sans)',
                            lineHeight: '1.1',
                            background: 'linear-gradient(135deg, #4285f4 0%, #34a853 25%, #fbbc04 50%, #ea4335 75%, #4285f4 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            backgroundSize: '200% 200%',
                            animation: 'gradient-shift 6s ease infinite'
                        }}>
                        準備好成為下一個改變者了嗎？
                    </h2>
                    <p className={`mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 md:px-0 transition-all duration-1000 text-white/90 dark:text-slate-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ 
                            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                            transitionDelay: '0.2s',
                            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                        }}>
                        無論你是程式新手還是技術老手，只要對技術有熱情，渴望用 Code 改變世界，我們都歡迎你的加入！
                    </p>

                    <button
                        onClick={() => openLink('https://line.me/R/ti/g/s4qeWSAWR9')}
                        className={`bg-white text-brand hover:bg-gray-100 border-2 border-white hover:border-gray-200 px-6 py-4 md:px-12 md:py-6 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center space-x-3 md:space-x-4 mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} w-full max-w-md md:max-w-lg`}
                        style={{ transitionDelay: '0.4s' }}>
                        <img 
                            src="/images/stickers/slider.gif" 
                            alt="" 
                            className="w-12 h-12 md:w-16 md:h-16 object-contain animate-pulse flex-shrink-0"
                        />
                        <span 
                            className="font-bold leading-tight text-center text-gray-800"
                            style={{
                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                color: '#1f2937'
                            }}>
                            立即加入 Line 社群
                        </span>
                    </button>
                </div>
            </div>

            {/* Footer Section - With padding for better spacing */}
            <footer className="bg-surface pt-8 md:pt-12 pb-8 md:pb-12 px-6 md:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Social Links */}
                    <div className="flex flex-col sm:flex-row justify-center items-center mb-6 md:mb-8">
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 md:space-x-12 lg:space-x-16">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex flex-col items-center space-y-2 transition-all duration-500 hover:scale-110 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex-shrink-0`}
                                    style={{ transitionDelay: `${0.8 + index * 0.1}s` }}
                                >
                                    <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-background border-2 border-border rounded-full flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-300 shadow-lg group-hover:shadow-xl">
                                        <img 
                                            src={social.icon} 
                                            alt={`${social.name} icon`}
                                            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                                        />
                                    </div>
                                    <span className="phone-liner-bold md:pc-liner-bold text-foreground group-hover:text-brand transition-colors duration-300 text-sm sm:text-base whitespace-nowrap">
                                        {social.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className={`text-center mb-6 md:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: '1.1s' }}>
                        <div className="bg-background dark:bg-surface border-2 border-border rounded-xl p-4 md:p-5 max-w-2xl mx-auto shadow-lg">
                            <p className="phone-liner-bold md:pc-liner-bold text-heading mb-2 text-sm md:text-base">
                                國立彰化師範大學 Google Developer Groups on Campus
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-2">
                                <span className="phone-liner md:pc-liner text-foreground/80 text-xs md:text-sm">
                                    ✉️ Email: 
                                </span>
                                <a 
                                    href="mailto:gdg.ncue@gmail.com"
                                    className="phone-liner-bold md:pc-liner-bold text-brand hover:text-brand-accent transition-colors duration-300 underline text-xs md:text-sm"
                                >
                                    gdg.ncue@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="bg-background dark:bg-surface-muted rounded-t-xl pt-4 md:pt-6 mt-4 md:mt-6 px-6 md:px-8 -mx-6 md:-mx-8">
                        <div className={`flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: '1.3s' }}>
                            <p className="phone-liner md:pc-liner text-foreground/60 text-center md:text-left font-medium text-xs md:text-sm">
                                © 2025 GDG on Campus NCUE. All Rights Reserved.
                            </p>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <a href="#" className="phone-liner md:pc-liner text-foreground/60 hover:text-brand transition-colors duration-300 text-center font-medium underline hover:no-underline text-xs md:text-sm">
                                    隱私政策
                                </a>
                                <a href="#" className="phone-liner md:pc-liner text-foreground/60 hover:text-brand transition-colors duration-300 text-center font-medium underline hover:no-underline text-xs md:text-sm">
                                    服務條款
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
}
