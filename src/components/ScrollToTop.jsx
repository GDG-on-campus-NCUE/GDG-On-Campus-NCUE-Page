'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';

export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);    // ✅ 是否顯示進度環（含淡入淡出）
    const prevYRef = useRef(0);                      // ✅ 記錄前一次滾動位置

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
        const UP_THRESHOLD = 4;          // px：過濾微小抖動
        const DOWN_THRESHOLD = 4;
        const HIDE_OFFSET = 80;          // px：向下超過此距離才隱藏
        const MOBILE_BREAKPOINT = 768;   // 與 Tailwind md 相同

        const onScroll = () => {
            const y = window.scrollY;
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const p = docH > 0 ? y / docH : 0;
            setProgress(Math.max(0, Math.min(p, 1)));

            const dy = y - prevYRef.current;
            const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

            if (isMobile) {
                // 手機版：向上顯示，向下（且已離開頂端）隱藏
                if (dy < -UP_THRESHOLD) {
                    setVisible(true);
                } else if (dy > DOWN_THRESHOLD && y > HIDE_OFFSET) {
                    setVisible(false);
                }
            } else {
                // 桌機版：始終顯示
                setVisible(true);
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
        };
    }, []);

    return (
        <div
            className={[
                'fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50',
                'transition-opacity duration-300',
                visible ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
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

                {/* 外環（彩色進度） */}
                <svg
                    className="absolute inset-0 w-full h-full"
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
