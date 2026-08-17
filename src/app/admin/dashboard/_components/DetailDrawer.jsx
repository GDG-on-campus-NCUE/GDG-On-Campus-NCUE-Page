'use client';

import { useEffect, useState } from 'react';
import {
    ArrowDownTrayIcon,
    ArrowTopRightOnSquareIcon,
    ClipboardDocumentCheckIcon,
    ClipboardDocumentIcon,
    PaperAirplaneIcon,
    TrashIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { Badge, Button, Spinner } from '../../_components/ui';
import { EMAIL_STATUS } from './statusMeta';

function Row({ label, children }) {
    return (
        <div className="grid grid-cols-3 gap-3 py-2.5">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">{label}</dt>
            <dd className="col-span-2 min-w-0 break-words text-[13px] text-slate-800">{children}</dd>
        </div>
    );
}

export default function DetailDrawer({ cert, siteOrigin, onClose, onRevoke, onResent, toast }) {
    const [resending, setResending] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    if (!cert) return null;

    const status = EMAIL_STATUS[cert.email_status] ?? EMAIL_STATUS.skipped;
    const verifyUrl = `${siteOrigin}/verify/${cert.id}`;

    const copyVerifyUrl = async () => {
        try {
            await navigator.clipboard.writeText(verifyUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('複製失敗', '請手動選取驗證連結。');
        }
    };

    const resend = async () => {
        setResending(true);
        try {
            const response = await fetch(`/api/certificates/${cert.id}/resend`, { method: 'POST' });
            const payload = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(payload.error || `重寄失敗（HTTP ${response.status}）`);
            toast.success('通知信已重新寄出', cert.recipient_email);
            onResent();
        } catch (error) {
            toast.error('重寄失敗', error.message);
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-40 flex justify-end">
            <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} aria-hidden="true" />
            <aside
                role="dialog"
                aria-modal="true"
                aria-label={`${cert.recipient_name} 的證書詳情`}
                className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
                <header className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="min-w-0">
                        <h2 className="truncate text-[15px] font-bold tracking-tight text-slate-900">{cert.recipient_name}</h2>
                        <p className="truncate text-xs text-slate-500">{cert.event_name}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="關閉">
                        <XMarkIcon className="h-5 w-5" />
                    </Button>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                    {cert.image_url && (
                        <a
                            href={cert.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                        >
                            <img src={cert.image_url} alt="證書圖片" className="w-full object-contain" />
                        </a>
                    )}

                    <dl className="mt-5 divide-y divide-slate-100">
                        <Row label="證號">
                            <code className="font-mono text-[12px]">{cert.cert_number}</code>
                        </Row>
                        <Row label="驗證 ID">
                            <code className="font-mono text-[11px] text-slate-500">{cert.id}</code>
                        </Row>
                        <Row label="收件人">{cert.recipient_email || <span className="text-slate-400">未登記</span>}</Row>
                        <Row label="發放日期">{cert.issue_date}</Row>
                        <Row label="通知信">
                            <span className="flex flex-wrap items-center gap-2">
                                <Badge tone={status.tone} icon={status.icon}>
                                    {status.label}
                                </Badge>
                                {cert.email_sent_at && (
                                    <span className="text-[11px] text-slate-400">
                                        {new Date(cert.email_sent_at).toLocaleString('zh-TW')}
                                    </span>
                                )}
                            </span>
                            {cert.email_error && <p className="mt-1 text-[11px] leading-relaxed text-red-600">{cert.email_error}</p>}
                        </Row>
                        <Row label="核發者">{cert.issued_by || <span className="text-slate-400">—</span>}</Row>
                        <Row label="建立時間">{new Date(cert.created_at).toLocaleString('zh-TW')}</Row>
                        <Row label="防竄改簽章">
                            <code className="font-mono text-[11px] break-all text-slate-500">{cert.signature || '—'}</code>
                        </Row>
                    </dl>
                </div>

                <footer className="space-y-2 border-t border-slate-200 bg-slate-50 px-5 py-4">
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="secondary" size="sm" onClick={copyVerifyUrl}>
                            {copied ? (
                                <ClipboardDocumentCheckIcon className="h-4 w-4" />
                            ) : (
                                <ClipboardDocumentIcon className="h-4 w-4" />
                            )}
                            {copied ? '已複製連結' : '複製驗證連結'}
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => window.open(`/verify/${cert.id}`, '_blank', 'noopener')}>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            開啟驗證頁
                        </Button>
                        {cert.image_url && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => window.open(cert.image_url, '_blank')}
                            >
                                <ArrowDownTrayIcon className="h-4 w-4" />
                                下載圖片
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={resend}
                            disabled={!cert.recipient_email || resending}
                            title={cert.recipient_email ? '重寄通知信' : '此證書沒有登記 Email'}
                        >
                            {resending ? <Spinner /> : <PaperAirplaneIcon className="h-4 w-4" />}
                            重寄通知信
                        </Button>
                    </div>
                    <Button variant="danger" size="sm" className="w-full" onClick={() => onRevoke(cert)}>
                        <TrashIcon className="h-4 w-4" />
                        撤銷此證書
                    </Button>
                </footer>
            </aside>
        </div>
    );
}
