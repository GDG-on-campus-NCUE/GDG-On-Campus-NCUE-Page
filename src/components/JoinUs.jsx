'use client';

import { useState, useEffect, useRef } from 'react';

export default function JoinUs() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const socialLinks = [
        {
            name: 'Line',
            icon: '💬',
            url: 'https://line.me/R/ti/g/s4qeWSAWR9',
        },
        {
            name: 'Instagram',
            icon: '📷',
            url: 'https://www.instagram.com/gdg_ncue',
        },
        {
            name: 'GDG',
            icon: '🌐',
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
            {/* CTA Section */}
            <div className="bg-brand py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className={`phone-h1 md:pc-h1 text-white mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        準備好成為下一個改變者了嗎？
                    </h2>
                    <p className={`phone-liner md:pc-h3 text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '0.2s' }}>
                        無論你是程式新手還是技術老手，只要對技術有熱情，渴望用 Code 改變世界，我們都歡迎你的加入！
                    </p>

                    <button
                        onClick={() => openLink('https://line.me/R/ti/g/s4qeWSAWR9')}
                        className={`bg-white text-brand hover:bg-gray-200 px-10 py-4 rounded-lg phone-liner-bold md:pc-liner-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '0.4s' }}>
                        立即加入 Line 社群
                    </button>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-background py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '0.6s' }}>
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-brand rounded-md flex items-center justify-center">
                                <span className="text-white font-bold text-lg">G</span>
                            </div>
                            <div className="text-heading">
                                <div className="pc-liner-bold">Google Developer Groups</div>
                                <div className="pc-liner text-muted">on Campus NCUE</div>
                            </div>
                        </div>
                        <p className="pc-liner text-muted max-w-md mx-auto">
                            連結開發者，啟發創意，共創未來的技術社群
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-8 mb-12">
                        {socialLinks.map((social, index) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group flex flex-col items-center space-y-2 transition-all duration-500 hover:scale-110 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${0.8 + index * 0.1}s` }}
                            >
                                <div className="w-12 h-12 bg-surface-muted rounded-full flex items-center justify-center group-hover:bg-brand transition-all duration-300">
                                    <span className="text-2xl group-hover:text-white transition-colors">{social.icon}</span>
                                </div>
                                <span className="phone-liner text-muted group-hover:text-brand transition-colors duration-300">
                                    {social.name}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: '1.1s' }}>
                        <p className="pc-liner text-muted mb-2">
                            國立彰化師範大學 Google Developer Groups on Campus
                        </p>
                        <p className="phone-liner text-muted/70">
                            Email: gdg.ncue@gmail.com
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border pt-8">
                        <div className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: '1.3s' }}>
                            <p className="phone-liner text-muted/70">
                                © 2025 GDG on Campus NCUE. All Rights Reserved.
                            </p>
                            <div className="flex space-x-6">
                                <a href="#" className="phone-liner text-muted/70 hover:text-foreground transition-colors duration-300">
                                    隱私政策
                                </a>
                                <a href="#" className="phone-liner text-muted/70 hover:text-foreground transition-colors duration-300">
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
