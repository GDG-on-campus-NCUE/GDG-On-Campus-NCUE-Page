'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
    CheckCircleIcon, 
    XCircleIcon, 
    CalendarIcon, 
    UserIcon, 
    TrophyIcon,
    IdentificationIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/solid';
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

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-surface-muted">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-muted font-medium">安全驗證中...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-surface-muted py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header Logo */}
                <div className="flex justify-center mb-10">
                    <Image
                        src={theme === 'dark' ? gdgLogoDark : gdgLogoLight}
                        alt="GDG Logo"
                        width={300}
                        height={60}
                        className="h-12 w-auto object-contain"
                    />
                </div>

                {cert ? (
                    <div className="animate-fade-in-up">
                        {/* 驗證成功卡片 */}
                        <div className="bg-surface border-2 border-brand/20 rounded-3xl shadow-2xl overflow-hidden mb-8">
                            <div className="bg-brand/5 py-8 px-6 text-center border-b border-brand/10">
                                <CheckCircleIcon className="w-20 h-20 text-brand mx-auto mb-4" />
                                <h1 className="text-3xl font-extrabold text-heading mb-2">證書驗證成功</h1>
                                <p className="text-brand font-semibold flex items-center justify-center gap-x-2">
                                    <ShieldCheckIcon className="w-5 h-5" />
                                    此證書由 GDG On Campus NCUE 官方認證
                                </p>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-x-4">
                                            <UserIcon className="w-6 h-6 text-muted mt-1" />
                                            <div>
                                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">獲證者姓名</p>
                                                <p className="text-xl font-bold text-heading">{cert.recipient_name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-x-4">
                                            <TrophyIcon className="w-6 h-6 text-muted mt-1" />
                                            <div>
                                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">活動名稱</p>
                                                <p className="text-xl font-bold text-heading">{cert.event_name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-x-4">
                                            <IdentificationIcon className="w-6 h-6 text-muted mt-1" />
                                            <div>
                                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">證書編號</p>
                                                <p className="text-lg font-mono text-heading">{cert.cert_number}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-x-4">
                                            <CalendarIcon className="w-6 h-6 text-muted mt-1" />
                                            <div>
                                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">發放日期</p>
                                                <p className="text-lg text-heading">{cert.issue_date}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {cert.image_url && (
                                        <div className="relative group">
                                            <div className="absolute -inset-2 bg-gradient-to-tr from-brand to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <div className="relative aspect-[4/3] bg-surface-muted rounded-xl border border-border overflow-hidden">
                                                <img 
                                                    src={cert.image_url} 
                                                    alt="Certificate Preview" 
                                                    className="w-full h-full object-cover cursor-zoom-in"
                                                    onClick={() => window.open(cert.image_url, '_blank')}
                                                />
                                            </div>
                                            <p className="text-center text-xs text-muted mt-3 italic">點擊查看證書原圖</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="text-center md:text-left">
                                        <p className="text-xs text-muted font-mono break-all">
                                            數位簽章: {cert.id}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => window.print()}
                                        className="bg-heading text-surface px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
                                    >
                                        列印驗證結果
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-muted text-sm">
                            如有任何疑問，請聯絡 <a href="mailto:gdg-core@ncuesa.org.tw" className="text-brand hover:underline">gdg-core@ncuesa.org.tw</a>
                        </p>
                    </div>
                ) : (
                    <div className="animate-fade-in-up text-center">
                        <div className="bg-surface border-2 border-accent/20 rounded-3xl shadow-2xl p-12">
                            <XCircleIcon className="w-24 h-24 text-accent mx-auto mb-6" />
                            <h1 className="text-3xl font-extrabold text-heading mb-4">驗證失敗</h1>
                            <p className="text-muted text-lg mb-8">
                                找不到此證書編號，請確認您掃描的 QR Code 是否正確。<br />
                                如果您認為這是個錯誤，請與我們聯繫。
                            </p>
                            <a 
                                href="/" 
                                className="inline-flex items-center justify-center bg-brand text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all"
                            >
                                回到首頁
                            </a>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Background elements */}
            <div className="fixed inset-0 -z-10 pointer-events-none opacity-50">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(66,133,244,0.05),transparent)]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(219,68,55,0.05),transparent)]"></div>
            </div>
        </div>
    );
}
