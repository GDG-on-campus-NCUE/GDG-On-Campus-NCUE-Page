'use client';

import { useRef, useEffect } from 'react';

const MatrixBackground = ({ codeString }) => { 
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!codeString) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

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

        const fontSize = 14; 
        const speed = 18;
        const columnWidth = fontSize + 4;

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
                const text = codeChars[drop.charIndex];
                ctx.fillStyle = '{}[]()'.includes(text) ? colors.brackets : colors.head;
                
                ctx.fillText(text, i * columnWidth, drop.y);

                if (drop.y > canvas.height && Math.random() > 0.98) {
                    drop.y = 0;
                    drop.charIndex = Math.floor(Math.random() * codeLength);
                } else {
                    drop.y += speed;
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