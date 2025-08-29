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
        <section id="projects" className="py-24 px-6 bg-surface-muted" ref={ref}>
            <div className="max-w-6xl mx-auto">
                <div className="bg-surface rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">

                        {/* Left: Content */}
                        <div className="p-12 lg:p-16 flex flex-col justify-center">
                            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <h2 className="phone-h1 md:pc-h1 text-heading mb-6 leading-tight">
                                    你的 Code，<br />
                                    運行在校園日常
                                </h2>

                                <div className="mb-8">
                                    <h3 className="phone-h2 md:pc-h2 text-brand mb-4">
                                        獎學金資訊平台
                                    </h3>
                                    <p className="phone-liner md:pc-liner text-muted mb-6 leading-relaxed">
                                        我們不只打造酷炫的專案，更要解決校園的真實問題。獎學金平台整合了繁雜資訊，優化申請流程，讓技術真正服務於同學。
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.2s' }}>
                                    <h4 className="phone-liner-bold md:pc-liner-bold text-heading mb-4">
                                        技術棧
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {techStack.map((tech, index) => (
                                            <span
                                                key={tech}
                                                className={`px-4 py-2 bg-brand/10 text-brand rounded-full phone-liner md:pc-liner text-sm transition-all duration-300 hover:bg-brand/20 transform hover:scale-105 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                                style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Status List */}
                                <div className="space-y-4 mb-8">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-500 ${feature.status === 'completed' ? 'bg-green-500/10' : 'bg-yellow-500/10'} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                                            style={{ transitionDelay: `${0.6 + index * 0.2}s` }}
                                        >
                                            <span className="text-2xl pt-1">{feature.icon}</span>
                                            <div>
                                                <h5 className="phone-liner-bold md:pc-liner-bold text-heading">
                                                    {feature.title}
                                                </h5>
                                                {feature.link ? (
                                                    <a
                                                        href={feature.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="phone-liner md:pc-liner text-brand hover:underline"
                                                    >
                                                        {feature.description}
                                                    </a>
                                                ) : (
                                                    <p className="phone-liner md:pc-liner text-muted">
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
                                        className="bg-heading hover:bg-brand text-background hover:text-text-on-brand px-8 py-3 rounded-lg phone-liner-bold md:pc-liner-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 group transform hover:scale-105"
                                    >
                                        <span>查看 GitHub 原始碼</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Mockup */}
                        <div className={`bg-gradient-to-br from-brand to-purple-600 p-12 flex items-center justify-center transition-all duration-1000 min-h-[480px] lg:min-h-0 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '0.3s' }}>
                            <div className="bg-surface/30 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl max-w-sm w-full">
                                {/* Mockup content */}
                                <div className="space-y-4 opacity-80">
                                    <div className="h-4 bg-white/30 rounded w-3/4"></div>
                                    <div className="h-3 bg-white/30 rounded w-full"></div>
                                    <div className="h-3 bg-white/30 rounded w-5/6"></div>
                                    <div className="bg-brand/40 rounded-lg p-4 space-y-2">
                                        <div className="h-3 bg-white/50 rounded w-2/3"></div>
                                        <div className="h-2 bg-white/40 rounded w-full"></div>
                                        <div className="h-2 bg-white/40 rounded w-4/5"></div>
                                    </div>
                                    <div className="bg-green-500/40 rounded-lg p-4 space-y-2">
                                        <div className="h-3 bg-white/50 rounded w-3/5"></div>
                                        <div className="h-2 bg-white/40 rounded w-full"></div>
                                    </div>
                                    <div className="bg-yellow-500/40 rounded-lg p-4 space-y-2">
                                        <div className="h-3 bg-white/50 rounded w-4/5"></div>
                                        <div className="h-2 bg-white/40 rounded w-3/4"></div>
                                    </div>
                                </div>

                                <div className="text-center mt-6">
                                    <div className="w-16 h-16 bg-brand rounded-full mx-auto flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-3xl">🎓</span>
                                    </div>
                                    <p className="phone-liner-bold text-white mt-2">
                                        獎學金平台
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
