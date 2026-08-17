'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    ArrowLeftStartOnRectangleIcon,
    Bars3Icon,
    ClipboardDocumentListIcon,
    DocumentTextIcon,
    Squares2X2Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import gdgIcon from '@/images/icon/GDG_icon.png';
import { Button, Spinner, cx } from '../../_components/ui';

export const NAV_ITEMS = [
    { key: 'overview', label: '總覽', icon: Squares2X2Icon, description: '核發概況與近期動態' },
    { key: 'certificates', label: '證書管理', icon: DocumentTextIcon, description: '搜尋、檢視與撤銷已核發的證書' },
    { key: 'audit', label: '稽核紀錄', icon: ClipboardDocumentListIcon, description: '登入與證書異動的完整軌跡' },
];

function initialsOf(name, email) {
    const source = (name || email || '?').trim();
    return source.slice(0, 1).toUpperCase();
}

/**
 * Google 帳號頭像。
 * lh3.googleusercontent.com 的圖片偶爾會 403 或失效，載入失敗就退回姓名首字。
 * referrerPolicy 必須是 no-referrer，否則 Google 有機會擋掉這個請求。
 */
function Avatar({ user }) {
    const [failed, setFailed] = useState(false);

    if (user.picture && !failed) {
        return (
            <img
                src={user.picture}
                alt=""
                width={36}
                height={36}
                referrerPolicy="no-referrer"
                onError={() => setFailed(true)}
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
            />
        );
    }

    return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {initialsOf(user.name, user.email)}
        </span>
    );
}

export default function AdminShell({ user, active, onNavigate, actions, children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const current = NAV_ITEMS.find((item) => item.key === active) ?? NAV_ITEMS[0];

    useEffect(() => {
        setDrawerOpen(false);
    }, [active]);

    const handleLogout = async () => {
        setLoggingOut(true);
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/admin/login';
    };

    const nav = (
        <nav className="flex-1 space-y-1 px-3 py-4">
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = item.key === active;
                return (
                    <button
                        key={item.key}
                        onClick={() => onNavigate(item.key)}
                        aria-current={isActive ? 'page' : undefined}
                        className={cx(
                            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                            isActive
                                ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                        )}
                    >
                        <Icon className={cx('h-5 w-5 shrink-0', isActive ? 'text-blue-600' : 'text-slate-400')} />
                        {item.label}
                    </button>
                );
            })}
        </nav>
    );

    const brand = (
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1 ring-1 ring-slate-200">
                <Image src={gdgIcon} alt="" width={28} height={28} className="h-full w-full object-contain" />
            </span>
            <div className="min-w-0">
                <p className="truncate text-[13px] font-bold leading-tight tracking-tight text-slate-900">證書管理系統</p>
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">GDG on Campus NCUE</p>
            </div>
        </div>
    );

    const account = (
        <div className="border-t border-slate-200 p-3">
            <div className="flex items-center gap-3 rounded-lg px-2 py-2">
                <Avatar user={user} />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-slate-900">{user.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{user.email}</p>
                </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-1 w-full justify-start" onClick={handleLogout} disabled={loggingOut}>
                {loggingOut ? <Spinner /> : <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />}
                登出
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* 桌機側欄 */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
                {brand}
                {nav}
                {account}
            </aside>

            {/* 手機抽屜 */}
            {drawerOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-slate-900/50" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
                    <aside className="relative flex h-full w-72 flex-col bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-200 pr-2">
                            <div className="flex-1">{brand}</div>
                            <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)} aria-label="關閉選單">
                                <XMarkIcon className="h-5 w-5" />
                            </Button>
                        </div>
                        {nav}
                        {account}
                    </aside>
                </div>
            )}

            <div className="lg:pl-64">
                <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
                    <div className="flex min-h-16 flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setDrawerOpen(true)} aria-label="開啟選單">
                            <Bars3Icon className="h-5 w-5" />
                        </Button>
                        <div className="min-w-0 flex-1">
                            <h1 className="truncate text-base font-bold tracking-tight text-slate-900">{current.label}</h1>
                            <p className="truncate text-xs text-slate-500">{current.description}</p>
                        </div>
                        <div className="flex items-center gap-2">{actions}</div>
                    </div>
                </header>

                <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
            </div>
        </div>
    );
}
