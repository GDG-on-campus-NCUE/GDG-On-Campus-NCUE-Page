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

    // 根據主題切換背景與前景顏色
    const isLightTheme = theme === 'light';

    // SVG 圓環的半徑與周長，用於計算進度
    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    return (
        // flex-shrink-0 可防止按鈕在 flex 容器中被壓縮
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex-shrink-0">
            {/* aspect-square 可強制維持 1:1 比例，避免在手機上變形 */}
            <div className="relative w-12 h-12 aspect-square">
                {/* 使用 SVG 建立圓形進度環，避免手機瀏覽器變形問題 */}
                <svg
                    className="absolute inset-0 -rotate-90 w-full h-full"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* 定義圓周漸層，依照 Google 四原色排列 */}
                    <defs>
                        {/* 紅 ➜ 黃 */}
                        <linearGradient
                            id="grad1"
                            x1="24"
                            y1="4"
                            x2="44"
                            y2="24"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="#ea4335" />
                            <stop offset="100%" stopColor="#fbbc04" />
                        </linearGradient>
                        {/* 黃 ➜ 綠 */}
                        <linearGradient
                            id="grad2"
                            x1="44"
                            y1="24"
                            x2="24"
                            y2="44"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="#fbbc04" />
                            <stop offset="100%" stopColor="#34a853" />
                        </linearGradient>
                        {/* 綠 ➜ 藍 */}
                        <linearGradient
                            id="grad3"
                            x1="24"
                            y1="44"
                            x2="4"
                            y2="24"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="#34a853" />
                            <stop offset="100%" stopColor="#4285f4" />
                        </linearGradient>
                        {/* 藍 ➜ 紅 */}
                        <linearGradient
                            id="grad4"
                            x1="4"
                            y1="24"
                            x2="24"
                            y2="4"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="#4285f4" />
                            <stop offset="100%" stopColor="#ea4335" />
                        </linearGradient>
                    </defs>

                    {/* 背景圓環，依主題切換深淺 */}
                    <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        strokeWidth="4"
                        fill="none"
                        className={isLightTheme ? 'stroke-slate-600' : 'stroke-slate-300'}
                    />

                    {/* 依捲動進度繪製的彩色圓周，漸層銜接四原色 */}
                    {[
                        { id: 'grad1', start: 0 }, // 紅 ➜ 黃
                        { id: 'grad2', start: 0.25 }, // 黃 ➜ 綠
                        { id: 'grad3', start: 0.5 }, // 綠 ➜ 藍
                        { id: 'grad4', start: 0.75 }, // 藍 ➜ 紅
                    ].map(({ id, start }) => {
                        const segment = 0.25; // 每一象限所占的比例
                        const progressInSegment = Math.min(
                            Math.max(progress - start, 0),
                            segment,
                        );

                        return (
                            <circle
                                key={id}
                                cx="24"
                                cy="24"
                                r={radius}
                                stroke={`url(#${id})`}
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${progressInSegment * circumference} ${circumference}`}
                                strokeDashoffset={circumference * (1 - start)}
                                strokeLinecap="round"
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
