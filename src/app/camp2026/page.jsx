
import Navbar from '@/components/Navbar';
import JoinUs from '@/components/JoinUs';
import Camp2026 from '@/components/camp2026/Camp2026';

export const metadata = {
    title: "AI 程式公益營 | GDG On Campus NCUE x 中崙高中",
    description: "2026 寒假 AI 程式公益營，由中崙高中資訊研習社與 GDG On Campus NCUE 聯合舉辦。從零開始學習 Python 與 AI，全程免費，立即報名！",
    keywords: ["AI公益營", "程式營隊", "中崙高中", "GDG NCUE", "Python教學", "寒假營隊", "免費營隊"],
    openGraph: {
        title: "AI 程式公益營 | GDG On Campus NCUE x 中崙高中",
        description: "2026 寒假 AI 程式公益營，帶你從零開始探索 AI 與程式設計的世界！",
        url: "https://gdg.ncuesa.org.tw/camp2026",
        siteName: "GDG On Campus NCUE",
        images: [
            {
                url: "https://gdg.ncuesa.org.tw/images/camp2026/poster.png", // Assuming poster.png is the main image
                width: 1200,
                height: 630,
                alt: "AI 程式公益營",
            },
        ],
        locale: "zh_TW",
        type: "website",
    },
};

export default function CampPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Camp2026 />
            <JoinUs />
        </main>
    );
}
