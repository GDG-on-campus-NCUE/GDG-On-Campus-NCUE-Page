'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import assemblyGif from '@/images/stickers/assembly.gif';
import sliderGif from '@/images/stickers/slider.gif';


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
                className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-600 bg-[length:200%_auto] animate-[background-pan_15s_linear_infinite]">
            </div>
            
            {/* GDG Assembly GIF Background Elements */}
            <div className="absolute inset-0 z-5 opacity-40 pointer-events-none">
                {/* Large Central Background Element */}
                <Image
                    src={assemblyGif}
                    alt=""
                    width={320}
                    height={320}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 object-contain opacity-20 float-animation"
                    style={{ animationDelay: '0.5s' }}
                />
                {/* Top Left */}
                <Image
                    src={assemblyGif}
                    alt=""
                    width={96}
                    height={96}
                    className="absolute top-16 left-8 w-24 h-24 md:w-32 md:h-32 object-contain float-animation"
                />
                {/* Top Right */}
                <Image
                    src={assemblyGif}
                    alt=""
                    width={80}
                    height={80}
                    className="absolute top-20 right-12 w-20 h-20 md:w-28 md:h-28 object-contain float-animation-reverse"
                    style={{ animationDelay: '1s' }}
                />
                {/* Bottom Left */}
                <Image
                    src={assemblyGif}
                    alt=""
                    width={64}
                    height={64}
                    className="absolute bottom-32 left-16 w-16 h-16 md:w-24 md:h-24 object-contain float-animation"
                    style={{ animationDelay: '2s' }}
                />
                {/* Bottom Right */}
                <Image
                    src={assemblyGif}
                    alt=""
                    width={112}
                    height={112}
                    className="absolute bottom-24 right-8 w-28 h-28 md:w-36 md:h-36 object-contain float-animation-reverse"
                    style={{ animationDelay: '0.5s' }}
                />
                {/* Center subtle ones */}
                <Image
                    src={assemblyGif}
                    alt=""
                    width={48}
                    height={48}
                    className="absolute top-1/3 left-1/4 w-12 h-12 md:w-16 md:h-16 object-contain float-animation opacity-60"
                    style={{ animationDelay: '1.5s' }}
                />
                <Image
                    src={assemblyGif}
                    alt=""
                    width={56}
                    height={56}
                    className="absolute top-2/3 right-1/4 w-14 h-14 md:w-20 md:h-20 object-contain float-animation-reverse opacity-60"
                    style={{ animationDelay: '2.5s' }}
                />
            </div>
            
            <div className="absolute inset-0 z-8 bg-black/40"></div>


            {/* Content */}
            <div className="relative z-20 text-center px-4 md:px-6">
                <h1
                    className={`mb-6 transition-all duration-1000 drop-shadow-lg leading-tight ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={{ 
                        fontSize: 'clamp(3rem, 8vw, 8rem)',
                        fontWeight: '700',
                        fontFamily: 'var(--font-source-sans)',
                        background: 'linear-gradient(135deg, #4285f4 0%, #34a853 25%, #fbbc04 50%, #ea4335 75%, #4285f4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        backgroundSize: '300% 300%',
                        animation: 'gradient-shift 8s ease infinite',
                        textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        transitionDelay: '0.3s'
                    }}
                >
                    Build with AI
                </h1>
                <h2
                    className={`mb-8 md:mb-10 transition-all duration-1000 drop-shadow-md leading-relaxed ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={{ 
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        fontWeight: '600',
                        fontFamily: 'var(--font-source-sans)',
                        background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        transitionDelay: '0.6s'
                    }}
                >
                    Go Fast Alone, Go Far Together
                </h2>

                <button
                    onClick={scrollToNext}
                    className={`bg-brand hover:bg-brand-accent text-white px-6 py-4 md:px-12 md:py-6 rounded-xl phone-liner-bold md:pc-liner-bold transition-all duration-300 flex items-center space-x-3 md:space-x-5 mx-auto group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        } w-full max-w-xs md:max-w-sm lg:w-auto lg:max-w-none justify-center transform hover:scale-105 hover:shadow-lg hover:shadow-brand/40 shadow-xl`}
                    style={{ transitionDelay: '0.9s' }}
                >
                    <Image
                        src={sliderGif}
                        alt=""
                        width={48}
                        height={48}
                        className="w-12 h-12 md:w-20 md:h-20 object-contain"
                    />
                    <span className="text-lg md:text-2xl font-bold text-white">探索我們的故事</span>
                    <svg
                        className="w-5 h-5 md:w-7 md:h-7 group-hover:translate-y-1 transition-transform duration-300 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="animate-bounce">
                    <svg className="w-6 h-6 text-white opacity-70 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
