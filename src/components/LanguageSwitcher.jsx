'use client';

// 語言切換按鈕
import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageSwitcher({ colorClass }) {
    const { language, toggleLanguage, isLoaded } = useLanguage();

    // 未載入時顯示佔位符避免閃爍
    if (!isLoaded) {
        return <div className="p-2 w-16 h-9 rounded-full"></div>;
    }

    const buttonColorClass = colorClass || 'text-foreground hover:text-brand';

    return (
        <button
            onClick={toggleLanguage}
            className={`px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:bg-surface-muted/30 hover:shadow-md ${buttonColorClass}`}
            aria-label="切換語言"
        >
            <span className="text-sm font-bold">
                <span className={language === 'zh' ? 'text-brand' : ''}>中</span>
                <span className="mx-1">/</span>
                <span className={language === 'en' ? 'text-brand' : ''}>Eng</span>
            </span>
        </button>
    );
}

