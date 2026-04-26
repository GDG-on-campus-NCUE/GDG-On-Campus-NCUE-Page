'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import gdgIcon from '@/images/icon/GDG_icon.png';
import gdgLogoDark from '@/images/icon/GDG_On_Campus_dark.png';
import gdgLogoLight from '@/images/icon/GDG_On_Campus_light.png';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

export default function Footer() {
    const { language } = useLanguage();
    const { theme } = useTheme();

    const sections = {
        resources: language === 'zh' 
            ? { title: '社群資源', links: [
                { label: '關於我們', href: '#vision' },
                { label: '活動回顧', href: '#events' },
                { label: '開源專案', href: '#projects' },
                { label: '年度行程', href: '#calendar' },
            ]}
            : { title: 'Resources', links: [
                { label: 'About Us', href: '#vision' },
                { label: 'Past Events', href: '#events' },
                { label: 'Projects', href: '#projects' },
                { label: 'Schedule', href: '#calendar' },
            ]},
        management: language === 'zh'
            ? { title: '網站管理', links: [
                { label: '管理員後台登入', href: '/admin/login' },
            ]}
            : { title: 'Management', links: [
                { label: 'Admin Portal', href: '/admin/login' },
            ]}
    };

    const partners = [
        { src: '/Google.png', alt: 'Google', href: 'https://google.com', scale: 'scale-[0.8] sm:scale-[0.9]' },
        { src: '/BlendED.png', alt: 'BlendED', href: 'https://program.blendedlearn.org', scale: 'scale-[1.0] sm:scale-[1.1]' },
        { src: theme === 'dark' ? '/sa_logo_white.png' : '/sa_logo_black.png', alt: 'SA', href: 'https://ncuesa.ncue.edu.tw/', scale: 'scale-[1.1] sm:scale-[1.6]' },
        { name: 'OpenTPI', href: 'https://tpi.dev/', scale: 'scale-[1.3] sm:scale-[1.5]' } 
    ];

    return (
        <footer className="relative pt-24 pb-12 bg-transparent dark:bg-transparent border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    
                    {/* 品牌區塊 */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="flex items-center gap-5">
                            <Image 
                                src={theme === 'dark' ? gdgLogoDark : gdgLogoLight} 
                                alt="GDG On Campus NCUE" 
                                width={400} 
                                height={80} 
                                className="h-16 w-auto object-contain"
                            />
                        </div>
                        
                        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm font-medium transition-colors">
                            {language === 'zh' 
                                ? '我們是彰化師範大學的 Google 開發者社群，致力於推廣前沿技術，透過專案實作與知識共享，連結在地開發者，共同創造影響力。' 
                                : 'Google Developer Group on Campus at NCUE. We empower students to build real-world solutions through Google technology.'}
                        </p>

                        <a href="mailto:gdg-core@ncuesa.org.tw" className="group flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-brand transition-all w-fit">
                            <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-brand group-hover:text-white transition-all shadow-sm">
                                <EnvelopeIcon className="w-5 h-5" />
                            </div>
                            <span className="font-bold">gdg-core@ncuesa.org.tw</span>
                        </a>
                    </div>

                    {/* 快速連結區塊 */}
                    <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-8">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">{sections.resources.title}</h3>
                            <ul className="space-y-4">
                                {sections.resources.links.map(link => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white font-bold transition-all inline-block hover:translate-x-1">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:mt-8">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">{sections.management.title}</h3>
                            <ul className="space-y-4">
                                {sections.management.links.map(link => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white font-bold transition-all inline-block hover:translate-x-1">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 合作夥伴區塊 */}
                    <div className="lg:col-span-4 space-y-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">
                            {language === 'zh' ? '我們的夥伴' : 'Our Partners'}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {partners.map((p, i) => (
                                <a 
                                    key={i} 
                                    href={p.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="relative h-24 bg-gray-50 dark:bg-white/[0.03] rounded-2xl flex items-center justify-center overflow-hidden group hover:bg-white dark:hover:bg-white/[0.08] hover:shadow-2xl dark:hover:shadow-brand/5 transition-all duration-500 border border-transparent hover:border-gray-100 dark:hover:border-white/10"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-200/20 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className={`relative transition-all duration-500 ${p.scale}`}>
                                        {p.src ? (
                                            <Image 
                                                src={p.src} 
                                                alt={p.alt} 
                                                width={160} 
                                                height={80} 
                                                className="max-w-[100px] sm:max-w-[120px] max-h-[50px] object-contain dark:brightness-125 dark:contrast-125 transition-all" 
                                            />
                                        ) : (
                                            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter opacity-80 group-hover:opacity-100 transition-all">OpenTPI</span>
                                        )}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-400 tracking-widest transition-colors">
                        © {new Date().getFullYear()} GDG On Campus NCUE. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
