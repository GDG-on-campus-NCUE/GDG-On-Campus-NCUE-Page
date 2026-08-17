'use client';

import { useMemo } from 'react';
import { cx } from '../../_components/ui';

/** 把上限抬到好讀的整數刻度（1、2、5 的倍數）。 */
function niceCeiling(value) {
    if (value <= 4) return Math.max(value, 4);
    const magnitude = 10 ** Math.floor(Math.log10(value));
    for (const step of [1, 2, 2.5, 5, 10]) {
        const candidate = step * magnitude;
        if (candidate >= value) return candidate;
    }
    return 10 * magnitude;
}

/**
 * 近 12 個月核發量。
 * 單一系列 → 不需要圖例（標題已說明是什麼），數值放在 hover 提示裡，
 * 避免每根柱子都掛一個數字。
 */
export default function IssuanceChart({ data }) {
    const max = useMemo(() => niceCeiling(Math.max(...data.map((d) => d.value), 0)), [data]);
    const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);
    const ticks = [max, max / 2, 0];

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <header className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                    <h3 className="text-sm font-bold tracking-tight text-slate-900">近 12 個月核發量</h3>
                    <p className="mt-0.5 text-xs text-slate-500">依證書建立時間統計，滑過柱狀可看該月份數字</p>
                </div>
                <p className="text-xs font-semibold text-slate-400">
                    區間合計 <span className="text-slate-700">{total}</span> 張
                </p>
            </header>

            <div className="flex gap-3">
                {/* Y 軸刻度 */}
                <div className="relative h-44 w-8 shrink-0">
                    {ticks.map((tick) => (
                        <span
                            key={tick}
                            className="absolute right-0 -translate-y-1/2 text-[10px] font-semibold tabular-nums text-slate-400"
                            style={{ top: `${(1 - tick / max) * 100}%` }}
                        >
                            {Number.isInteger(tick) ? tick : tick.toFixed(1)}
                        </span>
                    ))}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="relative h-44">
                        {/* 淡化的格線，不與資料爭視覺 */}
                        {ticks.map((tick) => (
                            <div
                                key={tick}
                                className={cx('absolute inset-x-0 border-t', tick === 0 ? 'border-slate-300' : 'border-slate-100')}
                                style={{ top: `${(1 - tick / max) * 100}%` }}
                            />
                        ))}

                        <div className="absolute inset-0 flex items-end gap-[3px] sm:gap-1.5">
                            {data.map((point) => {
                                const heightPct = max ? (point.value / max) * 100 : 0;
                                return (
                                    <div key={point.key} className="group relative flex h-full flex-1 items-end justify-center">
                                        {/* 加大的感應區，柱子很矮時也好指到 */}
                                        <div className="absolute inset-x-0 inset-y-0" aria-hidden="true" />
                                        <div
                                            className={cx(
                                                'w-full rounded-t-[4px] transition-colors',
                                                point.value > 0 ? 'bg-[#2563eb] group-hover:bg-[#1d4ed8]' : 'bg-slate-100',
                                            )}
                                            style={{ height: point.value > 0 ? `max(${heightPct}%, 3px)` : '3px' }}
                                        />
                                        <div
                                            role="tooltip"
                                            className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white shadow-lg group-hover:block"
                                        >
                                            {point.fullLabel}・{point.value} 張
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-2 flex gap-[3px] sm:gap-1.5">
                        {data.map((point) => (
                            <span
                                key={point.key}
                                className="flex-1 truncate text-center text-[10px] font-semibold tabular-nums text-slate-400"
                            >
                                {point.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 顏色之外的第二種讀法：完整數字表格 */}
            <details className="mt-5 border-t border-slate-100 pt-3">
                <summary className="cursor-pointer text-[11px] font-semibold text-slate-500 hover:text-slate-800">
                    以表格檢視數據
                </summary>
                <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left text-[11px]">
                        <thead>
                            <tr className="text-slate-400">
                                {data.map((point) => (
                                    <th key={point.key} scope="col" className="pb-1 font-semibold">
                                        {point.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="font-semibold tabular-nums text-slate-700">
                                {data.map((point) => (
                                    <td key={point.key}>{point.value}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </details>
        </section>
    );
}
