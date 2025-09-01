'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';

// 懸浮回到頂端按鈕，外圈顯示頁面滾動進度
export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);
    const { language } = useLanguage();
    const { theme } = useTheme();

    useEffect(() => {
        // 計算頁面滾動百分比
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const newProgress = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(newProgress);
        };

        updateProgress();
        window.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);
        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, []);

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
            <div className="relative w-14 h-14">
                {/* 使用 SVG 繪製圓周進度環 */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* 背景圓環：亮色主題使用較深色避免不明顯 */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="8"
                        className={theme === 'light' ? 'text-muted' : 'text-border'}
                        stroke="currentColor"
                        fill="none"
                    />
                    {/* 進度圓環，改用醒目的強調色避免與背景混淆 */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="8"
                        className="text-accent"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: 2 * Math.PI * 45,
                            strokeDashoffset: (1 - progress) * 2 * Math.PI * 45,
                            transition: 'stroke-dashoffset 0.2s ease-out',
                        }}
                    />
                </svg>
                {/* 回到頂端按鈕 */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label={language === 'zh' ? '回到頂端' : 'Back to top'}
                    className="absolute inset-0 m-2 rounded-full bg-brand text-text-on-brand flex items-center justify-center shadow-lg shadow-brand/30 transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                    <ArrowUpIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

