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
        { icon: '✨', text: '無程式碼實作：n8n 工作坊' },
        { icon: '💬', text: '社群深度交流：跨領域連結' },
        { icon: '💻', text: '從零到一實戰：打造 Line Bot' },
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

    // 自動輪播
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % eventImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [eventImages.length]);

    return (
        <section id="events" className="py-24 px-6 bg-gray-50" ref={ref}>
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Images */}
                    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                        <div className="relative overflow-hidden rounded-2xl shadow-xl">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                            >
                                {eventImages.map((src, index) => (
                                    <div key={index} className="w-full flex-shrink-0">
                                        <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <span className="text-white text-xl font-semibold">
                                                Build with AI #{index + 1}
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
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentImage === index ? 'bg-white' : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}
                        style={{ transitionDelay: '0.3s' }}>

                        <div className="mb-6">
                            <p className="pc-liner-bold md:pc-liner-bold phone-liner-bold text-blue-600 mb-2">
                                回顧我們的「Build with AI 2025」
                            </p>
                            <h2 className="pc-h1 md:pc-h1 phone-h1 text-gray-900 mb-6 leading-tight">
                                不只是一場活動，<br />
                                而是一場技術革命的開端
                            </h2>
                            <p className="pc-liner md:pc-liner phone-liner text-gray-600 mb-8 leading-relaxed">
                                在這場精心策劃的技術盛會中，我們見證了創意與技術的完美融合，看到了同學們從零開始打造屬於自己的 AI 應用。
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-4">
                            {highlights.map((highlight, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm transition-all duration-500 hover:shadow-md hover:translate-x-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                        }`}
                                    style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
                                >
                                    <span className="text-2xl">{highlight.icon}</span>
                                    <span className="pc-liner-bold md:pc-liner-bold phone-liner-bold text-gray-800">
                                        {highlight.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className={`mt-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                            style={{ transitionDelay: '1s' }}>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg pc-liner-bold transition-all duration-300 shadow-lg hover:shadow-xl">
                                查看更多活動回顧
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
