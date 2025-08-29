'use client';

import { useState, useEffect, useRef } from 'react';
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

    // 活動圖片 - 使用 public 目錄中的圖片
    const eventImages = [
        event_img_1,
        event_img_2,
        event_img_3,
        event_img_4,
        event_img_5
    ];

    const highlights = [
        { icon: '🤖', text: 'n8n 工作坊：親手打造自動化 Line Bot' },
        { icon: '💡', text: '提示工程：從零到一啟動 AI 原力' },
        { icon: '🔥', text: '社群火花：點燃對技術的熱情與潛能' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
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

    return (
        <section id="events" className="py-20 md:py-32 px-4 md:px-6 bg-transparent" ref={ref}>
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

                    {/* Left: Images */}
                    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
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
                                />
                                <p className="phone-liner-bold md:pc-liner-bold text-brand">
                                    回顧我們的「Build with AI 2025」
                                </p>
                            </div>
                            <h2 className="phone-h1 md:pc-h1 text-heading mb-6 md:mb-8 leading-tight">
                                不只是一場活動，<br className="hidden md:block" />
                                而是一場技術革命的開端。
                            </h2>
                            <p className="phone-liner md:pc-liner text-muted mb-8 md:mb-10 leading-relaxed">
                                我們將 AI 的力量帶入校園，打破技術壁壘，引導每位參與者從零到一啟動自己的 AI 原力。透過無程式碼的 n8n 工作坊，現場夥伴都親手打造出能解決實際問題的自動化 Line 聊天機器人。
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-6">
                            {highlights.map((highlight, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center space-x-4 md:space-x-6 p-6 md:p-8 bg-surface/50 backdrop-blur-lg border border-border rounded-xl shadow-sm transition-all duration-500 hover:shadow-md hover:border-brand transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                    style={{ transitionDelay: `${0.5 + index * 0.15}s` }}
                                >
                                    <span className="text-3xl md:text-4xl">{highlight.icon}</span>
                                    <span className="phone-liner-bold md:pc-liner-bold text-heading leading-relaxed">
                                        {highlight.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
