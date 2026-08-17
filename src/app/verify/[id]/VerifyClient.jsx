'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
    AcademicCapIcon,
    ArrowDownTrayIcon,
    CalendarIcon,
    CheckBadgeIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    IdentificationIcon,
    ShieldCheckIcon,
    UserIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import gdgLogoDark from '@/images/icon/GDG_On_Campus_dark.png';
import gdgLogoLight from '@/images/icon/GDG_On_Campus_light.png';
import { useTheme } from '@/hooks/useTheme';

const CONTACT = 'gdg-core@ncuesa.org.tw';

function DetailItem({ icon: Icon, label, value, mono }) {
    return (
        <div className="flex items-start gap-3.5">
            <span className="mt-0.5 rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </span>
            <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{label}</p>
                <p
                    className={`mt-1 break-words text-lg font-bold text-slate-900 dark:text-white ${mono ? 'font-mono text-base tracking-tight' : ''}`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function VerifyClient({ certificate, signatureValid }) {
    const { theme } = useTheme();
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!certificate?.image_url) return;
        setDownloading(true);
        try {
            const response = await fetch(certificate.image_url);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Certificate-${certificate.cert_number}.png`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch {
            window.open(certificate.image_url, '_blank', 'noopener');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:flex lg:flex-col lg:justify-center lg:py-12">
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-8 flex justify-center lg:mb-10">
                    <Image
                        src={theme === 'dark' ? gdgLogoDark : gdgLogoLight}
                        alt="GDG on Campus NCUE"
                        width={600}
                        height={120}
                        className="h-12 w-auto object-contain md:h-16 lg:h-20"
                        priority
                    />
                </div>

                {certificate ? (
                    <div className="space-y-5">
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-slate-800 dark:bg-slate-900">
                            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-7 text-center lg:py-8">
                                <div className="pointer-events-none absolute -left-10 -top-1/2 h-[200%] w-2/5 rotate-12 bg-white/10 blur-3xl" />
                                <CheckBadgeIcon className="mx-auto mb-3 h-12 w-12 text-white drop-shadow lg:h-14 lg:w-14" />
                                <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">Credential Verified</h1>
                                <p className="mt-1.5 flex items-center justify-center gap-1.5 text-xs font-medium text-blue-50 lg:text-sm">
                                    <ShieldCheckIcon className="h-4 w-4" />
                                    Officially issued by GDG on Campus NCUE
                                </p>
                            </div>

                            <div className="p-6 lg:p-10">
                                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                                    <div className="grid gap-5">
                                        <DetailItem icon={UserIcon} label="Recipient" value={certificate.recipient_name} />
                                        <DetailItem icon={AcademicCapIcon} label="Event" value={certificate.event_name} />
                                        <DetailItem icon={IdentificationIcon} label="Certificate No." value={certificate.cert_number} mono />
                                        <DetailItem icon={CalendarIcon} label="Issue Date" value={certificate.issue_date} />
                                    </div>

                                    {certificate.image_url && (
                                        <div className="group relative mx-auto w-full lg:max-w-sm">
                                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-20 blur transition-opacity duration-500 group-hover:opacity-30" />
                                            <a
                                                href={certificate.image_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative block overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
                                            >
                                                <img
                                                    src={certificate.image_url}
                                                    alt={`${certificate.recipient_name} 的證書`}
                                                    className="aspect-[1.414/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                />
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-slate-100 pt-6 dark:border-slate-800 md:flex-row md:items-center lg:mt-10">
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                                            Integrity Check
                                        </p>
                                        <p
                                            className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                                                signatureValid
                                                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900'
                                                    : 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900'
                                            }`}
                                        >
                                            {signatureValid ? (
                                                <ShieldCheckIcon className="h-3.5 w-3.5" />
                                            ) : (
                                                <ExclamationTriangleIcon className="h-3.5 w-3.5" />
                                            )}
                                            {signatureValid ? '簽章驗證通過，內容未被竄改' : '簽章無法驗證，請聯絡核發單位'}
                                        </p>
                                        <p className="mt-2 break-all font-mono text-[11px] text-slate-400 dark:text-slate-500">
                                            {certificate.id}
                                        </p>
                                    </div>

                                    {certificate.image_url && (
                                        <button
                                            onClick={handleDownload}
                                            disabled={downloading}
                                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-60 dark:bg-white dark:text-slate-900 md:w-auto"
                                        >
                                            <ArrowDownTrayIcon className="h-5 w-5" />
                                            {downloading ? '下載中…' : 'Download certificate'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="flex items-center justify-center gap-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                            <EnvelopeIcon className="h-4 w-4" />
                            有疑問請聯絡
                            <a href={`mailto:${CONTACT}`} className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                                {CONTACT}
                            </a>
                        </p>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-12">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
                            <XCircleIcon className="h-11 w-11 text-red-500" />
                        </div>
                        <h1 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">Verification Failed</h1>
                        <p className="mx-auto mb-8 max-w-md text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                            查不到這組驗證 ID 對應的證書。請確認 QR Code 或連結是否完整；若確定無誤，請聯絡 {CONTACT}。
                        </p>
                        <a
                            href="/"
                            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/25"
                        >
                            回到首頁
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
