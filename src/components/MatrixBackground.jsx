'use client';

import { useRef, useEffect } from 'react';

// 這一版我們將還原您最喜歡的早期風格，同時保留主題切換功能
const MatrixBackground = ({ codeString }) => { 
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!codeString) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // 保留：從 CSS 讀取顏色，這是實現動態主題切換的關鍵
        const getThemeColors = () => {
            const styles = getComputedStyle(document.documentElement);
            return {
                background: styles.getPropertyValue('--matrix-bg').trim(),
                head: styles.getPropertyValue('--matrix-head').trim(),
                default: styles.getPropertyValue('--matrix-default').trim(),
                brackets: styles.getPropertyValue('--matrix-brackets').trim(),
            };
        };

        const codeChars = codeString.replace(/\s/g, '');
        const codeLength = codeChars.length;

        // === 還原：使用早期版本的視覺參數 ===
        const fontSize = 14; 
        const speed = 18; // 大幅提升速度，接近早期版本 drop.y += fontSize 的效果

        // === 折衷：保留微小的水平間距，防止字元完全重疊 ===
        const columnWidth = fontSize + 4; // 僅保留 4px 間距，增加密度

        let columns = 0;
        let rainDrops = [];

        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            columns = Math.floor(canvas.width / columnWidth);

            rainDrops = Array.from({ length: columns }).map(() => ({
                y: Math.random() * canvas.height,
                charIndex: Math.floor(Math.random() * codeLength),
            }));
        };

        const draw = () => {
            const colors = getThemeColors();

            ctx.fillStyle = colors.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px 'Roboto Mono', monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const drop = rainDrops[i];
                
                // === 核心還原：移除程式碼串的 for 迴圈，只繪製一個字元 ===
                const text = codeChars[drop.charIndex];

                // 使用簡化的顏色邏輯，突出顯示括號，其他都用最亮的 head 顏色
                ctx.fillStyle = '{}[]()'.includes(text) ? colors.brackets : colors.head;
                
                ctx.fillText(text, i * columnWidth, drop.y);

                // === 還原：使用早期版本的重設邏輯 ===
                if (drop.y > canvas.height && Math.random() > 0.98) {
                    drop.y = 0;
                    drop.charIndex = Math.floor(Math.random() * codeLength);
                } else {
                    drop.y += speed; // 使用新的高速變數
                }

                drop.charIndex = (drop.charIndex + 1) % codeLength;
            }

            animationFrameId = window.requestAnimationFrame(draw);
        };

        setup();
        draw();
        window.addEventListener('resize', setup);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', setup);
        };
    }, [codeString]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-0"
        />
    );
};

export default MatrixBackground;