'use client';

import { useEffect, useMemo, useState } from 'react';
import {
    ArrowTopRightOnSquareIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    MagnifyingGlassIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { Badge, Button, EmptyState, Input, Select, Spinner } from '../../_components/ui';
import { EMAIL_STATUS } from './statusMeta';

const PAGE_SIZES = [10, 25, 50];

export default function CertificatesPanel({ certificates, loading, onSelect, onRevoke }) {
    const [query, setQuery] = useState('');
    const [eventFilter, setEventFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('desc');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const events = useMemo(
        () => [...new Set(certificates.map((cert) => cert.event_name))].sort((a, b) => a.localeCompare(b, 'zh-Hant')),
        [certificates],
    );

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase();
        const result = certificates.filter((cert) => {
            if (eventFilter !== 'all' && cert.event_name !== eventFilter) return false;
            if (statusFilter !== 'all' && cert.email_status !== statusFilter) return false;
            if (!needle) return true;
            return [cert.recipient_name, cert.recipient_email, cert.cert_number, cert.event_name, cert.id]
                .filter(Boolean)
                .some((field) => field.toLowerCase().includes(needle));
        });

        return result.sort((a, b) => {
            const diff = new Date(a.issue_date) - new Date(b.issue_date);
            if (diff !== 0) return sortOrder === 'desc' ? -diff : diff;
            const created = new Date(a.created_at) - new Date(b.created_at);
            return sortOrder === 'desc' ? -created : created;
        });
    }, [certificates, query, eventFilter, statusFilter, sortOrder]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

    useEffect(() => {
        setPage(1);
    }, [query, eventFilter, statusFilter, pageSize]);

    useEffect(() => {
        if (page > pageCount) setPage(pageCount);
    }, [page, pageCount]);

    const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
    const hasFilters = query.trim() || eventFilter !== 'all' || statusFilter !== 'all';

    return (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* 篩選列統一放在表格上方一排 */}
            <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-5 lg:flex-row lg:items-center">
                <div className="relative min-w-0 flex-1 lg:max-w-sm">
                    <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        type="search"
                        className="pl-9"
                        placeholder="搜尋姓名、Email、證號或活動"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        aria-label="搜尋證書"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
                    <Select value={eventFilter} onChange={(e) => setEventFilter(e.target.value)} aria-label="依活動篩選" className="sm:w-52">
                        <option value="all">所有活動</option>
                        {events.map((event) => (
                            <option key={event} value={event}>
                                {event}
                            </option>
                        ))}
                    </Select>
                    <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="依寄送狀態篩選" className="sm:w-36">
                        <option value="all">所有狀態</option>
                        {Object.entries(EMAIL_STATUS).map(([value, meta]) => (
                            <option key={value} value={value}>
                                {meta.label}
                            </option>
                        ))}
                    </Select>
                </div>
                <p className="text-xs font-semibold text-slate-500 lg:ml-auto">
                    共 <span className="tabular-nums text-slate-900">{filtered.length}</span> 筆
                    {hasFilters && ` / 全部 ${certificates.length} 筆`}
                </p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center gap-3 py-24 text-sm font-semibold text-slate-400">
                    <Spinner className="h-5 w-5" />
                    載入證書資料…
                </div>
            ) : visible.length === 0 ? (
                <EmptyState
                    icon={MagnifyingGlassIcon}
                    title={hasFilters ? '沒有符合條件的證書' : '尚未核發任何證書'}
                    description={hasFilters ? '調整搜尋關鍵字或篩選條件後再試一次。' : '核發第一張證書之後，紀錄就會出現在這裡。'}
                    action={
                        hasFilters ? (
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setQuery('');
                                    setEventFilter('all');
                                    setStatusFilter('all');
                                }}
                            >
                                清除篩選
                            </Button>
                        ) : null
                    }
                />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-white text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                <th scope="col" className="px-5 py-3">受證成員</th>
                                <th scope="col" className="px-5 py-3">活動 / 專案</th>
                                <th scope="col" className="hidden px-5 py-3 xl:table-cell">證號</th>
                                <th scope="col" className="px-5 py-3">
                                    <button
                                        onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                                        className="inline-flex items-center gap-1 uppercase tracking-[0.08em] transition-colors hover:text-slate-700"
                                    >
                                        發放日期
                                        {sortOrder === 'desc' ? (
                                            <ChevronDownIcon className="h-3.5 w-3.5" />
                                        ) : (
                                            <ChevronUpIcon className="h-3.5 w-3.5" />
                                        )}
                                    </button>
                                </th>
                                <th scope="col" className="hidden px-5 py-3 md:table-cell">通知信</th>
                                <th scope="col" className="px-5 py-3 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {visible.map((cert) => {
                                const status = EMAIL_STATUS[cert.email_status] ?? EMAIL_STATUS.skipped;
                                return (
                                    <tr key={cert.id} className="group transition-colors hover:bg-slate-50/70">
                                        <td className="px-5 py-3">
                                            <button onClick={() => onSelect(cert)} className="flex items-center gap-3 text-left">
                                                <span className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                                                    {cert.image_url ? (
                                                        <img src={cert.image_url} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <span className="flex h-full w-full items-center justify-center text-[13px] font-bold text-slate-400">
                                                            {cert.recipient_name.slice(0, 1)}
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block truncate font-semibold text-slate-900 group-hover:text-blue-700">
                                                        {cert.recipient_name}
                                                    </span>
                                                    <span className="block truncate text-xs text-slate-500">
                                                        {cert.recipient_email || '未登記 Email'}
                                                    </span>
                                                </span>
                                            </button>
                                        </td>
                                        <td className="max-w-[220px] px-5 py-3">
                                            <span className="block truncate text-[13px] text-slate-700">{cert.event_name}</span>
                                        </td>
                                        <td className="hidden px-5 py-3 xl:table-cell">
                                            <code className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                                                {cert.cert_number}
                                            </code>
                                        </td>
                                        <td className="px-5 py-3 text-[13px] tabular-nums text-slate-600">{cert.issue_date}</td>
                                        <td className="hidden px-5 py-3 md:table-cell">
                                            <Badge tone={status.tone} icon={status.icon}>
                                                {status.label}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <a
                                                    href={`/verify/${cert.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="開啟公開驗證頁"
                                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                                </a>
                                                <button
                                                    onClick={() => onRevoke(cert)}
                                                    title="撤銷此證書"
                                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && filtered.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-5">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        每頁
                        <Select
                            value={pageSize}
                            onChange={(event) => setPageSize(Number(event.target.value))}
                            className="h-8 w-20 py-0 text-xs"
                        >
                            {PAGE_SIZES.map((size) => (
                                <option key={size} value={size}>
                                    {size} 筆
                                </option>
                            ))}
                        </Select>
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold tabular-nums text-slate-500">
                            第 {page} / {pageCount} 頁
                        </span>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                            disabled={page <= 1}
                            aria-label="上一頁"
                        >
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
                            disabled={page >= pageCount}
                            aria-label="下一頁"
                        >
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
}
