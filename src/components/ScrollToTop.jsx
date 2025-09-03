'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';

export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);
    const { language } = useLanguage();
    const { theme } = useTheme();

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const newProgress = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(newProgress);
        };

        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);

        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, []);

    const isLightTheme = theme === 'light';

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const segmentLength = circumference / 4;

    // 校正 SVG 路徑與顏色順序，以符合視覺上的 12 點鐘起點
    // 整個 SVG 畫布被 -rotate-90 旋轉，所以：
    // - 視覺上的 12點 -> 3點 是原始 SVG 的 9點 -> 12點
    // - 視覺上的 3點 -> 6點 是原始 SVG 的 12點 -> 3點
    // - 視覺上的 6點 -> 9點 是原始 SVG 的 3點 -> 6點
    // - 視覺上的 9點 -> 12點 是原始 SVG 的 6點 -> 9點
    const segments = [
        {
            // 視覺 12點 -> 3點 (紅 -> 黃)
            id: 'grad-red-yellow',
            d: `M 4 24 A ${radius} ${radius} 0 0 1 24 4`, // 原始 9點 -> 12點 路徑
            startProgress: 0.0,
        },
        {
            // 視覺 3點 -> 6點 (黃 -> 綠)
            id: 'grad-yellow-green',
            d: `M 24 4 A ${radius} ${radius} 0 0 1 44 24`, // 原始 12點 -> 3點 路徑
            startProgress: 0.25,
        },
        {
            // 視覺 6點 -> 9點 (綠 -> 藍)
            id: 'grad-green-blue',
            d: `M 44 24 A ${radius} ${radius} 0 0 1 24 44`, // 原始 3點 -> 6點 路徑
            startProgress: 0.5,
        },
        {
            // 視覺 9點 -> 12點 (藍 -> 紅)
            id: 'grad-blue-red',
            d: `M 24 44 A ${radius} ${radius} 0 0 1 4 24`, // 原始 6點 -> 9點 路徑
            startProgress: 0.75,
        },
    ];

    return (
        //【關鍵修正】使用內聯 style 強制設定寬高為 3rem (48px)，確保 1:1 正方形
        <div
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex-shrink-0"
            style={{ width: '3rem', height: '3rem' }}
        >
            <div className="relative w-full h-full">
                <svg
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* 依照 紅->黃->綠->藍 的順序重新定義漸層 */}
                        <linearGradient id="grad-red-yellow" x1="4" y1="24" x2="24" y2="4">
                            <stop offset="0%" stopColor="#ea4335" />
                            <stop offset="100%" stopColor="#f9ab00" /> {/* 更新為正確的黃色 */}
                        </linearGradient>
                        <linearGradient id="grad-yellow-green" x1="24" y1="4" x2="44" y2="24">
                            <stop offset="0%" stopColor="#f9ab00" /> {/* 更新為正確的黃色 */}
                            <stop offset="100%" stopColor="#34a853" />
                        </linearGradient>
                        <linearGradient id="grad-green-blue" x1="44" y1="24" x2="24" y2="44">
                            <stop offset="0%" stopColor="#34a853" />
                            <stop offset="100%" stopColor="#4285f4" />
                        </linearGradient>
                        <linearGradient id="grad-blue-red" x1="24" y1="44" x2="4" y2="24">
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
                        className={isLightTheme ? 'stroke-slate-300' : 'stroke-slate-600'}
                    />

                    {/* 依捲動進度繪製的四段彩色圓弧 */}
                    {segments.map(({ id, d, startProgress }) => {
                        const progressInSegment = Math.max(0, (progress - startProgress) * 4);
                        const clampedProgress = Math.min(progressInSegment, 1);
                        return (
                            <path
                                key={id}
                                d={d}
                                stroke={`url(#${id})`}
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={segmentLength}
                                strokeDashoffset={segmentLength * (1 - clampedProgress)}
                            />
                        );
                    })}
                </svg>

                {/* 置中按鈕 */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label={language === 'zh' ? '回到頂端' : 'Back to top'}
                    className={`
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-9 h-9 aspect-square rounded-full
                        flex items-center justify-center
                        shadow-lg transition-transform duration-300 hover:scale-110
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                        ${isLightTheme ? 'bg-slate-800/70 text-white' : 'bg-slate-200/70 text-slate-900'}
                    `}
                >
                    <ArrowUpIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}