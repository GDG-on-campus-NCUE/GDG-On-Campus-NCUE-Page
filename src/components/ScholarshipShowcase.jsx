'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
    ArrowTopRightOnSquareIcon,
    ArrowTrendingUpIcon,
    GlobeAltIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';

const SITE_URL = 'https://scholarship.ncuesa.org.tw';
const DOMAIN = 'scholarship.ncuesa.org.tw';

const IMAGES = [
    '/project/p01.webp',
    '/project/p02.webp',
    '/project/p03.webp',
    '/project/p04.webp',
    '/project/p05.webp',
    '/project/p06.webp',
    '/project/p07.webp',
];

const COPY = {
    zh: {
        eyebrow: '精選專案',
        title: '獎助學金資訊平台',
        desc: '導入 AI 技術，協助政府機關優化內部行政工作流程，實際有感提升行政效率達 99.8%。平台完整符合校方資安法規與政府數位治理規範，受資策會邀請參展 COMPUTEX 2026，目前持續與全台多所學校洽談合作中。',
        tags: ['數位治理', 'AI 轉型', '開源專案'],
        cta: '線上展示',
        stat: '99.8%',
        statLabel: '效率提升',
        badgeTitle: 'COMPUTEX 2026',
        badgeDesc: '資策會邀請參展',
        scrollHint: '繼續滾動瀏覽截圖',
        showcase: [
            { title: '公告總覽', desc: '分類代碼搭配搜尋篩選，全校獎學金資訊一目瞭然' },
            { title: 'AI 獎學金助理', desc: '內部知識庫優先、外部網路補強，AI 統整生成引述來源的可信答覆' },
            { title: '公告詳情', desc: '申請資格、金額名額、應繳文件一次看懂，一鍵寄送到信箱' },
            { title: '管理後台', desc: '公告上下架、編輯與追蹤全面數位化，行政作業不再繁瑣' },
            { title: '數據洞察', desc: '瀏覽趨勢與公告統計即時呈現，掌握平台使用狀況' },
            { title: '系統設定', desc: 'API 金鑰集中管理，安全且彈性的系統配置' },
            { title: '群發通知', desc: '富文字編輯即時預覽，一鍵通知所有使用者' },
        ],
    },
    en: {
        eyebrow: 'Featured Project',
        title: 'Scholarship Information Platform',
        desc: 'AI-powered platform that streamlines government administrative workflows, achieving a 99.8% improvement in administrative efficiency. Fully compliant with institutional cybersecurity regulations, invited to exhibit at COMPUTEX 2026, and currently in active negotiation with multiple universities nationwide.',
        tags: ['Digital Governance', 'AI Transformation', 'Open Source Project'],
        cta: 'Live Demo',
        stat: '99.8%',
        statLabel: 'Efficiency Gain',
        badgeTitle: 'COMPUTEX 2026',
        badgeDesc: 'Invited Exhibitor',
        scrollHint: 'Keep scrolling to browse screenshots',
        showcase: [
            { title: 'Announcements Hub', desc: 'Category codes with search and filters — every scholarship at a glance' },
            { title: 'AI Scholarship Assistant', desc: 'Internal knowledge first, web search as fallback — synthesized answers with cited sources' },
            { title: 'Announcement Details', desc: 'Eligibility, amounts and required documents in one view — sent to your inbox in one click' },
            { title: 'Admin Console', desc: 'Publish, edit and track announcements — administration fully digitized' },
            { title: 'Insights Dashboard', desc: 'Real-time view trends and totals reveal how the platform is used' },
            { title: 'System Settings', desc: 'Centralized, secure and flexible API key management' },
            { title: 'Bulk Notifications', desc: 'Rich-text editing with live preview — notify every user in one click' },
        ],
    },
};

/** 瀏覽器外框 + 交叉淡入的截圖。切換時帶一點縮放與模糊，做出對焦感。 */
function BrowserMockup({ index, alt }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-3 flex h-5 max-w-[260px] flex-1 items-center rounded-md bg-[var(--background)] px-3">
                    <span className="truncate text-xs text-[var(--muted)]">{DOMAIN}</span>
                </span>
            </div>

            <div className="relative aspect-[16/10]">
                {IMAGES.map((src, i) => (
                    <div
                        key={src}
                        aria-hidden={i !== index}
                        className={`absolute inset-0 transition-all duration-500 ease-out ${
                            i === index ? 'scale-100 opacity-100 blur-0' : 'scale-[1.04] opacity-0 blur-md'
                        }`}
                    >
                        <Image
                            src={src}
                            alt={`${alt} — ${i + 1}`}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={i === 0}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

/** 進度圓點與 01 / 07 計數器。 */
function Progress({ index }) {
    return (
        <>
            <div className="mt-3 flex items-center justify-center gap-1.5">
                {IMAGES.map((src, i) => (
                    <span
                        key={src}
                        className={`h-1 rounded-full transition-all duration-500 ${
                            i === index ? 'w-7 bg-[#4285f4]' : 'w-2 bg-[var(--border)]'
                        }`}
                    />
                ))}
            </div>
            <p className="mt-2 text-center font-mono text-xs text-[var(--muted)]">
                {String(index + 1).padStart(2, '0')} / {String(IMAGES.length).padStart(2, '0')}
            </p>
        </>
    );
}

function Badge({ copy, className = '' }) {
    return (
        <div
            className={`flex w-fit items-center gap-3 rounded-2xl border border-[#4285f4]/30 bg-[var(--surface)] px-4 py-3 shadow-[0_12px_40px_rgba(66,133,244,0.2)] ${className}`}
        >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4285f4] text-white">
                <TrophyIcon className="h-4 w-4" />
            </span>
            <span>
                <span className="block text-sm font-bold leading-tight text-[var(--foreground)]">{copy.badgeTitle}</span>
                <span className="block text-xs text-[var(--muted)]">{copy.badgeDesc}</span>
            </span>
        </div>
    );
}

export default function ScholarshipShowcase() {
    const { language } = useLanguage();
    const copy = COPY[language] ?? COPY.zh;

    const sectionRef = useRef(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [activeImg, setActiveImg] = useState(0);

    // 只渲染其中一種版型，避免行動版與桌機版同時載入兩份截圖
    useEffect(() => {
        const query = window.matchMedia('(min-width: 1024px)');
        const sync = () => setIsDesktop(query.matches);
        sync();
        query.addEventListener('change', sync);
        return () => query.removeEventListener('change', sync);
    }, []);

    // 桌機：用捲動進度決定目前顯示第幾張截圖
    useEffect(() => {
        if (!isDesktop) return undefined;
        const el = sectionRef.current;
        if (!el) return undefined;

        let frame = 0;
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const scrollable = rect.height - window.innerHeight;
                if (scrollable <= 0) return;
                const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
                // 頭尾各留一段停留區間，避免第一張與最後一張一閃而過
                const eased = Math.min(1, Math.max(0, (progress - 0.08) / 0.8));
                setActiveImg(Math.min(IMAGES.length - 1, Math.floor(eased * IMAGES.length)));
            });
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [isDesktop]);

    // 行動版：定時自動輪播
    useEffect(() => {
        if (isDesktop) return undefined;
        const timer = setInterval(() => setActiveImg((prev) => (prev + 1) % IMAGES.length), 3500);
        return () => clearInterval(timer);
    }, [isDesktop]);

    const tags = (
        <div className="flex flex-wrap gap-2">
            {copy.tags.map((tag) => (
                <span
                    key={tag}
                    className="rounded-full border border-[#4285f4]/30 bg-[#4285f4]/10 px-3 py-1 text-xs font-semibold text-[#4285f4]"
                >
                    {tag}
                </span>
            ))}
        </div>
    );

    const heading = (
        <h3 className="text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] md:text-4xl lg:text-[2.4rem]">
            {copy.title}
        </h3>
    );

    const ctaRow = (
        <div className="flex flex-wrap items-center gap-3">
            <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#4285f4] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4285f4]/35 transition-shadow hover:shadow-xl hover:shadow-[#4285f4]/50"
            >
                <GlobeAltIcon className="h-4 w-4" />
                {copy.cta}
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>

            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
                <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-bold text-[var(--foreground)]">{copy.stat}</span>
                <span className="text-xs text-[var(--muted)]">{copy.statLabel}</span>
            </div>
        </div>
    );

    /** 隨捲動切換的敘述段落，對應目前這張截圖 */
    const storyBeat = (
        <div
            key={activeImg}
            className="flex min-h-[7.5rem] animate-[beat-in_0.35s_ease-out] flex-col justify-center border-l-[3px] border-[#4285f4] pl-4"
        >
            <div className="mb-2 flex items-baseline gap-3">
                <span className="font-mono text-sm text-[#4285f4]">{String(activeImg + 1).padStart(2, '0')}</span>
                <p className="text-xl font-bold text-[var(--foreground)]">{copy.showcase[activeImg]?.title}</p>
            </div>
            <p className="text-base leading-relaxed text-[var(--muted)]">{copy.showcase[activeImg]?.desc}</p>
        </div>
    );

    /* ---------------------------- 行動版 ---------------------------- */
    if (!isDesktop) {
        return (
            <div className="mb-16 md:mb-24">
                <div className="flex flex-col gap-5">
                    {tags}
                    {heading}
                    <p className="text-base leading-loose text-[var(--muted)]">{copy.desc}</p>
                    {ctaRow}
                </div>

                <div className="mt-10">
                    <BrowserMockup index={activeImg} alt={copy.title} />
                    <div key={activeImg} className="mt-4 min-h-[3.5rem] animate-[beat-in_0.3s_ease-out] px-2 text-center">
                        <p className="text-sm font-bold text-[var(--foreground)]">{copy.showcase[activeImg]?.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{copy.showcase[activeImg]?.desc}</p>
                    </div>
                    <Progress index={activeImg} />
                    <Badge copy={copy} className="mx-auto mt-6" />
                </div>
            </div>
        );
    }

    /* ---------------------------- 桌機版 ---------------------------- */
    return (
        <div ref={sectionRef} className="relative" style={{ height: `${(IMAGES.length + 1) * 70}vh` }}>
            {/* 不能加 overflow-hidden：左下的 COMPUTEX 徽章刻意往外偏移 -left-4，
                一旦裁切就會被切掉左半邊。這層也沒有需要裁切的背景效果。 */}
            <div className="sticky top-0 flex h-screen w-full items-center">
                <div className="relative z-10 w-full">
                    <div className="grid grid-cols-2 items-center gap-14">
                        <div className="order-2 flex flex-col gap-5">
                            {tags}
                            {heading}
                            {storyBeat}
                            {ctaRow}
                        </div>

                        <div className="relative order-1">
                            <BrowserMockup index={activeImg} alt={copy.title} />
                            <Progress index={activeImg} />
                            <Badge copy={copy} className="absolute -bottom-6 -left-4 animate-[badge-float_4s_ease-in-out_infinite]" />
                        </div>
                    </div>
                </div>

                <p className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[hint-pulse_2s_ease-in-out_infinite] text-base font-medium text-[var(--muted)]">
                    ↓ {copy.scrollHint}
                </p>
            </div>
        </div>
    );
}
