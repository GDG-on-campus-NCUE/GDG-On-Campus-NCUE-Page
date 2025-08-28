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
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const visionCards = [
        {
            title: "校園技術賦能",
            description: "協助開發與維護校園系統，引入 AI 技術優化學習與生活體驗，讓科技真正服務校園社群。",
            icon: "💻"
        },
        {
            title: "技術社群驅動",
            description: "舉辦分享會與工作坊，營造濃厚的學習氛圍，讓每位成員都能在技術路上持續成長。",
            icon: "🚀"
        },
        {
            title: "資源整合平台",
            description: "串連 Google 與他校資源，提供豐富的合作機會，打造更廣闊的學習與發展平台。",
            icon: "🌐"
        }
    ];

    return (
        <section id="vision" className="py-24 px-6" ref={ref}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className={`pc-h1 md:pc-h1 phone-h1 text-gray-900 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        連結開發者，共創校園新未來
                    </h2>
                    <p className={`pc-h3 md:pc-h3 phone-h2 text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: '0.2s' }}>
                        我們是連結開發者、啟發創意、共創未來的技術社群。在這裡，每一行程式碼都承載著改變的力量，每一次交流都可能點燃創新的火花。
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {visionCards.map((card, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-transparent hover:border-blue-600 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${0.4 + index * 0.2}s` }}
                        >
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {card.icon}
                            </div>
                            <h3 className="pc-h2 md:pc-h2 phone-h2 text-gray-900 mb-4">
                                {card.title}
                            </h3>
                            <p className="pc-liner md:pc-liner phone-liner text-gray-600 leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '1s' }}>
                    <p className="pc-liner-bold md:pc-liner-bold phone-liner-bold text-gray-700">
                        準備好與我們一起打造更美好的校園未來了嗎？
                    </p>
                </div>
            </div>
        </section>
    );
}
