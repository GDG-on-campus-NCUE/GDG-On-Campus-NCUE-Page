import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Vision from '@/components/Vision';
import Events from '@/components/Events';
import Projects from '@/components/Projects';
import Calendar from '@/components/Calendar';
import JoinUs from '@/components/JoinUs';

export default function Home() {
  return (
    <main className="min-h-screen select-none">
      {/* 禁止首頁文字與圖示被選取 */}
      <Navbar />
      <Hero />
      <Vision />
      <Events />
      <Projects />
      <Calendar />
      <JoinUs />
    </main>
  );
}
