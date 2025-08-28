import { Source_Sans_Pro } from "next/font/google";
import "./globals.css";

const sourceSansPro = Source_Sans_Pro({
  variable: "--font-source-sans-pro",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "GDG on Campus NCUE",
  description: "Google Developer Groups on Campus National Changhua University of Education - 連結開發者，共創校園新未來",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body
        className={`${sourceSansPro.variable} font-source-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
