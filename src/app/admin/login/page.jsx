import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeftIcon, ExclamationTriangleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import gdgIcon from '@/images/icon/GDG_icon.png';
import { getAuthConfigErrors, getSession } from '@/lib/auth';
import LoginButton from './LoginButton';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata = {
    title: '管理員登入 | GDG on Campus NCUE',
    robots: { index: false, follow: false },
};

export default async function AdminLoginPage({ searchParams }) {
    if (await getSession()) redirect('/admin/dashboard');

    const { error } = await searchParams;
    const configErrors = getAuthConfigErrors();

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-slate-900/5 blur-3xl" />
            </div>

            <Link
                href="/"
                className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 sm:left-8 sm:top-8"
            >
                <ArrowLeftIcon className="h-4 w-4" />
                返回首頁
            </Link>

            <main className="relative w-full max-w-[26rem]">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                    <div className="flex flex-col items-center text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                            <Image src={gdgIcon} alt="GDG on Campus NCUE" width={56} height={56} className="h-full w-full object-contain" />
                        </span>
                        <p className="mt-6 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            <LockClosedIcon className="h-3 w-3" />
                            Admin Portal
                        </p>
                        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">證書管理系統</h1>
                        <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                            GDG on Campus NCUE
                            <br />
                            請使用已授權的 Google 帳號登入。
                        </p>
                    </div>

                    {configErrors.length > 0 && (
                        <div className="mt-7 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3.5">
                            <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                            <div className="min-w-0 text-[12px] leading-relaxed text-amber-800">
                                <p className="font-bold">伺服器尚未完成設定</p>
                                <p className="mt-0.5 break-words">缺少環境變數：{configErrors.join('、')}</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-7 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-3.5">
                            <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                            <div className="min-w-0 text-[12px] leading-relaxed text-red-800">
                                <p className="font-bold">登入失敗</p>
                                <p className="mt-0.5 break-words">{error}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-7">
                        <LoginButton disabled={configErrors.length > 0} />
                    </div>

                    <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-400">
                        僅限管理員白名單內的帳號。若無法登入，請聯絡核心成員將你的 Google 帳號加入
                        <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 font-mono text-[10px] text-slate-500">ADMIN_EMAILS</code>
                        。
                    </p>
                </div>
            </main>
        </div>
    );
}
