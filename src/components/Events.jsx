'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Image from 'next/image';
import event_img_1 from '@/images/events/1.png';
import event_img_2 from '@/images/events/2.png';
import event_img_3 from '@/images/events/3.png';
import event_img_4 from '@/images/events/4.png';
import event_img_5 from '@/images/events/5.png';
import assemblyGif from '@/images/stickers/assembly.gif';


export default function Events() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const ref = useRef(null);
    const { language } = useLanguage();
    // 卡片參考，用於行動版捲動偵測
    const cardRefs = useRef([]);

    // 活動圖片 - 使用 public 目錄中的圖片
    const eventImages = [
        event_img_1,
        event_img_2,
        event_img_3,
        event_img_4,
        event_img_5
    ];

    // 亮點內容
    // - 行動版卡片由下而上進場
    // - 桌面版卡片由右至左進場
    const highlights = language === 'zh'
        ? [
            {
                title: '工作流的協奏：編織數位自動化',
                description:
                    '在這場實作中，我們深入探索了 n8n 工作流自動化的藝術。與會者學習了如何以視覺化的方式，將不同的應用程式與服務作為獨立的節點串連起來，建構出無需編寫程式碼的複雜自動化流程。這不僅是技術的教學，更是一場將抽象邏輯轉化為高效數位助理的創造之旅。'
            },
            {
                title: '提示的詩學：精煉與 AI 的對話之道',
                description:
                    '與 AI 的溝通是一門精妙的技藝。本環節深度剖析了提示工程的核心，探討如何藉由精準的語境、清晰的指令與結構化的提問，引導大型語言模型進行深度對話。我們帶領與會者掌握了這把釋放 AI 潛能的鑰匙，體會到每一個精心設計的提示，如何成為驅動卓越產出的起點。'
            },
            {
                title: '思想的交匯：點燃創新的火花',
                description:
                    '技術的革新從非獨行。這場活動不僅是單向的知識傳遞，更是思想的碰撞與交融。在此，一個人的疑問激發了一群人的靈感；一個人的專案成為了眾人協作的起點。我們共同點燃的，不僅是對技術的熱情，更是那份一同探索未知、定義未來的集體潛能。'
            }
        ]
        : [
            {
                title: 'Flows in Formation: The Art of Automation',
                description:
                    'In this hands-on session, we delved into the art of n8n workflow automation. Attendees learned to visually orchestrate complex processes, connecting disparate applications and services as individual nodes without writing a single line of code. It was a journey of transforming abstract logic into efficient, tangible digital assistants.'
            },
            {
                title: "The Prompt's Precision: A Dialogue with AI's Vision",
                description:
                    "Communicating with AI is a subtle art. This segment provided a deep dive into the core of Prompt Engineering, exploring how precise context, structured commands, and artful inquiry can guide Large Language Models into profound dialogues. We equipped attendees with the keys to unlocking AI's true potential, revealing how every well-crafted prompt becomes the catalyst for extraordinary output."
            },
            {
                title: 'A Confluence of Minds: Where Insights Ignite',
                description:
                    'Technological progress is never a solitary journey. This event was more than a transfer of knowledge; it was a vibrant collision of ideas. Here, a single question sparked inspiration in many, and one person\'s project became the starting point for collaboration. Together, we ignited not just a passion for technology, but the collective potential to explore the unknown and define the future.'
            }
        ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // 依據可見狀態切換動畫
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
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

    // Auto-carousel
    useEffect(() => {
        if (eventImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % eventImages.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [eventImages.length]);

    // 手機版偵測靠近螢幕中間的卡片並套用高科技感強調樣式
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.innerWidth >= 768) return; // 只在手機版運作

        const handleScroll = () => {
            const viewportCenter = window.innerHeight / 2;
            let closestCard = null;
            let minDistance = Infinity;

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

            cardRefs.current.forEach((card) => {
                if (!card) return;
                const isActive = card === closestCard;
                // 以平移與光暈呈現專業的過渡效果，避免因放大造成爆版
                card.style.transform = `translateY(${isActive ? '-4px' : '0'})`;
                card.style.boxShadow = isActive ? '0 0 20px var(--brand)' : '';
                card.classList.toggle('bg-brand/10', isActive);
                card.classList.toggle('border-brand', isActive);
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="events" className="py-20 md:py-32 px-4 md:px-6 bg-transparent" ref={ref}>
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

                    {/* Left: 圖片與簡報 */}
                    <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        {/* 圖片輪播 */}
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-surface/30 backdrop-blur-lg border border-border h-64 md:h-80 lg:h-96 group">
                            {/* 添加內陰影效果 */}
                            <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none z-10"></div>
                            <div
                                className="flex transition-transform duration-700 ease-in-out h-full"
                                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                            >
                                {eventImages.map((src, index) => (
                                    <div key={index} className="w-full flex-shrink-0 h-full">
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={src}
                                                alt={`Build with AI Event #${index + 1}`}
                                                fill
                                                sizes="100vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                draggable={false}
                                                onError={(e) => {
                                                    // 如果圖片加載失敗，隱藏 img 並顯示同父容器內的佔位符
                                                    try {
                                                        const img = e.target;
                                                        img.style.display = 'none';
                                                        const parent = img.closest('.w-full.h-full') || img.parentElement;
                                                        const placeholder = parent?.querySelector('.placeholder');
                                                        if (placeholder) placeholder.style.display = 'flex';
                                                    } catch (err) {
                                                        // noop
                                                    }
                                                }}
                                            />
                                            <div
                                                className="placeholder absolute inset-0 w-full h-full bg-gradient-to-br from-brand/70 to-purple-600/70 flex items-center justify-center"
                                                style={{ display: 'none' }}
                                            >
                                                <span className="text-white text-xl font-semibold opacity-80">
                                                    Build with AI Event #{index + 1}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Image indicators */}
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                                {eventImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImage(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${currentImage === index ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 簡報內嵌 */}
                        <div className="relative w-full h-64 md:h-96 border border-border rounded-xl overflow-hidden shadow-md">
                            <iframe
                                src="https://www.slideshare.net/slideshow/embed_code/key/1QT8eizVmSnyWg?startSlide=1"
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="text-center">
                            <a
                                href="https://www.slideshare.net/slideshow/demystifying-ai-from-core-concepts-to-practical-workflows-with-n8n-e67e/279081313"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="phone-liner-bold md:pc-liner-bold text-brand hover:underline"
                            >
                                Demystifying AI: From Core Concepts to Practical Workflows with n8n
                            </a>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'} lg:pl-12`} style={{ transitionDelay: '0.2s' }}>
                        <div className="mb-10 md:mb-12">
                            <div className="flex items-center space-x-3 mb-6 md:mb-8">
                                <Image
                                    src={assemblyGif}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                                    draggable={false}
                                />
                                <p className="phone-liner-bold md:pc-liner-bold text-brand">
                                    {language === 'zh' ? '回顧我們的「Build with AI 2025」' : 'Review of "Build with AI 2025"'}
                                </p>
                            </div>
                            <h2 className="phone-h1 md:pc-h1 text-heading mb-6 md:mb-8 leading-tight">
                                {language === 'zh'
                                    ? <>不只是一場活動，<br className="hidden md:block" />而是一場技術革命的開端。</>
                                    : <>Not just an event,<br className="hidden md:block" />but the dawn of a technical revolution.</>}
                            </h2>
                            <p className="phone-liner md:pc-liner text-muted mb-8 md:mb-10 leading-relaxed">
                                {language === 'zh'
                                    ? '在這場活動中，我們將 AI 的力量注入校園，致力於消彌技術的鴻溝。我們引導了每位參與者，無論其背景，都能從零到一喚醒內在的 AI 原力。透過直觀的視覺化工作坊，與會者親手構築了能夠應對真實世界挑戰的客製化智能體，見證了創意如何透過自動化流程，綻放無限可能。'
                                    : 'This event was our commitment to infusing the campus with the power of AI, bridging the technological divide. We guided every participant, regardless of their background, on a journey from zero to one, igniting the spark of AI potential within them. Through an intuitive, visual workshop, attendees crafted bespoke intelligent agents capable of tackling real-world challenges, witnessing how creativity, channeled through automated workflows, could blossom into infinite possibilities.'}
                            </p>
                        </div>

                        {/* Highlights */}
        
                        {/* 行動版由下而上、桌面版由右至左進場 */}
                        <div className="space-y-6">
                            {highlights.map((highlight, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (cardRefs.current[index] = el)}
                                    className={`p-6 md:p-8 bg-surface/50 backdrop-blur-lg border border-border rounded-xl shadow-sm transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-6 md:translate-x-6'} md:hover:bg-brand/10 md:hover:border-brand md:hover:shadow-[0_0_20px_var(--brand)] md:hover:-translate-y-1 md:cursor-pointer`}
                                    style={{ transitionDelay: isVisible ? '0s' : `${0.5 + index * 0.15}s` }}
                                >
                                    <h3 className="phone-liner-bold md:pc-liner-bold text-heading mb-2">
                                        {highlight.title}
                                    </h3>
                                    <p className="phone-liner md:pc-liner text-muted leading-relaxed">
                                        {highlight.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
