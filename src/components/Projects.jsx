'use client';

import { useState, useEffect, useRef } from 'react';

export default function Projects() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const techStack = [
        'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Vercel'
    ];

    const features = [
        {
            status: 'completed',
            icon: '✅',
            title: '已上線：生輔組 RPage 管理、建置生輔組獎助學金平台',
            description: 'scholarship.ncuesa.org.tw',
            link: 'https://scholarship.ncuesa.org.tw'
        },
        {
            status: 'planning',
            icon: '💡',
            title: '規劃中：宿舍退宿管理系統、生輔組餐券管理系統、學生會投票系統',
            description: ''
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
            { threshold: 0.2 }
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
        <section id="projects" className="py-20 md:py-32 px-4 md:px-8 bg-surface-muted" ref={ref}>
            <div className="max-w-7xl mx-auto">
                <div className="bg-surface rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">

                        {/* Left: Content */}
                        <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center">
                            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <h2 className="phone-h1 md:pc-h1 text-heading mb-6 md:mb-8 leading-tight">
                                    你的 Code，<br className="hidden md:block" />
                                    運行在校園日常
                                </h2>

                                <div className="mb-10 md:mb-12">
                                    <h3 className="phone-h3 md:pc-h2 text-brand mb-4 md:mb-6 font-bold">
                                        獎學金資訊平台
                                    </h3>
                                    <p className="phone-liner md:pc-liner text-foreground/90 dark:text-muted mb-6 md:mb-8 leading-relaxed">
                                        我們不只打造酷炫的專案，更要解決校園的真實問題。獎學金平台整合了繁雜資訊，優化申請流程，讓技術真正服務於同學。
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div className={`mb-10 md:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.2s' }}>
                                    <h4 className="phone-liner-bold md:pc-liner-bold text-heading mb-6 font-bold">
                                        技術棧
                                    </h4>
                                    <div className="flex flex-wrap gap-4">
                                        {techStack.map((tech, index) => (
                                            <span
                                                key={tech}
                                                className={`px-6 py-3 bg-brand/15 dark:bg-brand/10 text-brand border border-brand/20 rounded-full phone-liner md:pc-liner text-sm font-semibold transition-all duration-300 hover:bg-brand/25 dark:hover:bg-brand/20 transform hover:scale-105 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                                style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Status List */}
                                <div className="space-y-6 mb-10 md:mb-12">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-start space-x-6 p-6 md:p-8 rounded-2xl border transition-all duration-500 ${feature.status === 'completed' ? 'bg-green-500/10 dark:bg-green-500/10 border-green-500/20' : 'bg-yellow-500/10 dark:bg-yellow-500/10 border-yellow-500/20'} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                                            style={{ transitionDelay: `${0.6 + index * 0.2}s` }}
                                        >
                                            <span className="text-3xl md:text-4xl pt-1">{feature.icon}</span>
                                            <div>
                                                <h5 className="phone-liner-bold md:pc-liner-bold text-heading font-bold mb-2 leading-relaxed">
                                                    {feature.title}
                                                </h5>
                                                {feature.link ? (
                                                    <a
                                                        href={feature.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="phone-liner md:pc-liner text-brand hover:underline font-medium hover:text-brand-accent"
                                                    >
                                                        {feature.description}
                                                    </a>
                                                ) : (
                                                    <p className="phone-liner md:pc-liner text-foreground/80 dark:text-muted">
                                                        {feature.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1s' }}>
                                    <button
                                        onClick={() => openLink('https://github.com/GDG-on-campus-NCUE/NCUE-Scholarship')}
                                        className="bg-brand hover:bg-brand-accent text-text-on-brand px-10 py-4 md:px-12 md:py-5 rounded-lg phone-liner-bold md:pc-liner-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-4 group transform hover:scale-105"
                                    >
                                        <svg aria-hidden="true" focusable="false" role="img" className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300 text-text-on-brand" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                        </svg>
                                        <span className="text-text-on-brand">查看 GitHub 原始碼</span>
                                        <svg aria-hidden="true" focusable="false" role="img" className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300 text-text-on-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Mockup */}
                        <div className={`bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700 p-12 flex items-center justify-center transition-all duration-1000 min-h-[480px] lg:min-h-0 relative overflow-hidden ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '0.3s' }}>
                            {/* 背景裝飾 */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20"></div>
                            
                            {/* 可點擊的獎學金平台模型 */}
                            <button
                                onClick={() => openLink('https://scholarship.ncuesa.org.tw/')}
                                className="bg-white/25 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-2xl max-w-sm w-full hover:bg-white/30 hover:scale-105 transition-all duration-300 group cursor-pointer relative z-10"
                            >
                                {/* Mockup content */}
                                <div className="space-y-4 mb-6">
                                    <div className="h-4 bg-white/80 rounded w-3/4 text-shadow-light"></div>
                                    <div className="h-3 bg-white/70 rounded w-full"></div>
                                    <div className="h-3 bg-white/70 rounded w-5/6"></div>
                                    <div className="bg-teal-400/70 rounded-lg p-4 space-y-2 border border-white/30 shadow-md">
                                        <div className="h-3 bg-white/90 rounded w-2/3"></div>
                                        <div className="h-2 bg-white/80 rounded w-full"></div>
                                        <div className="h-2 bg-white/80 rounded w-4/5"></div>
                                    </div>
                                    <div className="bg-green-400/70 rounded-lg p-4 space-y-2 border border-white/30 shadow-md">
                                        <div className="h-3 bg-white/90 rounded w-3/5"></div>
                                        <div className="h-2 bg-white/80 rounded w-full"></div>
                                    </div>
                                    <div className="bg-orange-400/70 rounded-lg p-4 space-y-2 border border-white/30 shadow-md">
                                        <div className="h-3 bg-white/90 rounded w-4/5"></div>
                                        <div className="h-2 bg-white/80 rounded w-3/4"></div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-white font-bold text-3xl text-shadow-strong">🎓</span>
                                    </div>
                                    <p className="phone-liner-bold text-white mt-2 font-semibold text-lg high-contrast group-hover:text-yellow-100 transition-colors duration-300">
                                        獎學金平台
                                    </p>
                                    <p className="text-xs text-white/90 mt-1 text-shadow-medium group-hover:text-white transition-colors duration-300">
                                        點擊訪問
                                    </p>
                                </div>

                                {/* Hover 效果指示器 */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
