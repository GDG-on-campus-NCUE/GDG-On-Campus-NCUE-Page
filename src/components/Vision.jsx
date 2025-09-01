'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
// 導入專業的 SVG 圖示
import {
    CodeBracketSquareIcon,
    AcademicCapIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function Vision() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const { language } = useLanguage();

    // 動畫觸發的 useEffect hook，監控區塊進出視窗
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // 依據可見狀態切換動畫
                setIsVisible(entry.isIntersecting);
            },
            // 將 threshold 降至 0.2 並擴大 rootMargin，讓區塊在部分進出視窗時仍能保持顯示
            { threshold: 0.2, rootMargin: '20% 0px 20% 0px' }
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

    // --- 使用重寫後的專業中文文案和 SVG 圖示 ---
    const visionCards = language === 'zh'
        ? [
            {
                title: '校園創新與影響力',
                description: '我們將想法轉化為實際的校園應用。透過與學校的直接合作，我們打造並維護能優化師生日常生活的系統，將 AI 與現代技術帶入校園的核心。',
                icon: CodeBracketSquareIcon
            },
            {
                title: '成長與知識共享',
                description: '保持技術領先。從 AI 工作坊到最新框架的深度探討，我們為熱情的開發者們創造一個充滿活力的空間，互相學習、分享專業，共同成長為技術領導者。',
                icon: AcademicCapIcon
            },
            {
                title: '連結無限機遇',
                description: '透過獨家資源釋放你的潛力。我們扮演著橋樑的角色，將成員與 Google、業界夥伴的廣大網絡連結。這是你通往導師指導、專案協作和更廣闊機愈的門戶。',
                icon: GlobeAltIcon
            }
        ]
        : [
            {
                title: 'Campus Innovation and Impact',
                description: 'We turn ideas into real campus applications. By collaborating directly with the university, we build and maintain systems that improve daily life, bringing AI and modern tech to the heart of campus.',
                icon: CodeBracketSquareIcon
            },
            {
                title: 'Growth and Knowledge Sharing',
                description: 'Stay at the cutting edge. From AI workshops to deep dives into the latest frameworks, we create an energetic space for passionate developers to learn, share expertise and grow into tech leaders together.',
                icon: AcademicCapIcon
            },
            {
                title: 'Connecting Endless Opportunities',
                description: 'Unlock your potential with exclusive resources. We serve as a bridge linking members to Google and industry partners, opening doors to mentorship, project collaboration and broader opportunities.',
                icon: GlobeAltIcon
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
                        const IconComponent = card.icon;
                        return (
                            <div
                                key={index}
                                // 入場動畫：由下往上淡入，並依序延遲 0.15 秒
                                className={`bg-surface/50 backdrop-blur-lg border border-border rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-500 ease-out hover:duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/20 hover:border-brand group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                style={{ transitionDelay: `${index * 0.15}s` }}
                            >
                                <div className="mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 text-center md:text-left">
                                    <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-brand mx-auto md:mx-0" />
                                </div>
                                <h3 className="phone-h3 md:pc-h2 text-heading mb-4 md:mb-6 text-center md:text-left">
                                    {card.title}
                                </h3>
                                <p className="phone-liner md:pc-liner text-muted leading-relaxed text-center md:text-left">
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