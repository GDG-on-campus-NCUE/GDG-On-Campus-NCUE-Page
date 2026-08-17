'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ArrowPathIcon,
    CheckBadgeIcon,
    ClipboardDocumentCheckIcon,
    ClipboardDocumentIcon,
    ShieldCheckIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { generateCertificate } from '@/lib/certificateGenerator';
import { Button, Field, Input, Modal, Spinner, cx } from '../../_components/ui';

const CERT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateCertNumber() {
    const bytes = crypto.getRandomValues(new Uint8Array(12));
    let suffix = '';
    for (const byte of bytes) suffix += CERT_ALPHABET[byte % CERT_ALPHABET.length];
    return `GDG-${suffix}`;
}

function emptyForm() {
    return {
        id: crypto.randomUUID(),
        cert_number: generateCertNumber(),
        recipient_name: '',
        recipient_email: '',
        event_name: '',
        issue_date: new Date().toISOString().split('T')[0],
    };
}

export default function IssueDialog({ open, onClose, onIssued, siteOrigin, toast }) {
    const [form, setForm] = useState(emptyForm);
    const [preview, setPreview] = useState(null);
    const [rendering, setRendering] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);
    const requestId = useRef(0);

    const verifyUrl = `${siteOrigin}/verify/${form.id}`;

    // 開啟時重置表單，避免帶著上一張證書的內容
    useEffect(() => {
        if (!open) return;
        setForm(emptyForm());
        setPreview(null);
        setCopied(false);
    }, [open]);

    const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

    // 停止輸入 600ms 後才重畫，避免每個按鍵都跑一次 canvas
    useEffect(() => {
        if (!open) return undefined;
        if (!form.recipient_name.trim() || !form.event_name.trim()) {
            setPreview(null);
            return undefined;
        }

        const ticket = ++requestId.current;
        setRendering(true);
        const timer = setTimeout(async () => {
            try {
                const dataUrl = await generateCertificate({
                    name: form.recipient_name.trim(),
                    eventName: form.event_name.trim(),
                    id: form.id,
                    certNumber: form.cert_number,
                    issueDate: form.issue_date,
                    verifyUrl: `${siteOrigin}/verify/${form.id}`,
                });
                if (ticket === requestId.current) setPreview(dataUrl);
            } catch (error) {
                if (ticket === requestId.current) {
                    setPreview(null);
                    toast.error('證書預覽產生失敗', error.message);
                }
            } finally {
                if (ticket === requestId.current) setRendering(false);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [open, form, siteOrigin, toast]);

    const copyVerifyUrl = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(verifyUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('複製失敗', '請手動選取驗證連結。');
        }
    }, [verifyUrl, toast]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!preview) {
            toast.warning('請先等待證書預覽生成完成');
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch('/api/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: form.id,
                    cert_number: form.cert_number,
                    recipient_name: form.recipient_name.trim(),
                    recipient_email: form.recipient_email.trim(),
                    event_name: form.event_name.trim(),
                    issue_date: form.issue_date,
                    image: preview,
                }),
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(payload.error || `核發失敗（HTTP ${response.status}）`);

            const created = payload.certificate;
            if (created.email_status === 'failed') {
                toast.warning('證書已核發，但通知信寄送失敗', created.email_error);
            } else if (created.email_status === 'sent') {
                toast.success('證書已核發', `通知信已寄至 ${created.recipient_email}`);
            } else {
                toast.success('證書已核發', '未填寫 Email，未寄送通知信。');
            }

            onIssued(created);
            onClose();
        } catch (error) {
            toast.error('核發失敗', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={submitting ? undefined : onClose}
            title="核發數位證書"
            subtitle="填寫資料後系統會自動生成證書、QR Code 與防竄改簽章"
            icon={SparklesIcon}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto px-6 py-6 lg:grid-cols-2 lg:gap-8">
                    <div className="space-y-4">
                        <Field label="受證成員姓名" required>
                            <Input
                                required
                                value={form.recipient_name}
                                onChange={(e) => update({ recipient_name: e.target.value })}
                                placeholder="王小明"
                                autoComplete="off"
                            />
                        </Field>

                        <Field label="受證成員 Email" hint="留空則不寄送通知信">
                            <Input
                                type="email"
                                value={form.recipient_email}
                                onChange={(e) => update({ recipient_email: e.target.value })}
                                placeholder="member@example.com"
                                autoComplete="off"
                            />
                        </Field>

                        <Field label="活動或專案名稱" required>
                            <Input
                                required
                                value={form.event_name}
                                onChange={(e) => update({ event_name: e.target.value })}
                                placeholder="Build with AI 2026"
                                autoComplete="off"
                            />
                        </Field>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="發放日期" required>
                                <Input
                                    required
                                    type="date"
                                    value={form.issue_date}
                                    onChange={(e) => update({ issue_date: e.target.value })}
                                />
                            </Field>
                            <Field label="證書編號" hint="系統自動產生">
                                <div className="flex gap-2">
                                    <Input readOnly value={form.cert_number} className="font-mono text-[13px]" />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="icon"
                                        onClick={() => update({ cert_number: generateCertNumber() })}
                                        aria-label="重新產生證號"
                                        title="重新產生證號"
                                    >
                                        <ArrowPathIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Field>
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between gap-3">
                                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                                    <ShieldCheckIcon className="h-3.5 w-3.5" />
                                    公開驗證連結
                                </span>
                                <Button type="button" variant="secondary" size="sm" onClick={copyVerifyUrl}>
                                    {copied ? (
                                        <ClipboardDocumentCheckIcon className="h-3.5 w-3.5" />
                                    ) : (
                                        <ClipboardDocumentIcon className="h-3.5 w-3.5" />
                                    )}
                                    {copied ? '已複製' : '複製'}
                                </Button>
                            </div>
                            <p className="mt-2 break-all font-mono text-[11px] leading-relaxed text-slate-600">{verifyUrl}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-slate-700">即時預覽</span>
                            {rendering && (
                                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
                                    <Spinner className="h-3 w-3" />
                                    生成中
                                </span>
                            )}
                        </div>

                        <div
                            className={cx(
                                'relative aspect-[1.414/1] w-full overflow-hidden rounded-lg border bg-slate-50',
                                preview ? 'border-slate-200' : 'border-dashed border-slate-300',
                            )}
                        >
                            {preview ? (
                                <img src={preview} alt="證書預覽" className="h-full w-full object-contain" />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
                                    <span className="rounded-full bg-white p-3 ring-1 ring-slate-200">
                                        <SparklesIcon className="h-6 w-6 text-slate-300" />
                                    </span>
                                    <p className="text-[13px] font-medium leading-relaxed text-slate-400">
                                        填寫「姓名」與「活動名稱」後
                                        <br />
                                        會在這裡即時生成證書
                                    </p>
                                </div>
                            )}
                        </div>

                        <ul className="space-y-1.5 text-[11px] leading-relaxed text-slate-500">
                            <li>・證書圖片會存進伺服器的持久化磁碟，不再依賴外部雲端儲存。</li>
                            <li>・防竄改簽章由伺服器以 AUTH_SECRET 計算，事後改資料會驗不過。</li>
                            <li>・填了 Email 就會在核發後自動寄出附 QR Code 的通知信。</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
                    <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>
                        取消
                    </Button>
                    <Button type="submit" variant="primary" disabled={submitting || !preview}>
                        {submitting ? <Spinner /> : <CheckBadgeIcon className="h-4 w-4" />}
                        {submitting ? '核發中…' : '正式核發'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
