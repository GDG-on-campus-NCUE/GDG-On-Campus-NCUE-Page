'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { 
    CalendarIcon, 
    MapPinIcon, 
    CurrencyDollarIcon, 
    UserGroupIcon, 
    ClockIcon, 
    BellAlertIcon, 
    MegaphoneIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ArrowRightIcon,
    SparklesIcon,
    AcademicCapIcon,
    RocketLaunchIcon,
    QuestionMarkCircleIcon,
    PauseCircleIcon,
    PlayCircleIcon
} from '@heroicons/react/24/outline';

function ScrollReveal({ children, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } ${className}`}
        >
            {children}
        </div>
    );
}

function SpotlightCard({ children, className = '' }) {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return; // disable spotlight on mobile
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl select-none ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 max-md:hidden"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export default function Camp2026() {
    const { theme } = useTheme();
    const { language } = useLanguage();
    const isDark = theme === 'dark';
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isGalleryPlaying, setIsGalleryPlaying] = useState(true);
    const [openInfoSection, setOpenInfoSection] = useState('participants');
    const galleryImages = ['chairman.jpeg', 'guide.jpeg', 'hand.jpeg', 'awards.jpg'];

    // Auto-carousel for gallery
    useEffect(() => {
        if (!isGalleryPlaying) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [galleryImages.length, isGalleryPlaying]);

    // On small screens, automatically open the first info card when scrolled into view
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.innerWidth > 768) return; // only mobile/tablet

        const section = document.getElementById('event');
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setOpenInfoSection((prev) => (prev ? prev : 'participants'));
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    // I18n Content
    const content = {
        zh: {
            hero: {
                title: "AI 程式公益營",
                subtitle: "中崙高中 × GDG On Campus NCUE",
                cta: "立即報名",
            },
            about: {
                title: "活動簡介",
                p1: "你準備好和 AI 『碼』上結盟了嗎?",
                p2: "在這個 AI 席捲全球的時代，想親手打造屬於自己的智慧應用嗎?",
                p3: "無論你是零基礎的初心者，還是已經在程式世界裡遨遊的探索者，我們都邀請你一同踏上這場「從無到有」的旅程。",
                p4: "讓程式在靜謐間展翅翱翔，讓創意與 AI 一起發光！",
                p5: "快來和我們一起「碼」上改變世界!",
                tags: ['#AI公益營', '#從零開始的AI開發生活', '#寒假不迷路']
            },
            news: {
                title: "最新消息",
                deadline: "報名截止：2026/01/07",
                date: "2026/01/09 公告",
                desc: "名額有限，欲報名者請從速！"
            },
            reminders: {
                title: "提醒事項",
                items: [
                    "請務必填寫正確的聯絡方式。",
                    "活動當天請攜帶學生證以便入場。",
                    "建議提前 15 分鐘到場簽到。"
                ]
            },
            info: {
                title: "活動資訊",
                participants: {
                    title: "參加對象",
                    items: ["全國各級國民中學在學學生。", "對程式設計、人工智慧有興趣者。"]
                },
                dateLoc: {
                    title: "日期與地點",
                    date: "2026年 1月26日 ( 一 ) 至 1月28日 ( 三 )",
                    loc: "彰化師範大學 進德校區 電腦教室二",
                    addr: "(彰化市進德路1號)",
                    fee: "全程免費",
                    note: "注意：如需訂便當，請攜帶 $300 元，於首日報到時繳交給工作人員。"
                },
                schedule: {
                    title: "行程表",
                    days: [
                        {
                            label: "1/26 ( Day 1 )",
                            rows: [
                                { time: '09:30-10:00', content: '集合、隊輔時間' },
                                { time: '10:00-10:45', content: '營隊開幕式', emphasis: true },
                                { time: '11:00-11:45', content: '破冰、1. 認識編譯器' },
                                { time: '11:45-13:00', content: '午餐與午休時光', isLunch: true },
                                { time: '13:00-13:45', content: '2. 變數與資料型別' },
                                { time: '14:00-14:45', content: '3. 輸出與基本運算' },
                                { time: '15:00-15:45', content: '4. 如何使用 Github' },
                            ],
                        },
                        {
                            label: "1/27 ( Day 2 )",
                            rows: [
                                { time: '09:30-10:00', content: '集合、隊輔時間' },
                                { time: '10:00-10:45', content: '5. Python 輸入' },
                                { time: '11:00-11:45', content: '6. 迴圈 (while)' },
                                { time: '11:45-13:00', content: '午餐與午休時光', isLunch: true },
                                { time: '13:00-13:45', content: '團康時間' },
                                { time: '14:00-14:45', content: '6. 迴圈 (for)' },
                                { time: '15:00-15:45', content: '7. 條件判斷式' },
                            ],
                        },
                        {
                            label: "1/28 ( Day 3 )",
                            rows: [
                                { time: '09:30-10:00', content: '集合、隊輔時間' },
                                { time: '10:00-10:45', content: '8. AI 操作' },
                                { time: '11:00-11:45', content: '9. GDGoC 業界小分享' },
                                { time: '11:45-13:00', content: '午餐與午休時光', isLunch: true },
                                { time: '13:00-13:45', content: '10. 遊戲常見函數' },
                                { time: '14:00-14:45', content: '11. 小遊戲實作' },
                                { time: '15:00-15:45', content: '12. 成果發表、結業', emphasis: true },
                            ],
                        },
                    ],
                }
            },
            gallery: {
                title: "歷屆活動成果"
            },
            faq: {
                title: "常見問題",
                q1: "何時開始報名？",
                a1: "即日起至 1/7 22:00 止。",
                q2: "如何知道是否報名成功？",
                a2: "我們將於 1/9 17:00 前 寄發錄取通知信至您填寫的信箱，請密切留意。"
            },
            contact: {
                title: "聯絡我們",
                emailLabel: "聯絡信箱",
                email: "zlcsc23rd@gmail.com"
            },
            organizers: {
                main: "主辦單位",
                co: "協辦單位",
                zl: "中崙高中資訊研習社",
                gdg: "GDG On Campus NCUE",
                brain: "中華民國大腦智能發展協會"
            }
        },
        en: {
            hero: {
                title: "AI Coding Camp",
                subtitle: "Zhonglun High School × GDG On Campus NCUE",
                cta: "Register Now",
            },
            about: {
                title: "About",
                p1: "Are you ready to ally with AI?",
                p2: "In this era where AI is sweeping the globe, do you want to build your own smart applications?",
                p3: "Whether you are a beginner or an explorer in the coding world, we invite you to join this journey from zero to one.",
                p4: "Let code soar in silence, and let creativity shine with AI!",
                p5: "Come and change the world with us!",
                tags: ['#AICamp', '#ZeroToHero', '#WinterCamp']
            },
            news: {
                title: "Latest News",
                deadline: "Deadline: 2026/01/07",
                date: "Announced: 2026/01/09",
                desc: "Limited spots available, register now!"
            },
            reminders: {
                title: "Reminders",
                items: [
                    "Please fill in correct contact information.",
                    "Bring your student ID for entry.",
                    "Arrive 15 minutes early for check-in."
                ]
            },
            info: {
                title: "Event Info",
                participants: {
                    title: "Participants",
                    items: ["Junior high school students nationwide.", "Those interested in programming and AI."]
                },
                dateLoc: {
                    title: "Date & Location",
                    date: "Jan 26 (Mon) - Jan 28 (Wed), 2026",
                    loc: "NCUE Jinde Campus, Computer Lab 2",
                    addr: "(No. 1, Jinde Rd., Changhua City)",
                    fee: "Free of Charge",
                    note: "Note: If you need lunch, please bring $300 NTD and pay to staff on the first day."
                },
                schedule: {
                    title: "Schedule",
                    days: [
                        {
                            label: "1/26 (Day 1)",
                            rows: [
                                { time: '09:30-10:00', content: 'Gathering' },
                                { time: '10:00-10:45', content: 'Opening Ceremony', emphasis: true },
                                { time: '11:00-11:45', content: 'Ice Breaking / 1. Compiler' },
                                { time: '11:45-13:00', content: 'Lunch Break', isLunch: true },
                                { time: '13:00-13:45', content: '2. Variables & Types' },
                                { time: '14:00-14:45', content: '3. Output & Basic Math' },
                                { time: '15:00-15:45', content: '4. Using Github' },
                            ],
                        },
                        {
                            label: "1/27 (Day 2)",
                            rows: [
                                { time: '09:30-10:00', content: 'Gathering' },
                                { time: '10:00-10:45', content: '5. Python Input' },
                                { time: '11:00-11:45', content: '6. Loops (while)' },
                                { time: '11:45-13:00', content: 'Lunch Break', isLunch: true },
                                { time: '13:00-13:45', content: 'Group Activity' },
                                { time: '14:00-14:45', content: '6. Loops (for)' },
                                { time: '15:00-15:45', content: '7. Conditionals' },
                            ],
                        },
                        {
                            label: "1/28 (Day 3)",
                            rows: [
                                { time: '09:30-10:00', content: 'Gathering' },
                                { time: '10:00-10:45', content: '8. AI Operations' },
                                { time: '11:00-11:45', content: '9. GDGoC Sharing' },
                                { time: '11:45-13:00', content: 'Lunch Break', isLunch: true },
                                { time: '13:00-13:45', content: '10. Game Functions' },
                                { time: '14:00-14:45', content: '11. Mini Game Dev' },
                                { time: '15:00-15:45', content: '12. Presentation & Closing', emphasis: true },
                            ],
                        },
                    ],
                }
            },
            gallery: {
                title: "Gallery"
            },
            faq: {
                title: "FAQ",
                q1: "When does registration start?",
                a1: "From now until 1/7 22:00.",
                q2: "How do I know if I'm accepted?",
                a2: "We will send an acceptance email by 1/9 17:00."
            },
            contact: {
                title: "Contact Us",
                emailLabel: "Email",
                email: "zlcsc23rd@gmail.com"
            },
            organizers: {
                main: "Organizers",
                co: "Co-organizer",
                zl: "Zhonglun High School IT Club",
                gdg: "GDG On Campus NCUE",
                brain: "Brain Intelligence Development Association"
            }
        }
    };

    const t = content[language] || content.zh;

    // Theme-based styles
    const cardClass = isDark 
        ? 'bg-gray-800/40 border-gray-700/50 backdrop-blur-xl' 
        : 'bg-white/60 border-white/60 backdrop-blur-xl shadow-lg';
    
    const textMain = isDark ? 'text-gray-100' : 'text-gray-800';
    const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';
    const accentColor = isDark ? 'text-blue-300' : 'text-blue-700';

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${textMain} select-none`}>
            
            {/* Background Elements - cover page but stay behind shared layout/footer */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? 'bg-[#020617]' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'}`} />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/30 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/30 rounded-full blur-[100px] animate-pulse delay-1000" />
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4">
                <ScrollReveal className="max-w-5xl mx-auto text-center">
                    <SpotlightCard className={`px-6 py-10 md:px-16 md:py-20 ${cardClass} border-2`}>
                        <div className="flex justify-center mb-6">
                            <div
                                className={`inline-flex items-center justify-center w-20 h-20 rounded-full shadow-lg ${
                                    isDark
                                        ? 'bg-blue-900/60 shadow-blue-800/40'
                                        : 'bg-white/80 shadow-blue-300/60'
                                }`}
                            >
                                <RocketLaunchIcon
                                    className={`w-10 h-10 ${accentColor}`}
                                />
                            </div>
                        </div>
                        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-blue-300 to-purple-300' : 'from-blue-600 to-purple-600'}`}>
                            {t.hero.title}
                        </h1>
                        <p className={`text-xl md:text-2xl mb-10 font-medium leading-relaxed ${textMuted}`}>
                            {t.hero.subtitle}
                        </p>
                        <a
                            href="https://forms.gle/c99YU9s1TrbLPyND7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 shadow-lg overflow-hidden ${
                                isDark 
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-blue-400 hover:shadow-blue-500/50 shadow-blue-600/30' 
                                    : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:ring-blue-600 hover:shadow-blue-600/60 shadow-blue-700/40'
                            }`}
                        >
                            <span className="relative z-10 flex items-center">
                                {t.hero.cta}
                                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                        </a>
                    </SpotlightCard>
                </ScrollReveal>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 px-4">
                <ScrollReveal className="max-w-4xl mx-auto">
                    <SpotlightCard className={`p-8 md:p-12 ${cardClass}`}>
                        <div className="flex items-center mb-8">
                            <SparklesIcon className={`w-8 h-8 mr-3 ${accentColor}`} />
                            <h2 className={`text-3xl font-bold ${textMain}`}>
                                {t.about.title}
                            </h2>
                        </div>
                        <div className={`space-y-6 text-lg leading-relaxed ${textMuted}`}>
                            <p className="font-medium text-xl">{t.about.p1}</p>
                            <p>{t.about.p2}</p>
                            <p>{t.about.p3}</p>
                            <p>{t.about.p4}</p>
                            <p className={`text-xl font-bold mt-6 ${accentColor}`}>
                                {t.about.p5}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-10">
                            {t.about.tags.map((tag) => (
                                <span key={tag} className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${isDark ? 'bg-blue-900/30 text-blue-200 hover:bg-blue-900/50' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </SpotlightCard>
                </ScrollReveal>
            </section>

            {/* News & Reminders Grid */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* News */}
                    <ScrollReveal>
                        <SpotlightCard className={`h-full p-8 ${cardClass}`}>
                            <div className="flex items-center mb-6">
                                <MegaphoneIcon className={`w-8 h-8 mr-3 ${accentColor}`} />
                                <h2 className={`text-2xl font-bold ${textMain}`}>
                                    {t.news.title}
                                </h2>
                            </div>
                            <div className={`mb-6 pb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-end mb-2">
                                    <p className="text-xl font-bold text-red-500">{t.news.deadline}</p>
                                    <p className={`text-sm ${textMuted}`}>{t.news.date}</p>
                                </div>
                            </div>
                            <p className={`text-lg ${textMain}`}>{t.news.desc}</p>
                        </SpotlightCard>
                    </ScrollReveal>

                    {/* Reminders */}
                    <ScrollReveal>
                        <SpotlightCard className={`h-full p-8 ${cardClass}`}>
                            <div className="flex items-center mb-6">
                                <BellAlertIcon className={`w-8 h-8 mr-3 ${accentColor}`} />
                                <h2 className={`text-2xl font-bold ${textMain}`}>
                                    {t.reminders.title}
                                </h2>
                            </div>
                            <ul className={`space-y-4 ${textMain}`}>
                                {t.reminders.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <CheckCircleIcon className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </SpotlightCard>
                    </ScrollReveal>
                </div>
            </section>

            {/* Event Info */}
            <section id="event" className="py-12 px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className={`text-3xl font-bold mb-10 text-center ${textMain}`}>{t.info.title}</h2>
                    
                    {/* Participants */}
                    <ScrollReveal>
                        <SpotlightCard className={`p-1 ${cardClass}`}>
                            <details
                                className="group"
                                open={openInfoSection === 'participants'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenInfoSection((prev) => (prev === 'participants' ? '' : 'participants'));
                                }}
                            >
                                <summary className={`cursor-pointer font-bold text-xl p-6 rounded-xl flex items-center justify-between select-none transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                                    <div className="flex items-center">
                                        <UserGroupIcon className={`w-6 h-6 mr-4 ${accentColor}`} />
                                        <span>{t.info.participants.title}</span>
                                    </div>
                                    <ChevronDownIcon className="w-6 h-6 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className={`px-6 pb-6 pt-2 ml-12 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-hidden transition-all duration-500 ease-out group-open:max-h-96 group-open:opacity-100 max-h-0 opacity-0`}>
                                    <ul className={`list-disc list-inside space-y-2 ${textMuted}`}>
                                        {t.info.participants.items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        </SpotlightCard>
                    </ScrollReveal>

                    {/* Date & Location */}
                    <ScrollReveal>
                        <SpotlightCard className={`p-1 ${cardClass}`}>
                            <details
                                className="group"
                                open={openInfoSection === 'dateLoc'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenInfoSection((prev) => (prev === 'dateLoc' ? '' : 'dateLoc'));
                                }}
                            >
                                <summary className={`cursor-pointer font-bold text-xl p-6 rounded-xl flex items-center justify-between select-none transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                                    <div className="flex items-center">
                                        <MapPinIcon className={`w-6 h-6 mr-4 ${accentColor}`} />
                                        <span>{t.info.dateLoc.title}</span>
                                    </div>
                                    <ChevronDownIcon className="w-6 h-6 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className={`px-6 pb-6 pt-2 ml-12 border-t space-y-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} ${textMain} overflow-hidden transition-all duration-500 ease-out group-open:max-h-[28rem] group-open:opacity-100 max-h-0 opacity-0`}>
                                    <div className="flex items-start">
                                        <CalendarIcon className={`w-5 h-5 mr-3 mt-1 ${isDark ? 'text-gray-300' : 'text-blue-500'}`} />
                                        <p><strong>{t.info.dateLoc.date}</strong></p>
                                    </div>
                                    <div className="flex items-start">
                                        <MapPinIcon className={`w-5 h-5 mr-3 mt-1 ${isDark ? 'text-gray-300' : 'text-blue-500'}`} />
                                        <div>
                                            <p><strong>{t.info.dateLoc.loc}</strong></p>
                                            <p className={`text-sm ${textMuted}`}>{t.info.dateLoc.addr}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <CurrencyDollarIcon className={`w-5 h-5 mr-3 mt-1 ${isDark ? 'text-gray-300' : 'text-blue-500'}`} />
                                        <p><strong>{t.info.dateLoc.fee}</strong></p>
                                    </div>
                                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-yellow-900/20 border-yellow-700 text-yellow-200' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
                                        <p className="text-sm flex items-start">
                                            <BellAlertIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                                            {t.info.dateLoc.note}
                                        </p>
                                    </div>
                                </div>
                            </details>
                        </SpotlightCard>
                    </ScrollReveal>

                    {/* Schedule */}
                    <ScrollReveal>
                        <SpotlightCard className={`p-1 ${cardClass}`}>
                            <details
                                className="group"
                                open={openInfoSection === 'schedule'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenInfoSection((prev) => (prev === 'schedule' ? '' : 'schedule'));
                                }}
                            >
                                <summary className={`cursor-pointer font-bold text-xl p-6 rounded-xl flex items-center justify-between select-none transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                                    <div className="flex items-center">
                                        <ClockIcon className={`w-6 h-6 mr-4 ${accentColor}`} />
                                        <span>{t.info.schedule.title}</span>
                                    </div>
                                    <ChevronDownIcon className="w-6 h-6 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-3 md:px-6 pb-6 pt-2 overflow-x-visible overflow-hidden transition-all duration-500 ease-out group-open:max-h-[70rem] group-open:opacity-100 max-h-0 opacity-0">
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
                                        {t.info.schedule.days.map((day, dayIndex) => (
                                            <div
                                                key={dayIndex}
                                                className={`rounded-2xl border shadow-sm ${
                                                    isDark
                                                        ? 'bg-gray-900/50 border-gray-700'
                                                        : 'bg-white/90 border-gray-200'
                                                }`}
                                            >
                                                <div className="px-4 py-3 border-b border-white/10">
                                                    <p className="text-sm font-semibold text-blue-400 md:text-center">
                                                        {day.label}
                                                    </p>
                                                </div>
                                                <div className="divide-y divide-gray-700/40 md:text-sm text-xs">
                                                    {day.rows.map((row, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`px-4 py-3 flex md:block items-center gap-3 ${
                                                                row.isLunch
                                                                    ? isDark
                                                                        ? 'bg-yellow-900/40 text-yellow-100'
                                                                        : 'bg-yellow-100 text-yellow-900'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <div className="w-24 md:w-full">
                                                                <p className="font-mono text-[11px] font-semibold opacity-80">
                                                                    {row.time}
                                                                </p>
                                                            </div>
                                                            <p
                                                                className={`flex-1 font-medium ${
                                                                    row.emphasis
                                                                        ? isDark
                                                                            ? 'text-blue-300'
                                                                            : 'text-blue-700'
                                                                        : ''
                                                                }`}
                                                            >
                                                                {row.content}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </details>
                        </SpotlightCard>
                    </ScrollReveal>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-12 px-4">
                <ScrollReveal className="max-w-6xl mx-auto">
                    <SpotlightCard className={`p-8 md:p-12 ${cardClass}`}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={`text-3xl font-bold ${textMain}`}>{t.gallery.title}</h2>
                            <button
                                type="button"
                                onClick={() => setIsGalleryPlaying(!isGalleryPlaying)}
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-300 transition-colors"
                            >
                                {isGalleryPlaying ? (
                                    <>
                                        <PauseCircleIcon className="w-5 h-5" />
                                        <span>Pause</span>
                                    </>
                                ) : (
                                    <>
                                        <PlayCircleIcon className="w-5 h-5" />
                                        <span>Play</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-xl">
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-opacity duration-700 ${
                                        idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <Image
                                        src={`/images/camp2026/${img}`}
                                        alt={`Gallery ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </SpotlightCard>
                </ScrollReveal>
            </section>

            {/* FAQ + Contact */}
            <section id="faq" className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-3xl font-bold mb-10 text-center ${textMain}`}>{t.faq.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <ScrollReveal>
                            <SpotlightCard className={`p-8 h-full ${cardClass} border-l-4 border-l-blue-500`}>
                                <div className="flex items-start mb-4">
                                    <QuestionMarkCircleIcon className={`w-8 h-8 mr-3 ${accentColor}`} />
                                    <h3 className={`font-bold text-xl ${textMain}`}>{t.faq.q1}</h3>
                                </div>
                                <p className={`text-lg ${textMuted}`}>{t.faq.a1}</p>
                            </SpotlightCard>
                        </ScrollReveal>
                        <ScrollReveal>
                            <SpotlightCard className={`p-8 h-full ${cardClass} border-l-4 border-l-blue-500`}>
                                <div className="flex items-start mb-4">
                                    <QuestionMarkCircleIcon className={`w-8 h-8 mr-3 ${accentColor}`} />
                                    <h3 className={`font-bold text-xl ${textMain}`}>{t.faq.q2}</h3>
                                </div>
                                <p className={`text-lg ${textMuted}`}>{t.faq.a2}</p>
                            </SpotlightCard>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal>
                        <SpotlightCard className={`p-8 md:p-10 text-center ${cardClass} border-l-4 border-l-indigo-500`}>
                            <h3 className={`text-2xl font-bold mb-3 ${textMain}`}>
                                {language === 'zh' ? '有其他問題？聯繫我們' : 'Still have questions? Contact us'}
                            </h3>
                            <p className={`mb-4 text-lg ${textMuted}`}>
                                {language === 'zh'
                                    ? `${t.contact.emailLabel}：${t.contact.email}`
                                    : `${t.contact.emailLabel}: ${t.contact.email}`}
                            </p>
                            <a
                                href={`mailto:${t.contact.email}`}
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-base md:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                            >
                                {language === 'zh' ? '寫信給我們' : 'Email us'}
                            </a>
                        </SpotlightCard>
                    </ScrollReveal>
                </div>
            </section>

            {/* Organizers - Redesigned to not look like a footer */}
            <section className="py-16 px-4">
                <ScrollReveal className="max-w-5xl mx-auto">
                    <div className={`rounded-3xl p-10 md:p-16 text-center relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-white/50'}`}>
                        <div className="grid md:grid-cols-2 gap-12 relative z-10">
                            <div>
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 shadow-md bg-blue-100 dark:bg-blue-900/60">
                                    <AcademicCapIcon className="w-8 h-8 text-blue-700 dark:text-blue-300" />
                                </div>
                                <h4 className={`font-bold text-2xl mb-4 ${textMain}`}>{t.organizers.main}</h4>
                                <ul className={`space-y-3 text-lg ${textMuted}`}>
                                    <li className="font-medium">{t.organizers.zl}</li>
                                    <li className="font-medium">{t.organizers.gdg}</li>
                                </ul>
                            </div>
                            <div>
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 shadow-md bg-purple-100 dark:bg-purple-900/60">
                                    <UserGroupIcon className="w-8 h-8 text-purple-700 dark:text-purple-300" />
                                </div>
                                <h4 className={`font-bold text-2xl mb-4 ${textMain}`}>{t.organizers.co}</h4>
                                <p className={`text-lg font-medium ${textMuted}`}>{t.organizers.brain}</p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
