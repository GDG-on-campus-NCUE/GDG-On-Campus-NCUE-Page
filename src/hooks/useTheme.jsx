'use client';

// 使用 React Context 讓所有元件共享主題狀態
import { createContext, useContext, useState, useEffect } from 'react';

// 建立主題 Context
const ThemeContext = createContext();

// 主題提供者，固定為深色模式
export function ThemeProvider({ children }) {
    const [theme] = useState('dark'); 
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 強制設定為深色
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        setIsLoaded(true);
    }, []);

    // 移除切換功能
    const toggleTheme = () => {
        console.warn('Theme switching is disabled. Always dark mode.');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLoaded }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

