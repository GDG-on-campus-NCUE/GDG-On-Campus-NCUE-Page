'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const scrollToNext = () => {
        document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 scale-in">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                    {/* Fallback background */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-700 to-purple-800"></div>
                </video>
                {/* 50% black overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <h1
                    className={`pc-h0 md:pc-h0 phone-h1 text-white mb-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={{ transitionDelay: '0.3s' }}
                >
                    CODE THE FUTURE.
                </h1>
                <h2
                    className={`pc-h0 md:pc-h0 phone-h1 text-white mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={{ transitionDelay: '0.6s' }}
                >
                    TOGETHER.
                </h2>

                <button
                    onClick={scrollToNext}
                    className={`bg-blue-600 hover:bg-red-500 text-white px-8 py-4 rounded-lg pc-liner-bold transition-all duration-300 flex items-center space-x-3 mx-auto group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        } md:px-8 md:py-4 w-4/5 md:w-auto max-w-sm md:max-w-none justify-center`}
                    style={{ transitionDelay: '0.9s' }}
                >
                    <span>探索我們的旅程</span>
                    <svg
                        className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce">
                    <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
