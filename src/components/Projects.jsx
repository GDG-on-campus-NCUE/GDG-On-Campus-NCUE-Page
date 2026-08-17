'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import ScholarshipShowcase from './ScholarshipShowcase';

import next_js_img from '@/images/tech/nextjs.svg'
import ts_img from '@/images/tech/typescript.svg'
import tailwind_img from '@/images/tech/tailwindcss.svg'
import supa_img from '@/images/tech/supabase-seeklogo.png'
import vercal_img from '@/images/tech/vercel.svg'


export default function Projects() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const { language } = useLanguage();

    // 卡片進場顯示狀態
    const [visibleCards, setVisibleCards] = useState({});
    // 觀察卡片進場用的容器參考
    const cardWrapperRefs = useRef([]);
    // 控制 3D 互動的卡片本體參考
    const cardInnerRefs = useRef([]);
    // 儲存 requestAnimationFrame 的識別碼以便控制動畫
    const animationFrame = useRef([]);
    // 是否為手機螢幕
    const [isMobile, setIsMobile] = useState(false);
    // 手機螢幕中間目前的卡片索引
    const [activeCard, setActiveCard] = useState(null);
    // 追蹤目前捲動方向
    const [scrollDirection, setScrollDirection] = useState('down');
    // 儲存目前卡片索引以供捲動計算使用
    const activeCardRef = useRef(null);

    const techStack = [
        { name: 'Next.js', icon: next_js_img },
        { name: 'TypeScript', icon: ts_img },
        { name: 'Tailwind CSS', icon: tailwind_img },
        { name: 'Supabase', icon: supa_img },
        { name: 'Vercel', icon: vercal_img },
    ];

    const featureData = {
        zh: [
            {
                status: '已上線',
                title: '生輔組獎學金資訊平台',
                description: '一個以多模態 LLM 為核心所打造的智慧獎學金資訊平台。它能動態分析管理員提供的任何資料來源（如 PDF 文件、網頁連結），並透過強大的 Gemini 3 Flash 模型，實現全自動的資料解析、關鍵資訊萃取與內容摘要，旨在徹底顛覆傳統的資訊整理與公告發布流程，讓學校能夠更有效率的處理相關事務。',
                link: 'https://scholarship.ncuesa.org.tw',
                tags: ['資訊整合', '流程優化', 'AI 應用' ]
            },
            {
                status: '已上線',
                title: '代管生輔組 RPage 網站',
                description: '我們接手並優化了學務處生活輔導組的網站頁面，確保資訊能夠更精準地被傳達，為全校師生提供更良好的網站瀏覽體驗。',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4293.php',
                tags: ['資訊整合', 'UI 優化']
            },
            {
                status: '已上線',
                title: '生輔組餐券管理系統',
                description: '透過 Google Apps Script 連動 Google Forms、Google Docs、Google Sheets 建立一套電子餐券系統，除了簡化學生端申請流程之外，更提供後台餐券追蹤、數據分析等多項管理員友善功能！',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4345.php',
                tags: ['流程數位化', '數據分析']
            },
            {
                status: '已上線',
                title: '學生會投票系統',
                description: [
                    {
                        title: '彰師單一登入(SSO)驗證',
                        content: '對接彰師標準授權介面進行資格審查。系統僅獲取必要的投票權限聲明，全程不經手且不儲存您的登入憑據，確保個人身分資訊受技術與法律雙重保障。'
                    },
                    {
                        title: '隱私保護金鑰與零知識證明生成',
                        content: '在您的本地終端生成專屬加密金鑰。基於零知識證明(Zero-Knowledge Proof)技術，您可在不揭露真實身分的前提下，向系統證明合法的投票權，實現絕對匿名與抗關聯性。'
                    },
                    {
                        title: '端對端加密投票與分散式存證',
                        content: '選票經由高強度非對稱加密函數加密。一旦完成提交，內容即具備不可篡改性與公開可稽核性，確保選舉過程絕對公正、透明。'
                    }
                ],
                link: 'https://sa-election.ncue.edu.tw/',
                repo: 'https://github.com/GDG-on-campus-NCUE/NCUE-SAVote',
                tags: ['電子投票', '零知識證明', '資訊安全']
            },
            {
                status: '已上線',
                title: '生輔組失物招領系統',
                description: '透過 API 連結 Google Forms 與 Google Sheets，提供一個線上登錄與搜尋失物的平台，協助學生快速找回遺失物品。',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4292.php',
                tags: ['流程數位化', '行政效率']
            },
        ],
        en: [
            {
                status: 'Launched',
                title: 'Student Affairs Scholarship Information Platform',
                description: 'A smart scholarship information platform built around a multimodal LLM. It dynamically analyzes administrator-provided sources (such as PDF files or web links) and, powered by the Gemini 3 Flash model, performs fully automated parsing, key information extraction, and content summarization to streamline announcement workflows.',
                link: 'https://scholarship.ncuesa.org.tw',
                tags: ['Information Integration', 'Process Optimization', 'AI Application']
            },
            {
                status: 'Launched',
                title: 'Student Affairs RPage Site',
                description: 'We took over and optimized the Student Affairs Division website to ensure information is delivered accurately and to provide a better browsing experience for the campus community.',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4293.php',
                tags: ['Information Integration', 'UI Optimization']
            },
            {
                status: 'Launched',
                title: 'Meal Voucher Management System',
                description: 'Uses Google Apps Script to integrate Google Forms, Docs, and Sheets into an electronic meal voucher system that streamlines student applications and provides administrators with voucher tracking and data analysis.',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4345.php',
                tags: ['Workflow Digitalization', 'Data Analysis']
            },
            {
                status: 'Launched',
                title: 'Student Association Voting System',
                description: [
                    {
                        title: 'NCUE SSO Authentication',
                        content: 'Qualification review via standard NCUE authorization. The system only obtains necessary voting rights claims, never handles or stores login credentials, ensuring identity info is legally and technically protected.'
                    },
                    {
                        title: 'Privacy Keys & ZKP Generation',
                        content: 'Generates exclusive encryption keys locally. Using Zero-Knowledge Proof (ZKP), users prove legal voting rights without revealing identity, achieving absolute anonymity and anti-correlation.'
                    },
                    {
                        title: 'E2E Encryption & Distributed Evidence',
                        content: 'Ballots are encrypted with high-strength asymmetric functions. Once submitted, content is immutable and publicly auditable, ensuring a fair and transparent election process.'
                    }
                ],
                link: 'https://sa-election.ncue.edu.tw/',
                repo: 'https://github.com/GDG-on-campus-NCUE/NCUE-SAVote',
                tags: ['E-Voting', 'ZKP', 'Information Security']
            },
            {
                status: 'Launched',
                title: 'Student Affairs Lost and Found System',
                description: 'Connects Google Forms and Sheets through APIs to provide an online platform for registering and searching lost items, helping students quickly recover their belongings.',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4292.php',
                tags: ['Workflow Digitalization', 'Administrative Efficiency']
            },
        ]
    };
    const features = featureData[language];

    // 狀態排序：已完成(含已上線) → 進行中 → 規劃中
    const statusOrder = {
        '已上線': 0,
        'Launched': 0,
        '開發中': 1,
        'In Development': 1,
        '籌畫中': 2,
        'Planning': 2,
    };

    // 取出除精選專案外的其他專案並依狀態排序
    const otherFeatures = features
        .slice(1)
        .sort((a, b) => (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3));

    // 根據專案數量計算桌面版欄數（平方根上取整）
    const columnCount = Math.ceil(Math.sqrt(otherFeatures.length));

    // 將欄數對應到 Tailwind 的欄位 class
    const columnClass = {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        5: 'lg:grid-cols-5',
    }[columnCount] || 'lg:grid-cols-3';

    // 判斷目前是否為手機版
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 手機版監聽滾動，偵測畫面中最靠近中央的卡片
    useEffect(() => {
        if (!isMobile) {
            setActiveCard(null);
            activeCardRef.current = null;
            return;
        }

        const handleScroll = () => {
            const viewportCenter = window.innerHeight / 2;
            let closest = null;
            let minDistance = Infinity;

            cardWrapperRefs.current.forEach((el, idx) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                // 確認卡片是否進入可視範圍
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const cardCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(cardCenter - viewportCenter);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closest = idx;
                    }
                }
            });

            if (closest !== activeCardRef.current) {
                setScrollDirection(
                    activeCardRef.current !== null && closest < activeCardRef.current ? 'up' : 'down'
                );
                setActiveCard(closest);
                activeCardRef.current = closest;
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    // 手機版：透過裝置陀螺儀提供 3D 旋轉效果
    useEffect(() => {
        if (!isMobile || typeof window === 'undefined' || !window.DeviceOrientationEvent) return;

        // 透過陀螺儀數值旋轉所有卡片
        const handleOrientation = (event) => {
            const { beta = 0, gamma = 0 } = event;
            const rotateX = beta / 15; // 前後傾斜
            const rotateY = -gamma / 15; // 左右傾斜反向

            cardInnerRefs.current.forEach(card => {
                if (!card) return;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, [isMobile]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // 依據可見狀態切換動畫
                setIsVisible(entry.isIntersecting);
            },
            // 這個 section 含捲動劇場後高達數百 vh，threshold 不能設比例：
            // 「整體的 10%」可能高於一個視窗，永遠不會被判定為 intersecting。
            { threshold: 0 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    // 監聽每張卡片進場的觀察器
    useEffect(() => {
        // 儲存計時器以清除延遲動畫
        const timeouts = [];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.dataset.index);
                        // 進場動畫延遲後顯示，避免後續 hover 出現延遲
                        const timeout = setTimeout(() => {
                            setVisibleCards(prev => ({ ...prev, [idx]: true }));
                        }, 600 + idx * 100);
                        timeouts.push(timeout);
                    }
                });
            },
            {
                threshold: 0.2,
                // 手機版提早觸發交叉觀察以避免切換卡片時尚未載入
                rootMargin: isMobile ? '0px 0px 40% 0px' : '0px'
            }
        );

        cardWrapperRefs.current.forEach(el => el && observer.observe(el));
        return () => {
            observer.disconnect();
            timeouts.forEach(t => clearTimeout(t));
        };
    }, [isMobile]);

    // （原手機版捲動強調效果已整合至 activeCard 狀態）

    // 桌機版：滑鼠移動時的磁吸位移效果
    const handleMouseMove = (e, index) => {
        if (isMobile) return;
        const card = cardInnerRefs.current[index];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // 直接依滑鼠位置位移，讓跟隨更即時
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        cancelAnimationFrame(animationFrame.current[index]);
        animationFrame.current[index] = requestAnimationFrame(() => {
            card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    };

    // 滑鼠離開卡片時重置位移
    const handleMouseLeave = (index) => {
        if (isMobile) return;
        const card = cardInnerRefs.current[index];
        if (!card) return;
        cancelAnimationFrame(animationFrame.current[index]);
        card.style.transform = 'translate3d(0,0,0)';
    };

    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <section id="projects" className="py-20 md:py-32" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* --- 區段一：介紹 (RWD 已優化) --- */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className={`phone-h1 md:pc-h1 text-[var(--foreground)] mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {language === 'zh'
                            ? (<>{'你的程式碼，'}<span className="block md:inline">在校園日常迴響</span></>)
                            : (<>{'Your code, '}<span className="block md:inline">echoes through campus life</span></>)}
                    </h2>
                    <p className={`phone-liner md:pc-h3 text-[var(--muted)] max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s' }}>
                        {language === 'zh'
                            ? '我們不僅是打造酷炫的專案，更是構築支撐校園運作的數位基石。從賦能學生的獎學金資訊平台，到優化校園網站的使用體驗，我們的技術無聲地運行在背景之中，成為每一位同學都能依賴的、穩定而強大的隱形力量。'
                            : 'We are not just building flashy projects; we also lay the digital foundation that supports campus operations. From empowering students with a scholarship information platform to enhancing user experiences on campus websites, our technology runs silently in the background, becoming a stable and powerful invisible force every student can rely on.'}
                    </p>
                </div>

                {/* --- 區段二：精選專案展示（瀏覽器外框 + 捲動驅動輪播） --- */}
                <ScholarshipShowcase />

                {/* --- 區段二之二：該平台的技術棧 --- */}
                <div className="mb-16 md:mb-24">
                    <h4 className="phone-liner-bold md:pc-liner-bold text-[var(--foreground)] mb-4 text-center font-bold">
                        {language === 'zh' ? '技術棧' : 'Tech Stack'}
                    </h4>
                    <div className="relative w-full select-none overflow-hidden py-2">
                        <div className="marquee-container flex whitespace-nowrap text-[var(--foreground)]">
                            {Array.from({ length: 12 }, (_, setIndex) =>
                                techStack.map((tech, techIndex) => (
                                    <div
                                        key={`${setIndex}-${techIndex}`}
                                        className="mx-3 flex min-w-fit flex-shrink-0 items-center p-3 md:mx-4 md:p-4"
                                        style={{ animationDelay: `${(setIndex * techStack.length + techIndex) * 0.2}s` }}
                                    >
                                        <div className="mr-3 rounded-full bg-white/90 p-1.5 shadow-sm dark:bg-white">
                                            <Image src={tech.icon} alt={tech.name} width={40} height={40} className="h-6 w-6 md:h-8 md:w-8" draggable={false} />
                                        </div>
                                        <span className="text-sm font-semibold md:text-base">{tech.name}</span>
                                    </div>
                                ))
                            ).flat()}
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--background)] to-transparent md:w-16"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--background)] to-transparent md:w-16"></div>
                    </div>
                </div>

                {/* --- 區段三：更多專案 (全新設計) --- */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 md:mb-24`}>
                    {otherFeatures.map((feature, index) => (
                        <div
                            key={index}
                            data-index={index}
                            ref={el => cardWrapperRefs.current[index] = el}
                            className={`group relative rounded-3xl transition-all duration-500 transform ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        >
                            {/* 懸浮發光背景 */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500 pointer-events-none"></div>
                            
                            <div
                                ref={el => cardInnerRefs.current[index] = el}
                                onMouseMove={e => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                className="relative bg-[var(--surface)]/80 backdrop-blur-xl border border-[var(--border)]/50 rounded-3xl p-8 md:p-10 flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu will-change-transform overflow-hidden"
                            >
                                {/* 裝飾性幾何圖形 */}
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-bl from-[#4285f4]/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                                {/* 頂部：標題與狀態 */}
                                <div className="flex justify-between items-start mb-6 gap-4">
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] tracking-tight leading-tight group-hover:text-[#4285f4] transition-colors">
                                        {feature.title}
                                    </h3>
                                    {(() => {
                                        const statusConfig = {
                                            '已上線': { color: 'text-green-500', bg: 'bg-green-500/10', dot: 'bg-green-500' },
                                            'Launched': { color: 'text-green-500', bg: 'bg-green-500/10', dot: 'bg-green-500' },
                                            '開發中': { color: 'text-yellow-500', bg: 'bg-yellow-500/10', dot: 'bg-yellow-500' },
                                            'In Development': { color: 'text-yellow-500', bg: 'bg-yellow-500/10', dot: 'bg-yellow-500' },
                                        };
                                        const config = statusConfig[feature.status] || { color: 'text-gray-500', bg: 'bg-gray-500/10', dot: 'bg-gray-500' };

                                        return (
                                            <div className={`flex items-center px-3 py-1.5 rounded-full ${config.bg} shrink-0`}>
                                                <span className={`w-2 h-2 rounded-full ${config.dot} mr-2`}></span>
                                                <span className={`text-xs font-bold ${config.color} tracking-wide`}>
                                                    {feature.status}
                                                </span>
                                            </div>
                                        );
                                    })()}
                                </div>
                                
                                {/* 內容區塊 */}
                                <div className="flex-grow">
                                    {Array.isArray(feature.description) ? (
                                        <div className="space-y-4 mb-8">
                                            {feature.description.map((item, i) => (
                                                <div key={i} className="pl-4 border-l-2 border-[#4285f4]/30 hover:border-[#4285f4] transition-colors">
                                                    <h4 className="text-sm md:text-base font-bold text-[var(--foreground)] mb-1">{item.title}</h4>
                                                    <p className="text-sm text-[var(--muted)] leading-relaxed">{item.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-8 font-medium">
                                            {feature.description}
                                        </p>
                                    )}
                                </div>

                                {/* 底部：標籤與操作 */}
                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {feature.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--foreground)]/[0.06] text-[var(--muted)] hover:bg-[#4285f4]/10 hover:text-[#4285f4] transition-colors"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        {feature.link && (
                                            <a
                                                href={feature.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#4285f4] text-white font-bold hover:bg-[#3367d6] transition-all duration-300 hover:shadow-lg hover:shadow-[#4285f4]/25 group/btn"
                                            >
                                                {language === 'zh' ? '前往專案' : 'Visit Project'}
                                                <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                </svg>
                                            </a>
                                        )}
                                        {feature.repo && (
                                            <a
                                                href={feature.repo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center p-3 rounded-xl bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/50 border border-transparent hover:border-[var(--border)] transition-all duration-300"
                                                title="View Source Code"
                                            >
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* --- 區段四：CTA 按鈕 --- */}
                <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1s' }}>
                    <button
                        onClick={() => openLink('https://github.com/io-software-ai/NCUE-Scholarship')}
                        className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 px-6 py-3 md:px-8 md:py-4 rounded-lg phone-liner-bold md:pc-liner-bold transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center space-x-3 group transform hover:scale-105"
                    >
                        <svg aria-hidden="true" className="w-5 h-5 md:w-6 md:h-6 text-slate-900 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>{language === 'zh' ? '探索我們的 GitHub' : 'Explore our GitHub'}</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
