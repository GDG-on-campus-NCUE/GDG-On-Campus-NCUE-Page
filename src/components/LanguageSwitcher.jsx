'use client';

// 語言切換按鈕
import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageSwitcher({ colorClass }) {
    const { language, toggleLanguage, isLoaded } = useLanguage();

    // 未載入時顯示佔位符避免閃爍
    if (!isLoaded) {
        return <div className="p-2 w-9 h-9 rounded-full"></div>;
    }

    const buttonColorClass = colorClass || 'text-foreground hover:text-brand';

    return (
        <button
            onClick={toggleLanguage}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-surface-muted/30 hover:shadow-md ${buttonColorClass}`}
            aria-label="Toggle language"
        >
            <span className="text-sm font-bold">
                {language === 'zh' ? 'EN' : '中'}
            </span>
        </button>
    );
}

