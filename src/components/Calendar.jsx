'use client';

// 行事曆區塊，嵌入 Google Calendar，支援亮暗色主題與 RWD
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';

export default function Calendar() {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const { language } = useLanguage();
    const { theme } = useTheme();

    // 進入視窗時啟用淡入效果
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    // Google Calendar 來源網址，固定以亮色載入以便暗色主題時進行反轉
    const calendarSrc =
        'https://calendar.google.com/calendar/embed?src=c_c9a15fa8927d18cb8a0729ce86aa1801a579a04d11368df860950c15f6c04af4%40group.calendar.google.com&ctz=Asia%2FTaipei&bgcolor=%23ffffff';

    return (
        <section id="calendar" className="bg-surface-muted py-20 md:py-32 px-4 md:px-6" ref={ref}>
            <div className={`max-w-5xl mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="phone-h1 md:pc-h2 text-heading text-center mb-8">
                    {language === 'zh' ? '行事曆' : 'Calendar'}
                </h2>
                <div className="rounded-xl overflow-hidden shadow-lg border border-border relative">
                    <iframe
                        src={calendarSrc}
                        className="w-full h-[500px] md:h-[700px]"
                        /* 暗色主題時套用 CSS 濾鏡反轉色彩 */
                        style={{ filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : undefined }}
                        frameBorder="0"
                        scrolling="no"
                    />
                </div>
            </div>
        </section>
    );
}

