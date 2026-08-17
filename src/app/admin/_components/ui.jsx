'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

export function cx(...classes) {
    return classes.filter(Boolean).join(' ');
}

/* -------------------------------------------------------------------------- */
/* Button                                                                      */
/* -------------------------------------------------------------------------- */

const BUTTON_VARIANTS = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-600/20 disabled:bg-blue-300 disabled:shadow-none',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 shadow-sm disabled:text-slate-400',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 disabled:text-slate-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-600/20 disabled:bg-red-300 disabled:shadow-none',
    dangerGhost: 'text-slate-500 hover:bg-red-50 hover:text-red-600 active:bg-red-100 disabled:text-slate-300',
};

const BUTTON_SIZES = {
    sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-md',
    md: 'h-10 px-4 text-sm gap-2 rounded-lg',
    icon: 'h-9 w-9 justify-center rounded-lg',
};

export function Button({ variant = 'secondary', size = 'md', className, children, ...props }) {
    return (
        <button
            className={cx(
                'inline-flex items-center font-semibold transition-colors outline-none',
                'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed',
                BUTTON_VARIANTS[variant],
                BUTTON_SIZES[size],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}

/* -------------------------------------------------------------------------- */
/* Form controls                                                               */
/* -------------------------------------------------------------------------- */

const CONTROL_CLASS =
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 shadow-sm ' +
    'placeholder:text-slate-400 outline-none transition-colors ' +
    'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400';

export function Field({ label, hint, required, error, children }) {
    return (
        <label className="block space-y-1.5">
            <span className="flex items-baseline justify-between gap-3">
                <span className="text-[13px] font-semibold text-slate-700">
                    {label}
                    {required && <span className="ml-0.5 text-red-500">*</span>}
                </span>
                {hint && <span className="text-[11px] font-medium text-slate-400">{hint}</span>}
            </span>
            {children}
            {error && <span className="block text-[11px] font-medium text-red-600">{error}</span>}
        </label>
    );
}

export function Input({ className, ...props }) {
    return <input className={cx(CONTROL_CLASS, 'h-10', className)} {...props} />;
}

export function Select({ className, children, ...props }) {
    return (
        <select className={cx(CONTROL_CLASS, 'h-10 pr-8', className)} {...props}>
            {children}
        </select>
    );
}

/* -------------------------------------------------------------------------- */
/* Badge — 狀態一律「顏色 + 文字」，不靠顏色單獨表意                              */
/* -------------------------------------------------------------------------- */

const BADGE_TONES = {
    neutral: 'bg-slate-100 text-slate-600 ring-slate-200',
    info: 'bg-blue-50 text-blue-700 ring-blue-200',
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    warning: 'bg-amber-50 text-amber-700 ring-amber-200',
    danger: 'bg-red-50 text-red-700 ring-red-200',
};

export function Badge({ tone = 'neutral', icon: Icon, children, className }) {
    return (
        <span
            className={cx(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset whitespace-nowrap',
                BADGE_TONES[tone],
                className,
            )}
        >
            {Icon && <Icon className="h-3 w-3" />}
            {children}
        </span>
    );
}

export function Spinner({ className }) {
    return (
        <span
            role="status"
            aria-label="載入中"
            className={cx('inline-block animate-spin rounded-full border-2 border-current border-t-transparent', className || 'h-4 w-4')}
        />
    );
}

export function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            {Icon && (
                <div className="mb-4 rounded-full bg-slate-50 p-4 ring-1 ring-slate-100">
                    <Icon className="h-6 w-6 text-slate-300" />
                </div>
            )}
            <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
            {description && <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-slate-500">{description}</p>}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Modal                                                                       */
/* -------------------------------------------------------------------------- */

export function Modal({ open, onClose, title, subtitle, icon: Icon, size = 'md', children }) {
    const panelRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        panelRef.current?.focus();
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    const widths = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-5xl' };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
            <div
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={cx(
                    'relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl outline-none sm:rounded-xl',
                    widths[size],
                )}
            >
                <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                                <Icon className="h-5 w-5" />
                            </span>
                        )}
                        <div>
                            <h2 className="text-[15px] font-bold tracking-tight text-slate-900">{title}</h2>
                            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="關閉">
                        <XMarkIcon className="h-5 w-5" />
                    </Button>
                </header>
                {children}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Confirm dialog（取代瀏覽器原生 confirm）                                      */
/* -------------------------------------------------------------------------- */

export function ConfirmDialog({ open, title, description, confirmLabel = '確認', tone = 'danger', busy, onConfirm, onCancel }) {
    return (
        <Modal open={open} onClose={busy ? undefined : onCancel} title={title} size="sm">
            <div className="px-6 py-5 text-[13px] leading-relaxed text-slate-600">{description}</div>
            <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4">
                <Button variant="secondary" onClick={onCancel} disabled={busy}>
                    取消
                </Button>
                <Button variant={tone} onClick={onConfirm} disabled={busy}>
                    {busy && <Spinner />}
                    {confirmLabel}
                </Button>
            </div>
        </Modal>
    );
}

/* -------------------------------------------------------------------------- */
/* Toast                                                                       */
/* -------------------------------------------------------------------------- */

const ToastContext = createContext(null);

const TOAST_STYLES = {
    success: { icon: CheckCircleIcon, ring: 'ring-emerald-200', accent: 'text-emerald-600' },
    error: { icon: XCircleIcon, ring: 'ring-red-200', accent: 'text-red-600' },
    warning: { icon: ExclamationTriangleIcon, ring: 'ring-amber-200', accent: 'text-amber-600' },
    info: { icon: InformationCircleIcon, ring: 'ring-blue-200', accent: 'text-blue-600' },
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const counter = useRef(0);

    const dismiss = useCallback((id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const push = useCallback(
        (tone, message, detail) => {
            const id = ++counter.current;
            setToasts((current) => [...current, { id, tone, message, detail }]);
            setTimeout(() => dismiss(id), tone === 'error' ? 8000 : 4500);
        },
        [dismiss],
    );

    const value = useMemo(
        () => ({
            success: (message, detail) => push('success', message, detail),
            error: (message, detail) => push('error', message, detail),
            warning: (message, detail) => push('warning', message, detail),
            info: (message, detail) => push('info', message, detail),
        }),
        [push],
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
                {toasts.map((toast) => {
                    const style = TOAST_STYLES[toast.tone];
                    const Icon = style.icon;
                    return (
                        <div
                            key={toast.id}
                            role="status"
                            className={cx(
                                'pointer-events-auto flex items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-lg ring-1',
                                style.ring,
                            )}
                        >
                            <Icon className={cx('mt-0.5 h-5 w-5 shrink-0', style.accent)} />
                            <div className="min-w-0 flex-1">
                                <p className="text-[13px] font-semibold text-slate-900">{toast.message}</p>
                                {toast.detail && <p className="mt-0.5 break-words text-xs text-slate-500">{toast.detail}</p>}
                            </div>
                            <button
                                onClick={() => dismiss(toast.id)}
                                className="-mr-1 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                aria-label="關閉通知"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast 必須在 ToastProvider 之內使用');
    return context;
}
