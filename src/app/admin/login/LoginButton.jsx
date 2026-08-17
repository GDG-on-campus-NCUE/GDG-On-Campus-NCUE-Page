'use client';

import { useState } from 'react';
import { Spinner } from '../_components/ui';

export default function LoginButton({ disabled }) {
    const [redirecting, setRedirecting] = useState(false);

    if (disabled) {
        return (
            <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-400">
                登入尚未啟用
            </div>
        );
    }

    return (
        <a
            href="/api/auth/google"
            onClick={() => setRedirecting(true)}
            className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-6 font-bold text-white shadow-lg shadow-slate-900/10 outline-none transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:bg-black"
        >
            {redirecting ? (
                <>
                    <Spinner className="h-5 w-5" />
                    <span className="text-[15px]">導向 Google…</span>
                </>
            ) : (
                <>
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
                        <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                    </span>
                    <span className="text-[15px] tracking-wide">使用 Google 帳號登入</span>
                </>
            )}
        </a>
    );
}
