'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';

export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);
    const { language } = useLanguage();
    const circumference = 2 * Math.PI * 45; // r = 45

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

    return (
        // flex-shrink-0 可防止按鈕在 flex 容器中被壓縮
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex-shrink-0">
            {/* aspect-square 可強制維持 1:1 比例，避免在手機上變形 */}
            <div className="relative w-12 h-12 aspect-square">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <defs>
                        {/*
                          定義四色漸層。
                          漸層本身是垂直的（藍 -> 紅 -> 黃 -> 綠 -> 藍），
                          但整個圓環會被旋轉 -135 度，以達成以下效果：
                          - 紅色在右上象限
                          - 黃色在右下象限
                          - 綠色在左下象限
                          - 藍色在左上象限
                        */}
                        <linearGradient id="google-quadrant-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4285f4" />   {/* Blue */}
                            <stop offset="25%" stopColor="#ea4335" />  {/* Red */}
                            <stop offset="50%" stopColor="#fbbc04" />  {/* Yellow */}
                            <stop offset="75%" stopColor="#34a853" />  {/* Green */}
                            <stop offset="100%" stopColor="#4285f4" /> {/* Blue */}
                        </linearGradient>
                    </defs>

                    {/* 背景軌道 */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="8"
                        className="text-border" // 使用中性的軌道顏色
                        stroke="currentColor"
                        fill="none"
                    />
                    
                    {/* 動畫進度環 */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="8"
                        stroke="url(#google-quadrant-gradient)"
                        fill="none"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            // 順時針填充：offset 從 circumference (空) 變為 0 (滿)
                            strokeDashoffset: circumference * (1 - progress),
                            transition: 'stroke-dashoffset 0.1s linear',
                            // 旋轉圓環以對齊各象限的顏色
                            transform: 'rotate(-135deg)',
                            transformOrigin: '50% 50%',
                        }}
                    />
                </svg>

                {/* 置中按鈕 */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label={language === 'zh' ? '回到頂端' : 'Back to top'}
                    className="
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-9 h-9 aspect-square rounded-full /* 強制 1:1 比例 */
                        flex items-center justify-center
                        shadow-lg transition-transform duration-300 hover:scale-110
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                        bg-surface/70 backdrop-blur-sm
                        text-foreground
                    "
                >
                    <ArrowUpIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}