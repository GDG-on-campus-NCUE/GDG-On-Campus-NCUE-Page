'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';

// 懸浮回到頂端按鈕，外圈顯示頁面滾動進度
export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);
    const { language } = useLanguage();

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

    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - progress * circumference;

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
            <div className="relative w-14 h-14">
                {/* 外部進度環 */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        strokeWidth="4"
                        className="text-border stroke-current"
                        fill="transparent"
                    />
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="text-brand stroke-current"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                    />
                </svg>
                {/* 內部回頂按鈕 */}
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

