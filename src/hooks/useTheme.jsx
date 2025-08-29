'use client';

import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(null); // 初始為 null 避免閃爍
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 檢查系統偏好
        const getInitialTheme = () => {
            if (typeof window !== 'undefined') {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme) {
                    return storedTheme;
                }
                // 如果沒有儲存的主題，使用系統偏好
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            return 'light';
        };

        const initialTheme = getInitialTheme();
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
        setIsLoaded(true);
    }, []);

    const toggleTheme = useCallback(() => {
        if (!isLoaded) return; // 防止在未加載完成時切換
        
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }, [theme, isLoaded]);

    return { theme: theme || 'light', toggleTheme, isLoaded };
};
