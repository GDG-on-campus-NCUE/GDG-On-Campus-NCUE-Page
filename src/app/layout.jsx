import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ['300', '400', '600', '700'],
});

export const metadata = {
  title: "GDG on Campus NCUE - 連結開發者，共創校園新未來",
  description: "Google Developer Groups on Campus NCUE - 我們是連結開發者、啟發創意、共創未來的技術社群",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body
        className={`${sourceSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
