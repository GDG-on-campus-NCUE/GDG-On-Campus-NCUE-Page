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
            {/* Animated Gradient Background */}
            <div
                className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 bg-[length:200%_auto] animate-[background-pan_15s_linear_infinite]">
            </div>
            <div className="absolute inset-0 z-0 bg-black/50"></div>


            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <h1
                    className={`phone-h1 md:pc-h0 text-white mb-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={{ transitionDelay: '0.3s' }}
                >
                    Build with AI
                </h1>
                <h2
                    className={`phone-h2 md:pc-h2 text-gray-200 mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={{ transitionDelay: '0.6s' }}
                >
                    賦能每一位創造者
                </h2>

                <button
                    onClick={scrollToNext}
                    className={`bg-brand hover:bg-brand-accent text-text-on-brand px-8 py-4 rounded-lg phone-liner-bold md:pc-liner-bold transition-all duration-300 flex items-center space-x-3 mx-auto group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        } w-4/5 md:w-auto max-w-sm md:max-w-none justify-center transform hover:scale-105 hover:shadow-lg hover:shadow-brand/30`}
                    style={{ transitionDelay: '0.9s' }}
                >
                    <span>探索我們的故事</span>
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
