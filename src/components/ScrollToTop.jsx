'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

// 懸浮回到頂端按鈕，外圈顯示頁面滾動進度
export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);

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
                {/* 進度環背景 */}
                <div className="absolute inset-0 rounded-full border-4 border-border" />
                {/* 進度環 */}
                <div
                    className="absolute inset-0 rounded-full text-brand"
                    style={{
                        background: `conic-gradient(from -90deg, currentColor ${progress * 100}%, transparent 0)`,
                        WebkitMask: 'radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 calc(100% - 4px))',
                        mask: 'radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 calc(100% - 4px))',
                    }}
                />
                {/* 回到頂端按鈕 */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="回到頂端"
                    className="absolute inset-0 m-2 rounded-full bg-brand text-text-on-brand flex items-center justify-center shadow-lg shadow-brand/30 transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                    <ArrowUpIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

