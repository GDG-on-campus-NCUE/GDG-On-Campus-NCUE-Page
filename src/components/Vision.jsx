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

    // 手機版取消滾動監聽，避免不穩定

    // --- 使用重寫後的專業中文文案和 SVG 圖示 ---
    const visionCards = language === 'zh'
        ? [
            {
                title: '校園創新與影響力',
                description: '我們將想法轉化為實際的校園應用。透過與學校的直接合作，我們打造並維護能優化師生日常生活的系統，將 AI 與現代技術帶入校園的核心。',
                outline: CodeBracketSquareIconOutline,
                solid: CodeBracketSquareIconSolid
            },
            {
                title: '成長與知識共享',
                description: '保持技術領先。從 AI 工作坊到最新框架的深度探討，我們為熱情的開發者們創造一個充滿活力的空間，互相學習、分享專業，共同成長為技術領導者。',
                outline: AcademicCapIconOutline,
                solid: AcademicCapIconSolid
            },
            {
                title: '連結無限機遇',
                description: '透過獨家資源釋放你的潛力。我們扮演著橋樑的角色，將成員與 Google、業界夥伴的廣大網絡連結。這是你通往導師指導、專案協作和更廣闊機愈的門戶。',
                outline: GlobeAltIconOutline,
                solid: GlobeAltIconSolid
            }
        ]
        : [
            {
                title: 'Campus Innovation and Impact',
                description: 'We turn ideas into real campus applications. By collaborating directly with the university, we build and maintain systems that improve daily life, bringing AI and modern tech to the heart of campus.',
                outline: CodeBracketSquareIconOutline,
                solid: CodeBracketSquareIconSolid
            },
            {
                title: 'Growth and Knowledge Sharing',
                description: 'Stay at the cutting edge. From AI workshops to deep dives into the latest frameworks, we create an energetic space for passionate developers to learn, share expertise and grow into tech leaders together.',
                outline: AcademicCapIconOutline,
                solid: AcademicCapIconSolid
            },
            {
                title: 'Connecting Endless Opportunities',
                description: 'Unlock your potential with exclusive resources. We serve as a bridge linking members to Google and industry partners, opening doors to mentorship, project collaboration and broader opportunities.',
                outline: GlobeAltIconOutline,
                solid: GlobeAltIconSolid
            }
        ];

    return (
        <section id="vision" className="py-20 md:py-32 px-4 md:px-8 bg-transparent" ref={ref}>
            <div className="max-w-7xl mx-auto">
                {/* Header with Chinese Content */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className={`phone-h1 md:pc-h1 text-heading mb-6 md:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {language === 'zh' ? '我們的願景' : 'Our Vision'}
                    </h2>
                    <p className={`phone-liner md:pc-h3 text-muted max-w-4xl mx-auto leading-relaxed transition-all duration-1000 px-4 md:px-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '0.2s' }}>
                        {language === 'zh'
                            ? '在這裡，你的 Code 不只存在於 GitHub，更運行在校園的日常。'
                            : 'Here, your code lives not only on GitHub but also runs in everyday campus life.'}
                    </p>
                </div>

                {/* Cards Grid with SVG Icons and Chinese Content */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
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
                                className={`relative overflow-hidden bg-surface/50 backdrop-blur-lg border border-border rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-500 ease-out hover:duration-300 hover:shadow-2xl hover:shadow-brand/20 hover:border-brand focus:scale-105 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                style={{ transitionDelay: `${index * 0.15}s` }}
                                tabIndex={0}
                            >
                                <span className="sheen pointer-events-none"></span>
                                <div className="mb-6 md:mb-8 text-center relative w-10 h-10 md:w-12 md:h-12 mx-auto">
                                    <Outline className="absolute inset-0 w-full h-full text-brand transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0" />
                                    <Solid className="absolute inset-0 w-full h-full text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100" />
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