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
            title: '已上線',
            description: 'scholarship.ncuesa.org.tw',
            link: 'https://scholarship.ncuesa.org.tw'
        },
        {
            status: 'planning',
            icon: '💡',
            title: '規劃中',
            description: '宿舍退宿、餐券、投票系統'
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" className="py-24 px-6 bg-gray-50" ref={ref}>
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">

                        {/* Left: Content */}
                        <div className="p-12 lg:p-16">
                            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}>
                                <h2 className="pc-h1 md:pc-h1 phone-h1 text-gray-900 mb-6 leading-tight">
                                    你的 Code，<br />
                                    運行在校園日常
                                </h2>

                                <div className="mb-8">
                                    <h3 className="pc-h2 md:pc-h2 phone-h2 text-blue-600 mb-4">
                                        彰師大獎學金資訊平台
                                    </h3>
                                    <p className="pc-liner md:pc-liner phone-liner text-gray-600 mb-6 leading-relaxed">
                                        整合繁雜的獎學金資訊，優化申請流程，讓同學們能夠更輕鬆地找到適合的獎學金機會。從設計到開發，我們用技術解決真實的校園需求。
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}
                                    style={{ transitionDelay: '0.3s' }}>
                                    <h4 className="pc-liner-bold md:pc-liner-bold phone-liner-bold text-gray-800 mb-4">
                                        技術棧
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {techStack.map((tech, index) => (
                                            <span
                                                key={tech}
                                                className={`px-4 py-2 bg-blue-100 text-blue-800 rounded-full pc-liner text-sm transition-all duration-300 hover:bg-blue-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                                    }`}
                                                style={{ transitionDelay: `${0.5 + index * 0.1}s` }}
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
                                            className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-500 hover:bg-gray-50 ${feature.status === 'completed' ? 'bg-green-50' : 'bg-yellow-50'
                                                } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                                            style={{ transitionDelay: `${0.7 + index * 0.2}s` }}
                                        >
                                            <span className="text-2xl">{feature.icon}</span>
                                            <div>
                                                <h5 className="pc-liner-bold md:pc-liner-bold phone-liner-bold text-gray-800">
                                                    {feature.title}
                                                </h5>
                                                {feature.link ? (
                                                    <a
                                                        href={feature.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pc-liner md:pc-liner phone-liner text-blue-600 hover:text-blue-800 underline"
                                                    >
                                                        {feature.description}
                                                    </a>
                                                ) : (
                                                    <p className="pc-liner md:pc-liner phone-liner text-gray-600">
                                                        {feature.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}
                                    style={{ transitionDelay: '1.1s' }}>
                                    <button className="bg-gray-900 hover:bg-blue-600 text-white px-8 py-3 rounded-lg pc-liner-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 group">
                                        <span>查看 GitHub 原始碼</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Mockup */}
                        <div className={`bg-gradient-to-br from-blue-500 to-purple-600 p-12 flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                            }`}
                            style={{ transitionDelay: '0.5s' }}>
                            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full">
                                {/* Mockup content */}
                                <div className="space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                    <div className="bg-blue-100 rounded-lg p-4 space-y-2">
                                        <div className="h-3 bg-blue-300 rounded w-2/3"></div>
                                        <div className="h-2 bg-blue-200 rounded w-full"></div>
                                        <div className="h-2 bg-blue-200 rounded w-4/5"></div>
                                    </div>
                                    <div className="bg-green-100 rounded-lg p-4 space-y-2">
                                        <div className="h-3 bg-green-300 rounded w-3/5"></div>
                                        <div className="h-2 bg-green-200 rounded w-full"></div>
                                    </div>
                                    <div className="bg-yellow-100 rounded-lg p-4 space-y-2">
                                        <div className="h-3 bg-yellow-300 rounded w-4/5"></div>
                                        <div className="h-2 bg-yellow-200 rounded w-3/4"></div>
                                    </div>
                                </div>

                                <div className="text-center mt-6">
                                    <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">🎓</span>
                                    </div>
                                    <p className="phone-liner-bold text-gray-600 mt-2">
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
