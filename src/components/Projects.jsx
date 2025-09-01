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
                title: '生輔組獎助學金平台',
                description: '整合校內外獎助學金資訊，提供學生一個清晰、易於操作的申請入口。透過智慧篩選與個人化推薦，有效提升資訊透明度與申請效率。',
                link: 'https://scholarship.ncuesa.org.tw',
                tags: ['資訊整合', '使用者體驗', '校園服務']
            },
            {
                status: '已上線',
                title: '代管生輔組 RPage 網站',
                description: '我們接手並優化了學生生活輔導組的官方資訊頁面，確保資訊的即時更新與準確傳遞，為全校學生提供更可靠的資訊來源。',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4293.php',
                tags: ['網站維護', '資訊發布']
            },
            {
                status: '進行中',
                title: '宿舍退宿管理系統',
                description: '旨在數位化及簡化宿舍退宿流程，從申請、檢查到核准全程線上化，減少紙本作業，提升行政效率與學生便利性。',
                tags: ['流程數位化', '行政效率']
            },
            {
                status: '進行中',
                title: '生輔組餐券管理系統',
                description: '建立一套電子餐券系統，方便學生領取、使用，並提供後台數據追蹤，協助校方精準掌握餐券發放與核銷狀況。',
                tags: ['電子票券', '數據分析']
            },
            {
                status: '規劃中',
                title: '學生會投票系統',
                description: '開發一個安全、公正、透明的線上投票平台，用於學生會選舉及重大議題投票，提升學生參與公共事務的便利性與意願。',
                tags: ['電子投票', '資訊安全']
            },
        ],
        en: [
            {
                status: 'Released',
                title: 'Scholarship Platform',
                description: 'Integrates campus and external scholarship information with an easy-to-use interface. Smart filtering and personalized recommendations improve transparency and application efficiency.',
                link: 'https://scholarship.ncuesa.org.tw',
                tags: ['Information Integration', 'User Experience', 'Campus Service']
            },
            {
                status: 'Released',
                title: 'Student Affairs RPage Site',
                description: 'We maintain and enhance the Student Affairs Division website, ensuring timely updates and accurate information for all students.',
                link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4293.php',
                tags: ['Site Maintenance', 'Information Release']
            },
            {
                status: 'In Progress',
                title: 'Dorm Checkout System',
                description: 'Digitizes and streamlines the dorm checkout process from application to approval, reducing paperwork and improving administrative efficiency.',
                tags: ['Workflow Digitalization', 'Administrative Efficiency']
            },
            {
                status: 'In Progress',
                title: 'Meal Voucher Management System',
                description: 'Creates an electronic meal voucher system with backend tracking to help the school monitor distribution and redemption.',
                tags: ['E-ticket', 'Data Analysis']
            },
            {
                status: 'Planning',
                title: 'Student Union Voting System',
                description: 'Develops a secure, fair and transparent online voting platform for elections and major issues, encouraging student participation in public affairs.',
                tags: ['E-Voting', 'Cybersecurity']
            },
        ]
    };
    const features = featureData[language];

    // 取出除精選專案外的其他專案
    const otherFeatures = features.slice(1);

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

    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <section id="projects" className="py-20 md:py-32" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* --- 區段一：介紹 (RWD 已優化) --- */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className={`phone-h1 md:pc-h1 text-heading mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {language === 'zh' ? '你的 Code，運行在校園日常' : 'Your code powers daily campus life'}
                    </h2>
                    <p className={`phone-liner md:pc-h3 text-muted max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s' }}>
                        {language === 'zh'
                            ? '我們不只打造酷炫的專案，更要解決校園的真實問題。從獎學金平台到宿舍管理系統，我們的技術真正服務於每一位同學。'
                            : 'We build not just cool projects but real solutions for campus problems. From scholarship platforms to dorm systems, our tech serves every student.'}
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
                                    {language === 'zh' ? '獎學金資訊平台' : 'Scholarship Info Platform'}
                                </h2>
                                <p className="phone-liner md:pc-liner text-muted mb-8 leading-relaxed">
                                    {language === 'zh'
                                        ? '整合校內外獎助學金資訊，提供學生一個清晰、易於操作的申請入口。透過智慧篩選與個人化推薦，讓每位同學都能找到適合的獎助學金機會。'
                                        : 'Integrates scholarship information inside and outside campus, giving students a clear and easy application entry. Smart filtering and personalized recommendations help every student find the right opportunities.'}
                                </p>
                                <h4 className="phone-liner-bold md:pc-liner-bold text-heading mb-4 font-bold">
                                    {language === 'zh' ? '技術棧' : 'Tech Stack'}
                                </h4>
                                {/* [RWD 優化] 跑馬燈在手機上會有更小的間距和圖示 */}
                                <div className="relative w-full overflow-hidden rounded-lg bg-surface/50">
                                    <div className="marquee-container flex text-foreground whitespace-nowrap">
                                        {Array.from({ length: 12 }, (_, setIndex) =>
                                            techStack.map((tech, techIndex) => (
                                                <div
                                                    key={`${setIndex}-${techIndex}`}
                                                    className="flex items-center p-3 mx-3 md:p-4 md:mx-4 flex-shrink-0 min-w-fit"
                                                    style={{ animationDelay: `${(setIndex * techStack.length + techIndex) * 0.2}s` }}
                                                >
                                                    <div className="bg-white/90 dark:bg-white rounded-full p-1.5 mr-3 shadow-sm">
                                                        <Image src={tech.icon} alt={tech.name} width={40} height={40} className="h-6 w-6 md:h-8 md:w-8" />
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
                            {/* [RWD 優化] 確保卡片在所有螢幕尺寸下都能正確顯示 */}
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
                                        <p className="font-semibold text-sm md:text-base text-white leading-tight mb-1 px-2">{language === 'zh' ? '獎學金平台' : 'Scholarship Platform'}</p>
                                        <p className="text-xs md:text-sm text-white/90 px-2">{language === 'zh' ? '點擊訪問' : 'Visit site'}</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 區段三：更多專案 (RWD 已優化) --- */}
                <div className={`grid grid-cols-1 md:grid-cols-2 ${columnClass} gap-6 md:gap-8 mb-16 md:mb-24`}>
                    {otherFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={`bg-surface rounded-2xl border border-border p-6 flex flex-col transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
                        >
                            {/* 卡片內容保持不變，它的 RWD 已經做得很好 */}
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="phone-h3 md:pc-h3 text-heading font-bold leading-tight">{feature.title}</h3>
                                {(() => {
                                    const statusClass =
                                        feature.status === '已上線' || feature.status === 'Released'
                                            ? 'bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                            : feature.status === '進行中' || feature.status === 'In Progress'
                                                ? 'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                                                : 'bg-gray-500/20 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
                                    return (
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusClass}`}>
                                            {feature.status}
                                        </span>
                                    );
                                })()}
                            </div>
                            <p className="phone-liner md:pc-liner text-muted mb-4 leading-relaxed flex-grow">{feature.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {feature.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-brand/10 text-brand text-xs rounded">{tag}</span>
                                ))}
                            </div>
                            {feature.link && (
                                <a href={feature.link} target="_blank" rel="noopener noreferrer" className="phone-liner-bold text-brand hover:text-brand-accent font-medium transition-colors group flex items-center mt-auto">
                                    {language === 'zh' ? '查看專案' : 'View Project'}
                                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* --- 區段四：CTA 按鈕 (RWD 已優化) --- */}
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