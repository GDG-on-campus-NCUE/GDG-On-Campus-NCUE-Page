import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Vision from '@/components/Vision';
import Events from '@/components/Events';
import Projects from '@/components/Projects';
import Calendar from '@/components/Calendar';
import JoinUs from '@/components/JoinUs';

export default function Home() {
  return (
    <main className="min-h-screen">
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
