'use client';

import { useCallback, useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button, ConfirmDialog, ToastProvider, useToast } from '../_components/ui';
import AdminShell from './_components/AdminShell';
import AuditPanel from './_components/AuditPanel';
import CertificatesPanel from './_components/CertificatesPanel';
import DetailDrawer from './_components/DetailDrawer';
import IssueDialog from './_components/IssueDialog';
import OverviewPanel from './_components/OverviewPanel';

function Console({ user, siteUrl }) {
    const toast = useToast();
    const [view, setView] = useState('overview');
    const [certificates, setCertificates] = useState([]);
    const [audit, setAudit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auditLoading, setAuditLoading] = useState(false);
    const [issueOpen, setIssueOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [pendingRevoke, setPendingRevoke] = useState(null);
    const [revoking, setRevoking] = useState(false);
    const [siteOrigin, setSiteOrigin] = useState(siteUrl || '');

    // 伺服器沒設 APP_URL 時退回瀏覽器當下的 origin（本機開發情境）
    useEffect(() => {
        if (!siteUrl) setSiteOrigin(window.location.origin);
    }, [siteUrl]);

    const loadCertificates = useCallback(
        async ({ silent } = {}) => {
            if (!silent) setLoading(true);
            try {
                const response = await fetch('/api/certificates');
                if (response.status === 401) {
                    window.location.href = '/admin/login';
                    return;
                }
                const payload = await response.json();
                if (!response.ok) throw new Error(payload.error || `讀取失敗（HTTP ${response.status}）`);
                setCertificates(payload.certificates);
            } catch (error) {
                toast.error('讀取證書清單失敗', error.message);
            } finally {
                setLoading(false);
            }
        },
        [toast],
    );

    const loadAudit = useCallback(async () => {
        setAuditLoading(true);
        try {
            const response = await fetch('/api/audit');
            const payload = await response.json();
            if (!response.ok) throw new Error(payload.error || `讀取失敗（HTTP ${response.status}）`);
            setAudit(payload.entries);
        } catch (error) {
            toast.error('讀取稽核紀錄失敗', error.message);
        } finally {
            setAuditLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        loadCertificates();
    }, [loadCertificates]);

    useEffect(() => {
        if (view === 'audit') loadAudit();
    }, [view, loadAudit]);

    const confirmRevoke = async () => {
        if (!pendingRevoke) return;
        setRevoking(true);
        try {
            const response = await fetch(`/api/certificates/${pendingRevoke.id}`, { method: 'DELETE' });
            const payload = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(payload.error || `撤銷失敗（HTTP ${response.status}）`);

            setCertificates((prev) => prev.filter((cert) => cert.id !== pendingRevoke.id));
            if (selected?.id === pendingRevoke.id) setSelected(null);
            toast.success('證書已撤銷', `${pendingRevoke.recipient_name}・${pendingRevoke.cert_number}`);
            setPendingRevoke(null);
        } catch (error) {
            toast.error('撤銷失敗', error.message);
        } finally {
            setRevoking(false);
        }
    };

    return (
        <>
            <AdminShell
                user={user}
                active={view}
                onNavigate={setView}
                actions={
                    <Button variant="primary" onClick={() => setIssueOpen(true)}>
                        <PlusIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">發放證書</span>
                    </Button>
                }
            >
                {view === 'overview' && (
                    <OverviewPanel certificates={certificates} onIssue={() => setIssueOpen(true)} onSelect={setSelected} />
                )}
                {view === 'certificates' && (
                    <CertificatesPanel
                        certificates={certificates}
                        loading={loading}
                        onSelect={setSelected}
                        onRevoke={setPendingRevoke}
                    />
                )}
                {view === 'audit' && <AuditPanel entries={audit} loading={auditLoading} />}
            </AdminShell>

            <IssueDialog
                open={issueOpen}
                onClose={() => setIssueOpen(false)}
                onIssued={(created) => setCertificates((prev) => [created, ...prev])}
                siteOrigin={siteOrigin}
                toast={toast}
            />

            {selected && (
                <DetailDrawer
                    cert={certificates.find((cert) => cert.id === selected.id) ?? selected}
                    siteOrigin={siteOrigin}
                    onClose={() => setSelected(null)}
                    onRevoke={setPendingRevoke}
                    onResent={() => loadCertificates({ silent: true })}
                    toast={toast}
                />
            )}

            <ConfirmDialog
                open={!!pendingRevoke}
                title="撤銷這張證書？"
                description={
                    pendingRevoke
                        ? `「${pendingRevoke.recipient_name}・${pendingRevoke.event_name}」的紀錄與證書圖片會一併從伺服器刪除，已發出的驗證連結將立即失效。此操作無法復原。`
                        : ''
                }
                confirmLabel="確認撤銷"
                busy={revoking}
                onConfirm={confirmRevoke}
                onCancel={() => setPendingRevoke(null)}
            />
        </>
    );
}

export default function DashboardClient({ user, siteUrl }) {
    return (
        <ToastProvider>
            <Console user={user} siteUrl={siteUrl} />
        </ToastProvider>
    );
}
