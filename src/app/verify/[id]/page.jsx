'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
    CheckBadgeIcon, 
    XCircleIcon, 
    CalendarIcon, 
    UserIcon, 
    AcademicCapIcon,
    IdentificationIcon,
    ShieldCheckIcon,
    ArrowDownTrayIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';
import gdgLogoDark from '@/images/icon/GDG_On_Campus_dark.png';
import gdgLogoLight from '@/images/icon/GDG_On_Campus_light.png';
import { useTheme } from '@/hooks/useTheme';

export default function VerifyCertificate() {
    const { id } = useParams();
    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchCertificate = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('certificates')
                .select('*')
                .eq('id', id)
                .single();
            
            if (!error) setCert(data);
            setLoading(false);
        };
        if (id) fetchCertificate();
    }, [id]);

    const handleDownload = async () => {
        if (!cert?.image_url) return;
        
        try {
            const response = await fetch(cert.image_url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Certificate-${cert.cert_number || 'GDG'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
            window.open(cert.image_url, '_blank');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Verifying credentials...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 lg:py-0 lg:flex lg:flex-col lg:justify-center px-4 sm:px-6 lg:px-8 selection:bg-blue-100 dark:selection:bg-blue-900 select-none">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header Logo */}
                <div className="flex justify-center mb-8 lg:mb-10 transform transition-transform hover:scale-[1.02] duration-500">
                    <Image
                        src={theme === 'dark' ? gdgLogoDark : gdgLogoLight}
                        alt="GDG Logo"
                        width={600}
                        height={120}
                        className="h-12 md:h-20 lg:h-24 w-auto object-contain"
                        priority
                    />
                </div>

                {cert ? (
                    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Status Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-6 lg:py-8 px-6 text-center">
                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                    <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[200%] bg-white rotate-12 blur-3xl"></div>
                                </div>
                                
                                <CheckBadgeIcon className="w-12 h-12 lg:w-16 lg:h-16 text-white mx-auto mb-3 drop-shadow-lg" />
                                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight">Credential Verified</h1>
                                <div className="flex items-center justify-center gap-2 text-blue-50 font-medium text-xs lg:text-sm">
                                    <ShieldCheckIcon className="w-4 h-4" />
                                    <span>Officially authenticated by GDG on Campus NCUE</span>
                                </div>
                            </div>

                            <div className="p-6 lg:p-10">
                                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                    <div className="space-y-6 lg:space-y-8">
                                        <div className="grid gap-4 lg:gap-6">
                                            <DetailItem 
                                                icon={UserIcon} 
                                                label="Recipient Name" 
                                                value={cert.recipient_name} 
                                            />
                                            <DetailItem 
                                                icon={AcademicCapIcon} 
                                                label="Certificate Name" 
                                                value={cert.event_name} 
                                            />
                                            <DetailItem 
                                                icon={IdentificationIcon} 
                                                label="Certificate ID" 
                                                value={cert.cert_number} 
                                                isMono 
                                            />
                                            <DetailItem 
                                                icon={CalendarIcon} 
                                                label="Issue Date" 
                                                value={cert.issue_date} 
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group lg:max-w-sm mx-auto">
                                        <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                                        <div className="relative bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                                            <a 
                                                href={cert.image_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="block aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                                            >
                                                <img 
                                                    src={cert.image_url} 
                                                    alt="Certificate Preview" 
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-full text-[10px] font-bold text-slate-700 dark:text-slate-200 shadow-xl">
                                                        Click to view original
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-8 lg:mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Digital Signature</span>
                                        <code className="text-xs text-slate-500 dark:text-slate-400 break-all bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded">
                                            {cert.id}
                                        </code>
                                    </div>
                                    <button 
                                        onClick={handleDownload}
                                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-2xl font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                                    >
                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                        Download Certificate
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 text-center">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium flex items-center gap-2">
                                <EnvelopeIcon className="w-4 h-4" />
                                For inquiries, please contact <a href="mailto:gdg-core@ncuesa.org.tw" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">gdg-core@ncuesa.org.tw</a>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8 lg:p-12">
                            <div className="bg-red-50 dark:bg-red-950/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircleIcon className="w-12 h-12 text-red-500" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Verification Failed</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
                                We couldn't find a record for this certificate ID. Please verify the QR code or link you used. 
                                If you believe this is an error, please reach out to our team.
                            </p>
                            <a 
                                href="/" 
                                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Back to Home
                            </a>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Subtle background gradients */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full"></div>
            </div>
        </div>
    );
}

function DetailItem({ icon: Icon, label, value, isMono = false }) {
    return (
        <div className="flex items-start gap-4 p-1">
            <div className="mt-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                <p className={`text-lg font-bold text-slate-900 dark:text-white ${isMono ? 'font-mono tracking-tight' : ''}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}
