'use client';

// 主題 Context 及提供器，讓全站元件能共享主題狀態
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 建立 Context
const ThemeContext = createContext();

// 主題提供器，包裹在最外層以共享狀態
export function ThemeProvider({ children }) {
    // 使用 null 作為初始值避免水合時閃爍
    const [theme, setTheme] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // 初始化主題，優先使用 localStorage，其次使用系統偏好
    useEffect(() => {
        const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
        setIsLoaded(true);
    }, []);

    // 切換主題並同步到 localStorage 與 html 屬性
    const toggleTheme = useCallback(() => {
        if (!isLoaded) return; // 尚未載入完成時不允許切換

        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }, [theme, isLoaded]);

    return (
        <ThemeContext.Provider value={{ theme: theme || 'light', toggleTheme, isLoaded }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 自訂 Hook，讓元件可讀取或切換主題
export const useTheme = () => {
    return useContext(ThemeContext);
};

