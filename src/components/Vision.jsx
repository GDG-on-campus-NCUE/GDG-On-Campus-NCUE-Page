'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
// 導入專業的 SVG 圖示
import {
    CodeBracketSquareIcon as CodeBracketSquareIconOutline,
    AcademicCapIcon as AcademicCapIconOutline,
    GlobeAltIcon as GlobeAltIconOutline
} from '@heroicons/react/24/outline';
import {
    CodeBracketSquareIcon as CodeBracketSquareIconSolid,
    AcademicCapIcon as AcademicCapIconSolid,
    GlobeAltIcon as GlobeAltIconSolid
} from '@heroicons/react/24/solid';

export default function Vision() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const { language } = useLanguage();
    const cardRefs = useRef([]);

    // 依據位置更新卡片的旋轉、縮放與光線位置
    const updateCardStyle = (card, x, y, scale = 1, translateY = 0) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((y - rect.height / 2) / rect.height) * -15;
        const rotateY = ((x - rect.width / 2) / rect.width) * 15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateY(${translateY}px)`;

        const sheen = card.querySelector('.sheen');
        if (sheen) {
            sheen.style.setProperty('--x', `${(x / rect.width) * 100}%`);
            sheen.style.setProperty('--y', `${(y / rect.height) * 100}%`);
        }
    };

    // 指標移動時計算旋轉與光線
    const handlePointerMove = (e, index) => {
        if (window.innerWidth < 768) return; // 手機板停用指標效果
        const card = cardRefs.current[index];
        if (!card) return;
        card.style.transition = 'transform 0.1s ease-out';
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        updateCardStyle(card, x, y, 1.05, -6);
    };

    // 指標進入時的過渡動畫與光線顯示
    const handlePointerEnter = (e, index) => {
        if (window.innerWidth < 768) return; // 手機板停用指標效果
        const card = cardRefs.current[index];
        if (!card) return;
        card.style.transition = 'transform 0.3s ease';
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        updateCardStyle(card, x, y, 1.05, -6);
        // 邊框與光暈使用卡片自訂色
        card.style.borderColor = card.dataset.color;
        card.style.boxShadow = `0 0 40px ${card.dataset.color}66`;
        const sheen = card.querySelector('.sheen');
        if (sheen) sheen.style.opacity = '1';
    };

    // 指標離開時恢復初始狀態
    const handlePointerLeave = (index) => {
        if (window.innerWidth < 768) return; // 手機板停用指標效果
        const card = cardRefs.current[index];
        if (!card) return;
        card.style.transition = 'transform 0.4s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.borderColor = 'var(--color-border)';
        card.style.boxShadow = 'none';
        const sheen = card.querySelector('.sheen');
        if (sheen) sheen.style.opacity = '0';
    };

    // 動畫觸發的 useEffect hook，監控區塊進出視窗
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // 依據可見狀態切換動畫
                setIsVisible(entry.isIntersecting);
            },
            // 當區塊完全離開視窗後再重置動畫
            { threshold: 0.3, rootMargin: '0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    // 手機版僅讓靠近頁面中間的卡片套用效果
    useEffect(() => {
        if (window.innerWidth >= 768) return; // 僅在手機版運作

        const handleScroll = () => {
            const viewportCenter = window.innerHeight / 2;
            let closestCard = null;
            let minDistance = Infinity;

            // 找出距離頁面中間最近的卡片
            cardRefs.current.forEach((card) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const distance = Math.abs(cardCenter - viewportCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            });

            // 套用效果到最近的卡片，其餘恢復為預設狀態
            cardRefs.current.forEach((card) => {
                if (!card) return;
                const isActive = card === closestCard;
                card.style.transform = `scale(${isActive ? 1 : 0.9})`;
                card.style.borderColor = isActive ? card.dataset.color : 'var(--color-border)';
                card.style.boxShadow = isActive ? `0 0 20px ${card.dataset.color}66` : 'none';
                const outlineIcon = card.querySelector('.icon-outline');
                const solidIcon = card.querySelector('.icon-solid');
                if (outlineIcon && solidIcon) {
                    outlineIcon.style.opacity = isActive ? '0' : '1';
                    solidIcon.style.opacity = isActive ? '1' : '0';
                }
            });
        };

        // 初始化與監聽捲動事件
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // --- 使用重寫後的專業中文文案和 SVG 圖示 ---
    const visionCards = language === 'zh'
        ? [
            {
                title: '以校園為根，用技術發聲',
                description: '我們捕捉靈感的火花，化為程式的語句，讓校園日常因它而閃耀新的光彩。我們敢於嘗試，親手創造，讓系統真正服務於師生的需求。在這裡，AI 與科技不再是遙遠的夢想，而是你我都能掌握的力量。',
                outline: CodeBracketSquareIconOutline,
                solid: CodeBracketSquareIconSolid,
                color: '#EA4335'
            },
            {
                title: '社群同心，淬鍊前行',
                description: '我們追求的不僅是技術的深度，更是思想交鋒激盪出的集體智慧。從 AI 應用到網頁開發，這裡是一個為熱愛技術的人而生的舞台。在這裡，你不是旁觀者，而是共創者；彼此啟發、互相成就，一同定義卓越，淬鍊出屬於我們的成長。',
                outline: AcademicCapIconOutline,
                solid: AcademicCapIconSolid,
                color: '#FBBC05'
            },
            {
                title: '放眼全球，開創新猷',
                description: '你的才華，值得被世界看見。我們為你搭起橋樑，連結 Google 與全球開發者的廣闊生態。無論你尋找的是一位指引的導師、一群志同道合的戰友，或是一個能證明自己的國際舞台，這裡，都是夢想啟程的起點。',
                outline: GlobeAltIconOutline,
                solid: GlobeAltIconSolid,
                color: '#34A853'
            }
        ]
        : [
            {
                title: 'Rooted in Campus, Speaking through Code',
                description: 'We capture sparks of inspiration and shape them into lines of code, illuminating everyday campus life with new brilliance. We dare to try and create with our own hands, building systems that truly serve the needs of students and faculty. Here, AI and technology are no longer distant dreams, but real forces you and I can grasp to drive change.',
                outline: CodeBracketSquareIconOutline,
                solid: CodeBracketSquareIconSolid,
                color: '#EA4335'
            },
            {
                title: 'United in Community, Forged in Growth',
                description: 'What we seek is not only the depth of technology, but also the collective wisdom born from the clash of ideas. From AI applications to web development, this is a stage built for those who love to create with technology. Here, you are not a bystander, but a co-creator; through inspiration and collaboration, we define excellence together and forge our shared growth.',
                outline: AcademicCapIconOutline,
                solid: AcademicCapIconSolid,
                color: '#FBBC05'
            },
            {
                title: 'Reaching the Globe, Creating New Roads',
                description: 'Your talent deserves to be seen by the world. We build bridges that connect you to Google and the global community of developers. Whether you seek the guidance of a mentor, a team of like-minded partners, or an international stage to prove yourself—this is where your journey begins.',
                outline: GlobeAltIconOutline,
                solid: GlobeAltIconSolid,
                color: '#34A853'
            }
        ];

    return (
        <section id="vision" className="py-20 md:py-32 px-4 md:px-8 bg-transparent select-none" ref={ref}>
            <div className="max-w-7xl mx-auto">
                {/* Header with Chinese Content */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className={`phone-h1 md:pc-h1 text-heading mb-6 md:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {language === 'zh' ? '我們的願景' : 'Our Vision'}
                    </h2>
                    <p className={`phone-liner md:pc-h3 text-muted max-w-4xl mx-auto leading-relaxed transition-all duration-1000 px-4 md:px-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '0.2s' }}>
                        {language === 'zh'
                            ? '我們因改變而寫，為影響而生。讓程式碼不止於 GitHub，而是走進現實，化作真切的力量與迴響。'
                            : 'We code for change, and we live to create impact. Code is more than what resides on GitHub—it steps into reality, transforming into tangible power and lasting resonance.'}
                    </p>
                </div>

                {/* Cards Grid with SVG Icons and Chinese Content */}
                <div
                    className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:snap-none lg:gap-12 px-4 md:px-0 py-8 md:py-0"
                >
                    {visionCards.map((card, index) => {
                        const Outline = card.outline;
                        const Solid = card.solid;
                        return (
                            <div
                                key={index}
                                ref={(el) => (cardRefs.current[index] = el)}
                                onPointerMove={(e) => handlePointerMove(e, index)}
                                onPointerEnter={(e) => handlePointerEnter(e, index)}
                                onPointerLeave={() => handlePointerLeave(index)}
                                // 入場動畫：由下往上淡入，並依序延遲 0.15 秒
                                className={`relative overflow-hidden bg-surface/50 md:backdrop-blur-lg border border-border rounded-2xl p-6 md:p-10 shadow-lg transition-all duration-500 ease-out hover:duration-300 hover:shadow-2xl focus:scale-105 group w-full md:w-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                style={{ transitionDelay: `${index * 0.15}s` }}
                                tabIndex={0}
                                data-color={card.color}
                            >
                                {/* 手機版不顯示動態光效 */}
                                <span className="sheen pointer-events-none hidden md:block"></span>
                                <div className="mb-6 md:mb-8 text-center relative w-10 h-10 md:w-12 md:h-12 mx-auto">
                                    <Outline className="icon-outline absolute inset-0 w-full h-full text-brand transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0" />
                                    <Solid className="icon-solid absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100" style={{ color: card.color }} />
                                </div>
                                <h3 className="phone-h3 md:pc-h2 text-heading mb-4 md:mb-6 text-center">
                                    {card.title}
                                </h3>
                                <p className="phone-liner md:pc-liner text-muted leading-relaxed text-center">
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
