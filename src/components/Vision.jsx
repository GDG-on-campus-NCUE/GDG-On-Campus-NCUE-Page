'use client';

import { useState, useEffect, useRef } from 'react';

export default function Vision() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

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

    const visionCards = [
        {
            title: "校園系統開發",
            description: "協助學校開發系統、維護網站，並將 AI 技術帶入校園應用。",
            icon: "💻"
        },
        {
            title: "前沿技術分享",
            description: "主持社群，將前沿技術分享給充滿熱情的技術愛好者。",
            icon: "🚀"
        },
        {
            title: "資源整合",
            description: "提供 Google 與合作夥伴的資源，並與他校社群組織合作。",
            icon: "🌐"
        }
    ];

    return (
        <section id="vision" className="py-24 px-6 bg-transparent" ref={ref}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className={`phone-h1 md:pc-h1 text-heading mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        我們的願景
                    </h2>
                    <p className={`phone-h2 md:pc-h3 text-muted max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '0.2s' }}>
                        在這裡，你的 Code 不只存在於 GitHub，更運行在校園的日常。
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {visionCards.map((card, index) => (
                        <div
                            key={index}
                            className={`bg-surface/50 backdrop-blur-lg border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl hover:shadow-brand/20 hover:-translate-y-2 transition-all duration-300 hover:border-brand group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${0.4 + index * 0.2}s` }}
                        >
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {card.icon}
                            </div>
                            <h3 className="phone-h2 md:pc-h2 text-heading mb-4">
                                {card.title}
                            </h3>
                            <p className="phone-liner md:pc-liner text-muted leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
