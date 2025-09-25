import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import ScrollToTop from '@/components/ScrollToTop';
import { LanguageProvider } from '@/hooks/useLanguage';
import { ThemeProvider } from '@/hooks/useTheme';

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ['300', '400', '600', '700'],
});

export const metadata = {
  // 基礎設定
  title: "GDG On Campus NCUE",
  description: "我們相信程式碼是構築未來的原力，致力於透過前沿技術分享與專案實作，將一行行指令化為解決校園問題的真實影響力。我們連結所有懷抱熱情的開發者，在此一同激盪、成長與創新。",
  keywords: ["GDG On Campus NCUE", "Build with AI", "GDG", "NCUE 社團", "彰師 社團", "彰化師範大學 社團", "彰師 Google", "GDG", "GDG NCUE", "彰師", "Google Developer Group", "ncue", "中部 技術社群", "開發者社群", "NCUE GDG"],

  // PWA & Web App
  manifest: "/manifest.json",
  
  // 改善的 viewport 設定
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",

  // Open Graph (OG)
  openGraph: {
    title: "GDG On Campus NCUE",
    description: "我們相信程式碼是構築未來的原力，致力於透過前沿技術分享與專案實作，將一行行指令化為解決校園問題的真實影響力。我們連結所有懷抱熱情的開發者，在此一同激盪、成長與創新。",
    url: "https://gdg.ncuesa.org.tw",
    siteName: "GDG On Campus NCUE",
    images: [
      {
        url: "https://gdg.ncuesa.org.tw/GDG_icon.png",
        width: 1920,
        height: 390,
        alt: "GDG On Campus NCUE",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "GDG On Campus NCUE",
    description: "我們相信程式碼是構築未來的原力，致力於透過前沿技術分享與專案實作，將一行行指令化為解決校園問題的真實影響力。",
    images: ["https://gdg.ncuesa.org.tw/GDG_icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        {/* 在載入前設定語言 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var lang = localStorage.getItem('language');
                  if (!lang) {
                    var userLang = navigator.language || 'en';
                    lang = userLang.startsWith('zh') ? 'zh' : 'en';
                    localStorage.setItem('language', lang);
                  }
                  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${sourceSans.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="fixed inset-0 -z-20 h-full w-full bg-background [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            {children}
            <ScrollToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
