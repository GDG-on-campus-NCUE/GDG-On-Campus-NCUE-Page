'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';

export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false); // 追蹤是否離開頂部
    const { language } = useLanguage();
    const { theme } = useTheme();

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const newProgress = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(newProgress);
            setIsScrolled(scrollTop > 10); // 檢查是否已經捲動離開頂部
        };

        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);

        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, []);

    // 在淺色主題下，未捲動前保持深色樣式，捲動後改用淺色樣式
    const useLightStyle = theme === 'light' && isScrolled;

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
                    {/* 背景圓環 */}
                    <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        strokeWidth="4"
                        fill="none"
                        className={useLightStyle ? 'stroke-border' : 'stroke-slate-600'}
                    />

                    {/* 依捲動進度繪製的彩色圓周 */}
                    {[
                        { color: '#ea4335', start: 0 }, // 紅：第一象限
                        { color: '#fbbc04', start: 0.25 }, // 黃：第四象限
                        { color: '#34a853', start: 0.5 }, // 綠：第三象限
                        { color: '#4285f4', start: 0.75 }, // 藍：第二象限
                    ].map(({ color, start }) => {
                        const segment = 0.25; // 每一象限所占的比例
                        const progressInSegment = Math.min(
                            Math.max(progress - start, 0),
                            segment,
                        );

                        return (
                            <circle
                                key={color}
                                cx="24"
                                cy="24"
                                r={radius}
                                stroke={color}
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${progressInSegment * circumference} ${circumference}`}
                                strokeDashoffset={
                                    circumference * (1 - start - progressInSegment)
                                }
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
                        backdrop-blur-sm
                        ${useLightStyle ? 'bg-surface/70 text-foreground' : 'bg-slate-800/70 text-white'}
                    `}
                >
                    <ArrowUpIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
