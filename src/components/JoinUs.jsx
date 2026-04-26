'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import githubIcon from '@/images/icon/github.png';
import instagramIcon from '@/images/icon/instagram.png';
import gdgCommunityIcon from '@/images/icon/GDG_icon.png';

function GmailIcon({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
            <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
            <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
            <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
            <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
            <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
        </svg>
    );
}

export default function JoinUs() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const { language } = useLanguage();

    const socialLinks = [
        { name: 'GitHub', icon: githubIcon, url: 'https://github.com/GDG-on-campus-NCUE', isImage: true },
        { name: 'Instagram', icon: instagramIcon, url: 'https://www.instagram.com/gdg_ncue', isImage: true },
        { name: 'Mail', icon: GmailIcon, url: 'https://groups.google.com/a/ncuesa.org.tw/g/gdg', isImage: false },
        { name: 'GDG Official', icon: gdgCommunityIcon, url: 'https://gdg.community.dev/gdg-on-campus-national-changhua-university-of-education-changhua-city-taiwan/', isImage: true },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current) };
    }, []);

    return (
        <section id="join" className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden" ref={ref}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* 左側文字內容 */}
                    <div className={`lg:col-span-7 space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-brand"></span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-muted">Join Our Community</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-extrabold text-[#111827] dark:text-white tracking-tighter leading-[1.05]">
                                {language === 'zh' ? '用程式碼' : 'Define the future'}
                                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-brand dark:to-blue-400 bg-clip-text text-transparent mt-2">
                                    {language === 'zh' ? '定義彰師未來' : 'with your code'}
                                </span>
                            </h2>
                        </div>
                        
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium">
                            {language === 'zh' 
                                ? '無論你的起點在哪，只要對技術懷抱熱情，渴望將想法付諸實踐，這裡就是你連結同好、共同成長的最佳社群。' 
                                : 'Whether you are just starting or already an expert, if you are passionate about technology, this is the community to connect and grow.'}
                        </p>
                        
                        <a 
                            href="https://gdg.community.dev/gdg-on-campus-national-changhua-university-of-education-changhua-taiwan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black px-10 py-5 rounded-2xl font-bold transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                        >
                            <span>{language === 'zh' ? '立即加入社群' : 'Join Us Now'}</span>
                            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>

                    {/* 右側社交卡片群 */}
                    <div className={`lg:col-span-5 grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        {socialLinks.map((social, idx) => (
                            <div key={social.name} className={`${idx % 2 === 1 ? 'lg:translate-y-12' : ''}`}>
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:bg-white dark:hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-500"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">
                                        {social.isImage ? (
                                            <Image src={social.icon} alt={social.name} width={36} height={36} className="object-contain dark:brightness-110" />
                                        ) : (
                                            <social.icon className="w-9 h-9 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-brand" />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-base font-bold text-gray-900 dark:text-gray-100">{social.name}</span>
                                        <span className="block text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">Connect</span>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
