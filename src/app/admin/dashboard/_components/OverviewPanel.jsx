'use client';

import { useMemo } from 'react';
import {
    CalendarDaysIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Badge, Button, EmptyState, cx } from '../../_components/ui';
import IssuanceChart from './IssuanceChart';
import { EMAIL_STATUS } from './statusMeta';

function StatTile({ icon: Icon, label, value, caption, tone = 'neutral' }) {
    const accent = {
        neutral: 'bg-slate-50 text-slate-500 ring-slate-100',
        info: 'bg-blue-50 text-blue-600 ring-blue-100',
        danger: 'bg-red-50 text-red-600 ring-red-100',
    }[tone];

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">{label}</p>
                <span className={cx('flex h-8 w-8 items-center justify-center rounded-lg ring-1', accent)}>
                    <Icon className="h-4 w-4" />
                </span>
            </div>
            <p className="mt-3 text-3xl font-bold tabular-nums tracking-tight text-slate-900">{value}</p>
            {caption && <p className="mt-1 text-xs text-slate-500">{caption}</p>}
        </div>
    );
}

function buildMonthlySeries(certificates) {
    const buckets = new Map();
    const now = new Date();

    for (let offset = 11; offset >= 0; offset -= 1) {
        const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        buckets.set(key, {
            key,
            label: `${date.getMonth() + 1}月`,
            fullLabel: `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`,
            value: 0,
        });
    }

    for (const cert of certificates) {
        const created = new Date(cert.created_at);
        if (Number.isNaN(created.getTime())) continue;
        const key = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}`;
        const bucket = buckets.get(key);
        if (bucket) bucket.value += 1;
    }

    return [...buckets.values()];
}

export default function OverviewPanel({ certificates, onIssue, onSelect }) {
    const stats = useMemo(() => {
        const now = new Date();
        const thisMonth = certificates.filter((cert) => {
            const created = new Date(cert.created_at);
            return created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth();
        }).length;

        return {
            total: certificates.length,
            recipients: new Set(certificates.map((cert) => cert.recipient_name.trim().toLowerCase())).size,
            events: new Set(certificates.map((cert) => cert.event_name.trim())).size,
            thisMonth,
            mailFailed: certificates.filter((cert) => cert.email_status === 'failed').length,
            mailSent: certificates.filter((cert) => cert.email_status === 'sent').length,
        };
    }, [certificates]);

    const series = useMemo(() => buildMonthlySeries(certificates), [certificates]);
    const recent = useMemo(() => certificates.slice(0, 6), [certificates]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatTile
                    icon={DocumentTextIcon}
                    label="總核發證書"
                    value={stats.total}
                    caption={`涵蓋 ${stats.events} 場活動或專案`}
                    tone="info"
                />
                <StatTile icon={UserGroupIcon} label="受證人數" value={stats.recipients} caption="以姓名去重計算" />
                <StatTile icon={CalendarDaysIcon} label="本月核發" value={stats.thisMonth} caption="自本月 1 日起" />
                <StatTile
                    icon={stats.mailFailed ? ExclamationTriangleIcon : EnvelopeIcon}
                    label="通知信寄送失敗"
                    value={stats.mailFailed}
                    caption={stats.mailFailed ? '請到證書管理逐筆重寄' : `已成功寄出 ${stats.mailSent} 封`}
                    tone={stats.mailFailed ? 'danger' : 'neutral'}
                />
            </div>

            <IssuanceChart data={series} />

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                    <div>
                        <h3 className="text-sm font-bold tracking-tight text-slate-900">最近核發</h3>
                        <p className="mt-0.5 text-xs text-slate-500">最新的 6 筆紀錄</p>
                    </div>
                    <Button size="sm" variant="secondary" onClick={onIssue}>
                        發放證書
                    </Button>
                </header>

                {recent.length ? (
                    <ul className="divide-y divide-slate-100">
                        {recent.map((cert) => {
                            const status = EMAIL_STATUS[cert.email_status] ?? EMAIL_STATUS.skipped;
                            return (
                                <li key={cert.id}>
                                    <button
                                        onClick={() => onSelect(cert)}
                                        className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-slate-50"
                                    >
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[13px] font-bold text-slate-500">
                                            {cert.recipient_name.slice(0, 1)}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-[13px] font-semibold text-slate-900">
                                                {cert.recipient_name}
                                            </span>
                                            <span className="block truncate text-xs text-slate-500">{cert.event_name}</span>
                                        </span>
                                        <Badge tone={status.tone} icon={status.icon} className="hidden sm:inline-flex">
                                            {status.label}
                                        </Badge>
                                        <span className="shrink-0 text-xs tabular-nums text-slate-400">{cert.issue_date}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <EmptyState
                        icon={DocumentTextIcon}
                        title="還沒有核發任何證書"
                        description="按下「發放證書」建立第一張數位證書，系統會自動產生 QR Code、證號與防竄改簽章。"
                        action={
                            <Button variant="primary" onClick={onIssue}>
                                發放證書
                            </Button>
                        }
                    />
                )}
            </section>
        </div>
    );
}
