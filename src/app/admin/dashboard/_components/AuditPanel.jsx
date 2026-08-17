'use client';

import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { Badge, EmptyState, Spinner } from '../../_components/ui';
import { AUDIT_ACTIONS } from './statusMeta';

export default function AuditPanel({ entries, loading }) {
    return (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 px-5 py-4">
                <h3 className="text-sm font-bold tracking-tight text-slate-900">稽核紀錄</h3>
                <p className="mt-0.5 text-xs text-slate-500">最近 50 筆登入與證書異動事件，由伺服器直接寫入，前台無法竄改</p>
            </header>

            {loading ? (
                <div className="flex items-center justify-center gap-3 py-20 text-sm font-semibold text-slate-400">
                    <Spinner className="h-5 w-5" />
                    載入稽核紀錄…
                </div>
            ) : entries.length === 0 ? (
                <EmptyState icon={ClipboardDocumentListIcon} title="尚無紀錄" description="登入、核發、撤銷等操作都會記錄在這裡。" />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                <th scope="col" className="px-5 py-3">時間</th>
                                <th scope="col" className="px-5 py-3">操作</th>
                                <th scope="col" className="px-5 py-3">操作者</th>
                                <th scope="col" className="px-5 py-3">對象 / 備註</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[13px]">
                            {entries.map((entry) => {
                                const action = AUDIT_ACTIONS[entry.action] ?? { label: entry.action, tone: 'neutral' };
                                return (
                                    <tr key={entry.id} className="hover:bg-slate-50/70">
                                        <td className="whitespace-nowrap px-5 py-3 tabular-nums text-slate-500">
                                            {new Date(entry.created_at).toLocaleString('zh-TW')}
                                        </td>
                                        <td className="px-5 py-3">
                                            <Badge tone={action.tone}>{action.label}</Badge>
                                        </td>
                                        <td className="max-w-[200px] truncate px-5 py-3 text-slate-700">{entry.actor || '—'}</td>
                                        <td className="px-5 py-3 text-slate-500">
                                            {entry.detail || entry.target_id || '—'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
