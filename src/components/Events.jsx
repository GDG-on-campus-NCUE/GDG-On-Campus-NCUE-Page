'use client';

import { useState, useEffect, useRef } from 'react';

export default function Events() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const ref = useRef(null);

    // 輪播圖片 (實際使用時替換為真實圖片路徑)
    const eventImages = [
        '/api/placeholder/600/400', // Build with AI #2 活動照片
        '/api/placeholder/600/400', // 工作坊現場
        '/api/placeholder/600/400', // 參與者交流
        '/api/placeholder/600/400', // 技術分享
        '/api/placeholder/600/400', // 成果展示
    ];

    const highlights = [
        { icon: '🤖', text: 'n8n 工作坊：親手打造自動化 Line Bot' },
        { icon: '💡', text: '提示工程：從零到一啟動 AI 原力' },
        { icon: '🔥', text: '社群火花：點燃對技術的熱情與潛能' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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

    // Auto-carousel
    useEffect(() => {
        if (eventImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % eventImages.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [eventImages.length]);

    return (
        <section id="events" className="py-24 px-6 bg-transparent" ref={ref}>
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Images */}
                    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-w-4 aspect-h-3 bg-surface/30 backdrop-blur-lg border border-border">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                            >
                                {eventImages.map((src, index) => (
                                    <div key={index} className="w-full flex-shrink-0">
                                        <div className="w-full h-full bg-gradient-to-br from-brand/70 to-purple-600/70 flex items-center justify-center">
                                            {/* Placeholder text, will be replaced by actual images */}
                                            <span className="text-white text-2xl font-semibold opacity-80">
                                                Build with AI Event #{index + 1}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Image indicators */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {eventImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImage(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentImage === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '0.2s' }}>
                        <div className="mb-6">
                            <p className="phone-liner-bold md:pc-liner-bold text-brand mb-2">
                                回顧我們的「Build with AI 2025」
                            </p>
                            <h2 className="phone-h1 md:pc-h1 text-heading mb-6 leading-tight">
                                不只是一場活動，<br />
                                而是一場技術革命的開端。
                            </h2>
                            <p className="phone-liner md:pc-liner text-muted mb-8 leading-relaxed">
                                我們將 AI 的力量帶入校園，打破技術壁壘，引導每位參與者從零到一啟動自己的 AI 原力。透過無程式碼的 n8n 工作坊，現場夥伴都親手打造出能解決實際問題的自動化 Line 聊天機器人。
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-4">
                            {highlights.map((highlight, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center space-x-4 p-4 bg-surface/50 backdrop-blur-lg border border-border rounded-xl shadow-sm transition-all duration-500 hover:shadow-md hover:border-brand transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                    style={{ transitionDelay: `${0.5 + index * 0.15}s` }}
                                >
                                    <span className="text-2xl">{highlight.icon}</span>
                                    <span className="phone-liner-bold md:pc-liner-bold text-heading">
                                        {highlight.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
