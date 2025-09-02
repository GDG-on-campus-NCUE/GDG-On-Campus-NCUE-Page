'use client';

// 主題切換 Hook 與 Context
// 使用 React Context 讓所有元件共享主題狀態
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 建立主題 Context
const ThemeContext = createContext();

// 主題提供者，負責管理主題狀態
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light'); // 預設為淺色主題
    const [isLoaded, setIsLoaded] = useState(false); // 是否已載入完成

    useEffect(() => {
        // 讀取本地儲存或系統偏好的主題設定
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
        setIsLoaded(true);
    }, []);

    // 切換主題
    const toggleTheme = useCallback(() => {
        if (!isLoaded) return; // 尚未載入時不進行切換

        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }, [theme, isLoaded]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLoaded }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 使用主題 Context 的自訂 Hook
export function useTheme() {
    return useContext(ThemeContext);
}

