'use client';

import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        // 從 <html> 取得目前主題，避免重新載入時閃爍
        if (typeof document !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'light';
        }
        return 'light';
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 初始化時標記為已載入，並確保 localStorage 有主題設定
        if (typeof window !== 'undefined' && !localStorage.getItem('theme')) {
            localStorage.setItem('theme', theme);
        }
        setIsLoaded(true);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        if (!isLoaded) return; // 防止在未載入完成前切換
        
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }, [theme, isLoaded]);

    return { theme: theme || 'light', toggleTheme, isLoaded };
};
