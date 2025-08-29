import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ['300', '400', '600', '700'],
});

export const metadata = {
  title: "GDG on Campus NCUE | Build with AI",
  description: "不只是一場活動，而是一場技術革命的開端。回顧我們的「Build with AI 2025」：賦能每一位創造者。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${sourceSans.variable} antialiased`}>
        <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="fixed inset-0 -z-20 h-full w-full bg-background [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        {children}
      </body>
    </html>
  );
}
