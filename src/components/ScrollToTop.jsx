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

    // 在淺色主題下，離開 Hero 後改用淺色樣式
    const useLightStyle = theme === 'light' && isScrolled;

    return (
        // flex-shrink-0 可防止按鈕在 flex 容器中被壓縮
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex-shrink-0">
            {/* aspect-square 可強制維持 1:1 比例，避免在手機上變形 */}
            <div className="relative w-12 h-12 aspect-square">
                {/* 彩色進度環 */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'conic-gradient(from 45deg, #ea4335, #fbbc04, #34a853, #4285f4, #ea4335)',
                        mask: 'radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px))',
                        WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px))',
                    }}
                />

                {/* 未完成區段遮罩 */}
                <div
                    className={`absolute inset-0 rounded-full ${useLightStyle ? 'bg-border' : 'bg-slate-600'}`}
                    style={{
                        '--progress': progress,
                        mask:
                            `radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px)), ` +
                            `conic-gradient(#0000 calc(var(--progress) * 360deg), #000 0)`,
                        WebkitMask:
                            `radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px)), ` +
                            `conic-gradient(#0000 calc(var(--progress) * 360deg), #000 0)`,
                    }}
                />

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