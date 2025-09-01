'use client';

// 語言切換 Hook 與 Context
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 建立語言 Context
const LanguageContext = createContext();

// 語言提供者
export function LanguageProvider({ children }) {
    // 預設語言為中文
    const [language, setLanguage] = useState('zh');
    const [isLoaded, setIsLoaded] = useState(false); // 是否已載入

    useEffect(() => {
        // 讀取 localStorage 中的語言設定
        const stored = localStorage.getItem('language');
        setLanguage(stored || 'zh');
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        // 根據語言設定 html 的 lang 屬性
        document.documentElement.setAttribute('lang', language === 'zh' ? 'zh-TW' : 'en');
    }, [language, isLoaded]);

    // 切換語言
    const toggleLanguage = useCallback(() => {
        if (!isLoaded) return; // 尚未載入時不進行切換
        const newLang = language === 'zh' ? 'en' : 'zh';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    }, [language, isLoaded]);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, isLoaded }}>
            {children}
        </LanguageContext.Provider>
    );
}

// 使用語言 Context 的自訂 Hook
export function useLanguage() {
    return useContext(LanguageContext);
}

