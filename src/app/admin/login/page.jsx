'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GoogleLogo from '@/images/icon/GDG_icon.png';
import { SparklesIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!isSupabaseConfigured) return;

        const checkUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    router.push('/admin/dashboard');
                }
            } catch (err) {
                console.error('Session check failed:', err);
            }
        };
        checkUser();
    }, [router]);

    const handleLogin = async () => {
        if (!isSupabaseConfigured) {
            setError('Supabase is not configured. Please check environment variables.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/admin/dashboard`,
                },
            });
            if (error) throw error;
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4 relative overflow-hidden select-none">
            {/* 導覽與返回 - 調整位置，在電腦版往中間靠攏一點 */}
            <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20">
                <Link 
                    href="/" 
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 bg-white/80 hover:bg-white px-5 py-2.5 rounded-2xl backdrop-blur-md border border-gray-200 shadow-sm transition-all text-sm font-bold"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>返回首頁</span>
                </Link>
            </div>

            {/* 背景裝飾 */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden p-10 lg:p-12 transition-all relative">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-sm mb-8 p-5 border border-gray-50 relative group">
                        <div className="absolute inset-0 bg-brand/5 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                        <Image 
                            src={GoogleLogo} 
                            alt="GDG Logo" 
                            width={80} 
                            height={80} 
                            className="object-contain relative z-10"
                        />
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <SparklesIcon className="w-4 h-4 text-brand" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Admin Portal</h2>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">管理員登入</h1>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-500 leading-relaxed">
                            歡迎來到 Google Developer Groups
                        </p>
                        <p className="text-sm font-black text-blue-600 tracking-wide uppercase">
                            on Campus NCUE
                        </p>
                        <p className="text-sm font-bold text-gray-500 mt-4 px-4">
                            請使用授權的 Google 帳號進行驗證，以進入證書管理系統。
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-600 text-sm font-bold animate-shake">
                        身分驗證失敗：{error}
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full group relative flex items-center justify-center gap-x-3 bg-gray-900 hover:bg-black text-white font-black px-6 py-4.5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
                >
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000"></div>
                    
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <div className="bg-white p-1 rounded-lg shadow-sm">
                                <svg className="w-5 h-5" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                </svg>
                            </div>
                            <span className="tracking-wide text-base">使用 Google 帳號登入</span>
                        </>
                    )}
                </button>

                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <p className="text-[11px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest">
                        Authorized Personnel Only
                    </p>
                </div>
            </div>
        </div>
    );
}
