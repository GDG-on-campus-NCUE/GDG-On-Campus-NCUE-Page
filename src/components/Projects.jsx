'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

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
                status: '籌畫中',
                title: '宿舍退宿管理系統',
                description: '旨在數位化及簡化宿舍退宿流程，從申請、檢查到核准全程線上化，減少紙本作業，提升行政效率與學生便利性。',
                tags: ['流程數位化', '行政效率']
            },
            {
                status: '已上線',
                title: '生輔組餐券管理系統',
                description: '透過 Google Apps Script 連動 Google Forms、Google Docs、Google Sheets 建立一套電子餐券系統，除了簡化學生端申請流程之外，更提供後台餐券追蹤、數據分析等多項管理員友善功能！',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4345.php',
                tags: ['流程數位化', '數據分析']
            },
            {
                status: '開發中',
                title: '學生會投票系統',
                description: '開發一個安全、公正、透明的線上投票平台，用於學生會選舉及重大議題投票，提升學生參與公共事務的便利性與意願。',
                tags: ['電子投票', '資訊安全']
            },
            {
                status: '開發中',
                title: '資訊工程學系系網',
                description: '重寫資工系系網，捨棄原生 PHP，以框架方式重構，提升網站可維護性。',
                tags: ['網站開發', 'UI 優化']
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
                status: 'Planning',
                title: 'Dorm Checkout Management System',
                description: 'Plans to digitize and simplify the dormitory checkout process, bringing application, inspection, and approval fully online to reduce paperwork and enhance efficiency and convenience.',
                tags: ['Workflow Digitalization', 'Administrative Efficiency']
            },
            {
                status: 'Launched',
                title: 'Meal Voucher Management System',
                description: 'Uses Google Apps Script to integrate Google Forms, Docs, and Sheets into an electronic meal voucher system that streamlines student applications and provides administrators with voucher tracking and data analysis.',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4345.php',
                tags: ['Workflow Digitalization', 'Data Analysis']
            },
            {
                status: 'In Development',
                title: 'Student Association Voting System',
                description: 'Developing a secure, fair, and transparent online voting platform for student association elections and major issues to boost student participation in public affairs.',
                tags: ['E-Voting', 'Information Security']
            },
            {
                status: 'In Development',
                title: 'Department of Computer Science Website',
                description: 'Rebuilding the CS department website with a modern framework instead of raw PHP to improve maintainability.',
                tags: ['Website Development', 'UI Optimization']
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
            { threshold: 0.1 }
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
                    <h2 className={`phone-h1 md:pc-h1 text-heading mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {language === 'zh'
                            ? (<>{'你的程式碼，'}<span className="block md:inline">在校園日常迴響</span></>)
                            : (<>{'Your code, '}<span className="block md:inline">echoes through campus life</span></>)}
                    </h2>
                    <p className={`phone-liner md:pc-h3 text-muted max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s' }}>
                        {language === 'zh'
                            ? '我們不僅是打造酷炫的專案，更是構築支撐校園運作的數位基石。從賦能學生的獎學金資訊平台，到優化校園網站的使用體驗，我們的技術無聲地運行在背景之中，成為每一位同學都能依賴的、穩定而強大的隱形力量。'
                            : 'We are not just building flashy projects; we also lay the digital foundation that supports campus operations. From empowering students with a scholarship information platform to enhancing user experiences on campus websites, our technology runs silently in the background, becoming a stable and powerful invisible force every student can rely on.'}
                    </p>
                </div>

                {/* --- 區段二：主要專案展示 (RWD 已重構) --- */}
                <div className="bg-surface rounded-3xl shadow-2xl overflow-hidden mb-16 md:mb-24">
                    {/* [RWD 優化] 在 lg 以下的螢幕，會自動變為單欄上下堆疊 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* 左側內容 (手機版會在上) */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
                            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.4s' }}>
                                <h3 className="phone-h3 md:pc-h2 text-brand mb-4 font-bold">
                                    {language === 'zh' ? '精選專案' : 'Featured Project'}
                                </h3>
                                <h2 className="phone-h2 md:pc-h1 text-heading mb-6 leading-tight">
                                    {language === 'zh' ? '生輔組獎學金資訊平台' : 'Student Affairs Scholarship Info Platform'}
                                </h2>
                                <p className="phone-liner md:pc-liner text-muted mb-8 leading-relaxed">
                                    {language === 'zh'
                                        ? '一個以前瞻性的多模態大型語言模型為核心所打造的智慧獎學金資訊平台。它能動態分析使用者提供的任何資料來源（如 PDF 文件、網頁連結），並透過強大的 Gemini 3 Flash 模型，實現全自動的資料解析、關鍵資訊萃取與內容摘要，旨在徹底顛覆傳統的資訊整理與公告發布流程，為學校提供一個前所未有的高效體驗。'
                                        : 'An intelligent scholarship information platform built around a cutting-edge Multimodal Large Language Model. It dynamically analyzes any user-provided data source, such as PDF documents and web links, leveraging the powerful Gemini 3 Flash model to achieve fully automated data parsing, key information extraction, and content summarization. The platform is designed to revolutionize traditional information management and announcement workflows, offering the institution an unprecedented level of efficiency.'}
                                </p>
                                <h4 className="phone-liner-bold md:pc-liner-bold text-heading mb-4 font-bold">
                                    {language === 'zh' ? '技術棧' : 'Tech Stack'}
                                </h4>

                                <div className="relative w-full overflow-hidden rounded-lg bg-surface/50 select-none">
                                    <div className="marquee-container flex text-foreground whitespace-nowrap">
                                        {Array.from({ length: 12 }, (_, setIndex) =>
                                            techStack.map((tech, techIndex) => (
                                                <div
                                                    key={`${setIndex}-${techIndex}`}
                                                    className="flex items-center p-3 mx-3 md:p-4 md:mx-4 flex-shrink-0 min-w-fit"
                                                    style={{ animationDelay: `${(setIndex * techStack.length + techIndex) * 0.2}s` }}
                                                >
                                                    <div className="bg-white/90 dark:bg-white rounded-full p-1.5 mr-3 shadow-sm">
                                                        <Image src={tech.icon} alt={tech.name} width={40} height={40} className="h-6 w-6 md:h-8 md:w-8" draggable={false} />
                                                    </div>
                                                    <span className="text-sm md:text-base font-semibold">{tech.name}</span>
                                                </div>
                                            ))
                                        ).flat()}
                                    </div>
                                    <div className="absolute inset-y-0 left-0 w-12 md:w-16 bg-gradient-to-r from-surface to-transparent pointer-events-none z-10"></div>
                                    <div className="absolute inset-y-0 right-0 w-12 md:w-16 bg-gradient-to-l from-surface to-transparent pointer-events-none z-10"></div>
                                </div>
                            </div>
                        </div>

                        {/* 右側模型 (手機版會在下) */}
                        <div className={`bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700 p-6 md:p-8 flex items-center justify-center transition-all duration-1000 relative order-1 lg:order-2 w-full max-w-full box-border overflow-hidden ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '0.5s' }}>
                            <div className="w-full h-full min-h-[350px] md:min-h-[400px] lg:min-h-[450px] flex items-center justify-center px-2 text-center">
                                {/* 桌面版加寬按鈕寬度 */}
                                <button
                                    onClick={() => openLink('https://scholarship.ncuesa.org.tw/')}
                                    className="bg-white/25 backdrop-blur-lg border border-white/40 rounded-2xl p-4 md:p-5 lg:p-6 shadow-2xl w-full max-w-[90%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%] mx-auto hover:bg-white/30 group-hover:scale-105 hover:scale-105 active:scale-98 transition-transform duration-300 transform-gpu will-change-transform cursor-pointer relative z-10 overflow-visible"
                                >
                                    {/* 卡片模擬內容 */}
                                    <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                                        <div className="h-2 md:h-3 bg-white/80 rounded w-3/4"></div>
                                        <div className="h-2 md:h-2 bg-white/70 rounded w-full"></div>
                                        <div className="h-2 md:h-2 bg-white/70 rounded w-4/5"></div>
                                        <div className="bg-teal-400/70 rounded-lg p-2 md:p-3 space-y-1 border border-white/30 shadow-md">
                                            <div className="h-1.5 md:h-2 bg-white/90 rounded w-2/3"></div>
                                            <div className="h-1.5 md:h-2 bg-white/80 rounded w-full"></div>
                                        </div>
                                        <div className="bg-green-400/70 rounded-lg p-2 md:p-3 space-y-1 border border-white/30 shadow-md">
                                            <div className="h-1.5 md:h-2 bg-white/90 rounded w-3/5"></div>
                                        </div>
                                    </div>

                                    {/* 底部資訊區塊 - 確保置中且不會爆版 */}
                                    <div className="text-center w-full">
                                        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform">
                                            <span className="text-white text-xl md:text-2xl lg:text-3xl">🎓</span>
                                        </div>
                                        <p className="font-semibold text-sm md:text-base text-white leading-tight mb-1 px-2">{language === 'zh' ? '生輔組獎學金資訊平台' : 'Student Affairs Scholarship Info Platform'}</p>
                                        <p className="text-xs md:text-sm text-white/90 px-2">{language === 'zh' ? '點擊訪問' : 'Visit site'}</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 區段三：更多專案 --- */}
                <div className={`grid grid-cols-1 md:grid-cols-2 ${columnClass} gap-6 md:gap-8 mb-16 md:mb-24`}>
                    {otherFeatures.map((feature, index) => (
                        <div
                            key={index}
                            data-index={index}
                            ref={el => cardWrapperRefs.current[index] = el}
                            className={`group relative rounded-2xl transition-all duration-300 transform ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isMobile ? (activeCard === index ? '-translate-y-1 scale-105' : 'scale-95') : 'scale-100 hover:scale-105'}`}
                        >
                            {/* 背景發光層 */}
                            <div
                                ref={el => cardInnerRefs.current[index] = el}
                                onMouseMove={e => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                // 手機非焦點卡片淡化：淺色主題用淺灰，深色主題用深灰
                                className={`relative rounded-2xl border p-6 flex flex-col h-full shadow-lg transition-transform duration-75 transform-gpu will-change-transform overflow-hidden ${isMobile ? (activeCard === index ? 'bg-surface border-border shadow-[0_0_25px_rgba(59,130,246,0.5)]' : 'bg-surface-muted border-gray-200 dark:border-gray-700') : 'bg-surface border-border hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]'}`}
                            >
                                <span className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 blur-md transition-opacity duration-300 ${isMobile ? (activeCard === index ? 'opacity-50' : 'opacity-0') : 'opacity-0 group-hover:opacity-50'}`}></span>
                                {/* 實際內容 */}
                                <div className="relative z-10 flex flex-col h-full">
                                    {/* 允許狀態膠囊在手機版換行避免爆版 */}
                                    <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                                        <h3 className={`phone-h3 md:pc-h3 font-bold leading-tight ${isMobile && activeCard !== index ? 'text-gray-400 dark:text-gray-500' : 'text-heading'}`}>{feature.title}</h3>
                                        {(() => {
                                            // 依狀態取得對應色碼
                                            const getColor = (status) => {
                                                // 依照狀態回傳對應顏色：已上線/Launched -> 綠色、開發中/In Development -> 黃色、籌畫中/Planning -> 灰色
                                                if (['已上線', 'Launched'].includes(status)) return '#22c55e';
                                                if (['開發中', 'In Development'].includes(status)) return '#eab308';
                                                return '#6b7280';
                                            };
                                            const color = getColor(feature.status);
                                            const isActive = activeCard === index;
                                            if (isMobile) {
                                                const animClass = isActive
                                                    ? (scrollDirection === 'down' ? 'tag-fill-down' : 'tag-fill-up')
                                                    : '';
                                                // 基礎樣式，禁止縮小避免文字被壓縮
                                                const baseClass = 'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border shrink-0';
                                                return isActive ? (
                                                    <span
                                                        className={`${baseClass} status-pill text-white ${animClass}`}
                                                        style={{ backgroundColor: color }}
                                                    >
                                                        <span className="relative z-10">{feature.status}</span>
                                                    </span>
                                                ) : (
                                                    // 非焦點狀態標籤改為灰色邊框與文字
                                                    <span className={`${baseClass} bg-surface-muted text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700`}>
                                                        {feature.status}
                                                    </span>
                                                );
                                            }
                                            const desktopClass =
                                                feature.status === '已上線' || feature.status === 'Launched'
                                                    ? 'bg-green-500 text-white dark:bg-green-600'
                                                    : feature.status === '開發中' || feature.status === 'In Development'
                                                        ? 'bg-yellow-500 text-white dark:bg-yellow-600'
                                                        : 'bg-gray-500 text-white dark:bg-gray-600';
                                            return (
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${desktopClass}`}>
                                                    {feature.status}
                                                </span>
                                            );
                                        })()}
                                    </div>
                                    <p className={`phone-liner md:pc-liner mb-4 leading-relaxed flex-grow ${isMobile && activeCard !== index ? 'text-gray-400 dark:text-gray-500 opacity-70' : 'text-muted'}`}>{feature.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {feature.tags.map(tag => (
                                            <span
                                                key={tag}
                                                // 手機非焦點卡片標籤改為灰色文字
                                                className={`px-2 py-1 text-xs rounded ${isMobile && activeCard !== index ? 'bg-surface-muted text-gray-400 dark:text-gray-500' : 'bg-brand/10 text-brand'}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    {feature.link && (
                                        <a
                                            href={feature.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`phone-liner-bold font-medium transition-colors group flex items-center mt-auto self-end ${isMobile && activeCard !== index ? 'text-gray-400 dark:text-gray-500 hover:text-gray-400 dark:hover:text-gray-500' : 'text-brand hover:text-brand-accent'}`}
                                        >
                                            {language === 'zh' ? '查看專案' : 'View Project'}
                                            <svg
                                                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- 區段四：CTA 按鈕 --- */}
                <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1s' }}>
                    <button
                        onClick={() => openLink('https://github.com/GDG-on-campus-NCUE/NCUE-Scholarship')}
                        className="bg-brand hover:bg-brand-accent text-text-on-brand px-6 py-3 md:px-8 md:py-4 rounded-lg phone-liner-bold md:pc-liner-bold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-3 group transform hover:scale-105"
                    >
                        <svg aria-hidden="true" className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>{language === 'zh' ? '探索我們的 GitHub' : 'Explore our GitHub'}</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
