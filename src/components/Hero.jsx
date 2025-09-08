'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import Image from 'next/image';
import sliderGif from '@/images/stickers/slider.gif';
import MatrixBackground from './MatrixBackground';

// 為了讓背景動畫顯示的程式碼
const heroComponentCode = `
'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import Image from 'next/image';
import assemblyGif from '@/images/stickers/assembly.gif';
import sliderGif from '@/images/stickers/slider.gif';

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);
    // 用於控制按鈕切換延遲的狀態
    const [buttonDelay, setButtonDelay] = useState('0.9s');
    const { language } = useLanguage();
    const { theme } = useTheme();

    useEffect(() => {
        setIsLoaded(true);
        // 一秒後移除延遲，避免切換主題時速度過慢
        const timer = setTimeout(() => setButtonDelay('0s'), 1000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToNext = () => {
        document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' });
    };

    const titleStyle = {
        fontSize: 'clamp(3rem, 8vw, 8rem)',
        fontWeight: '700',
        fontFamily: 'var(--font-source-sans)',
        backgroundImage: 'linear-gradient(135deg, #4285f4 0%, #34a853 25%, #fbbc04 50%, #ea4335 75%, #4285f4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        backgroundSize: '300% 300%',
        animation: 'gradient-shift 8s ease infinite',
        textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        transitionDelay: '0.3s'
    };

    const subtitleStyle = {
        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
        fontWeight: '600',
        fontFamily: 'var(--font-source-sans)',
        color: theme === 'light' ? '#334155' : '#ffffff',
        textShadow: theme === 'light' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.2)',
        transitionDelay: '0.6s'
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* ... Content ... */}
        </section>
    );
}
`;


export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);
    // 用於控制按鈕切換延遲的狀態
    const [buttonDelay, setButtonDelay] = useState('0.9s');
    const { language } = useLanguage();
    const { theme } = useTheme();

    useEffect(() => {
        setIsLoaded(true);
        // 一秒後移除延遲，避免切換主題時速度過慢
        const timer = setTimeout(() => setButtonDelay('0s'), 1000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToNext = () => {
        document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' });
    };

    // 彩虹漸層標題樣式
    const titleStyle = {
        fontSize: 'clamp(3rem, 8vw, 8rem)',
        fontWeight: '700',
        fontFamily: 'var(--font-source-sans)',
        backgroundImage: 'linear-gradient(135deg, #4285f4 0%, #34a853 25%, #fbbc04 50%, #ea4335 75%, #4285f4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        backgroundSize: '300% 300%',
        animation: 'gradient-shift 8s ease infinite',
        textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        transitionDelay: '0.3s'
    };

    // 副標題樣式，顏色會適應主題
    const subtitleStyle = {
        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
        fontWeight: '600',
        fontFamily: 'var(--font-source-sans)',
        color: theme === 'light' ? '#334155' : '#ffffff',
        textShadow: theme === 'light' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.2)',
        transitionDelay: '0.6s'
    };


    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* 背景元件：不再需要傳遞 theme prop */}
            <MatrixBackground codeString={heroComponentCode} />

            {/* 遮罩層：僅在深色主題下提供黑色半透明遮罩，淺色主題不套用模糊遮罩 */}
            {theme === 'dark' && (
                // 深色主題下的遮罩層，確保位於背景與內容之間
                <div className="absolute inset-0 z-10 bg-black/60"></div>
            )}

            {/* 前景內容 */}
            <div className="relative z-20 text-center px-4 md:px-6">
                <h1
                    className={`mb-6 transition-all duration-1000 leading-tight ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={titleStyle}
                >
                    Build with AI
                </h1>
                <h2
                    className={`mb-8 md:mb-10 transition-all duration-1000 leading-relaxed ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    style={subtitleStyle}
                >
                    Go Fast Alone, Go Far Together
                </h2>

                <button
                    onClick={scrollToNext}
                    className={`px-6 py-4 md:px-12 md:py-6 rounded-xl phone-liner-bold md:pc-liner-bold transition-all duration-200 flex items-center space-x-3 md:space-x-5 mx-auto group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} w-full max-w-xs md:max-w-sm lg:w-auto lg:max-w-none justify-center transform hover:scale-105 shadow-xl focus:outline-none focus-visible:outline-none border border-transparent
                        ${theme === 'light'
                            ? 'bg-white/70 backdrop-blur-sm border-slate-300/80 hover:shadow-lg'
                            : 'bg-brand hover:bg-brand-accent text-white hover:shadow-lg hover:shadow-brand/40'
                        }`}
                    style={{ transitionDelay: buttonDelay }}
                >
                    <Image
                        src={sliderGif}
                        alt="Scroll down"
                        width={48}
                        height={48}
                        className="w-12 h-12 md:w-20 md:h-20 object-contain"
                        draggable={false}
                    />
                    <span className={`text-lg md:text-2xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
                        {language === 'zh' ? '探索我們的故事' : 'Explore Our Story'}
                    </span>
                    <svg
                        className={`w-5 h-5 md:w-7 md:h-7 group-hover:translate-y-1 transition-transform duration-300 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            </div>

            {/* 向下滾動提示 */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="animate-bounce">
                    <svg className={`w-6 h-6 opacity-70 drop-shadow-lg ${theme === 'light' ? 'text-slate-600' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}