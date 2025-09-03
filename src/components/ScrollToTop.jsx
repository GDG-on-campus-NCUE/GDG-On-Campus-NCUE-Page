'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';

export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);
    const [showRing, setShowRing] = useState(false);
    const prevYRef = useRef(0);
    const hideTimer = useRef < number | null > (null);

    const { language } = useLanguage();
    const { theme } = useTheme();
    const isLightTheme = theme === 'light';

    // 幾何
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const segmentLength = circumference / 4;

    // 四段（12 點開始、順時鐘）
    const segments = [
        { id: 'grad-red-yellow', d: `M 24 4  A ${radius} ${radius} 0 0 1 44 24`, start: 0.00 },
        { id: 'grad-yellow-green', d: `M 44 24 A ${radius} ${radius} 0 0 1 24 44`, start: 0.25 },
        { id: 'grad-green-blue', d: `M 24 44 A ${radius} ${radius} 0 0 1 4  24`, start: 0.50 },
        { id: 'grad-blue-red', d: `M 4  24 A ${radius} ${radius} 0 0 1 24 4`, start: 0.75 },
    ];

    useEffect(() => {
        const UP_THRESHOLD = 4;     // px，避免微小抖動
        const DOWN_THRESHOLD = 4;   // px
        const HIDE_AFTER_MS = 320;  // 往上滾停止後延遲淡出

        const onScroll = () => {
            const y = window.scrollY;
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const p = docH > 0 ? y / docH : 0;
            setProgress(Math.max(0, Math.min(p, 1)));

            const dy = y - prevYRef.current;

            // 只在「實際向上」且不在頂端時顯示
            if (dy < -UP_THRESHOLD && y > 0) {
                if (!showRing) setShowRing(true);
                if (hideTimer.current) window.clearTimeout(hideTimer.current);
                hideTimer.current = window.setTimeout(() => setShowRing(false), HIDE_AFTER_MS);
            } else if (dy > DOWN_THRESHOLD) {
                // 向下立即隱藏
                if (showRing) setShowRing(false);
                if (hideTimer.current) {
                    window.clearTimeout(hideTimer.current);
                    hideTimer.current = null;
                }
            } else if (y <= 0 && showRing) {
                // 到頂時確保隱藏
                setShowRing(false);
            }

            prevYRef.current = y;
        };

        prevYRef.current = window.scrollY;
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (hideTimer.current) window.clearTimeout(hideTimer.current);
        };
    }, [showRing]);

    return (
        <div
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
            style={{ width: '3.25rem', height: '3.25rem' }}
        >
            <div className="relative w-full h-full aspect-square">
                {/* 中央按鈕：正圓鋪滿，位於外環下方 */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label={language === 'zh' ? '回到頂端' : 'Back to top'}
                    className={[
                        'absolute inset-0 rounded-full flex items-center justify-center',
                        'shadow-lg transition-transform duration-300 hover:scale-110',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                        isLightTheme
                            ? 'bg-slate-200/90 text-slate-900 focus-visible:ring-slate-800'
                            : 'bg-slate-800/85 text-white focus-visible:ring-slate-200',
                    ].join(' ')}
                    style={{ lineHeight: 0, zIndex: 0 }}
                >
                    <ArrowUpIcon className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* 進度外環：只在「往上滾動」時顯示（淡入/淡出） */}
                <svg
                    className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${showRing ? 'opacity-100' : 'opacity-0'}`}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ pointerEvents: 'none', zIndex: 10 }}
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="grad-red-yellow" x1="24" y1="4" x2="44" y2="24" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#ea4335" />
                            <stop offset="100%" stopColor="#f9ab00" />
                        </linearGradient>
                        <linearGradient id="grad-yellow-green" x1="44" y1="24" x2="24" y2="44" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#f9ab00" />
                            <stop offset="100%" stopColor="#34a853" />
                        </linearGradient>
                        <linearGradient id="grad-green-blue" x1="24" y1="44" x2="4" y2="24" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#34a853" />
                            <stop offset="100%" stopColor="#4285f4" />
                        </linearGradient>
                        <linearGradient id="grad-blue-red" x1="4" y1="24" x2="24" y2="4" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#4285f4" />
                            <stop offset="100%" stopColor="#ea4335" />
                        </linearGradient>
                    </defs>

                    {/* 背景圓環 */}
                    <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        strokeWidth="4"
                        fill="none"
                        className={isLightTheme ? 'stroke-slate-300' : 'stroke-slate-700'}
                    />

                    {/* 彩色進度：未到該段不渲染，避免頂部四色點 */}
                    {segments.map(({ id, d, start }) => {
                        const segProgress = (progress - start) * 4; // 0~1
                        if (segProgress <= 0) return null;
                        const clamped = Math.min(segProgress, 1);
                        return (
                            <path
                                key={id}
                                d={d}
                                stroke={`url(#${id})`}
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                pathLength={segmentLength}
                                strokeDasharray={segmentLength}
                                strokeDashoffset={segmentLength * (1 - clamped)}
                            />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
