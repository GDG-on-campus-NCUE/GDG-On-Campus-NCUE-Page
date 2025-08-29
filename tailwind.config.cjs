/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,jsx,ts,tsx,html}',
        './src/components/**/*.{js,jsx,ts,tsx,html}',
        './pages/**/*.{js,jsx,ts,tsx,html}',
    ],
    theme: {
        extend: {
            spacing: {
                '18': '4.5rem', // 72px
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                surface: 'var(--surface)',
                'surface-muted': 'var(--surface-muted)',
                border: 'var(--border)',
                muted: 'var(--muted)',
                heading: 'var(--heading)',
                brand: 'var(--brand)',
                'brand-accent': 'var(--brand-accent)',
                accent: 'var(--accent)',
                warn: 'var(--warn)',
                'text-on-brand': 'var(--text-on-brand)',
            },
            fontFamily: {
                // fallback to system fonts; prefer Source Sans Pro if available
                sans: ['Source Sans Pro', 'var(--font-sans)', 'ui-sans-serif', 'system-ui'],
                mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular'],
            },
            fontSize: {
                // PC headings
                'pc-h0': ['8rem', { lineHeight: '1' }], // 128px
                'pc-h1': ['5.25rem', { lineHeight: '1' }], // 84px
                'pc-h2': ['3rem', { lineHeight: '1' }], // 48px
                'pc-h3': ['1.5rem', { lineHeight: '1' }], // 24px
                'pc-liner-bold': ['1rem', { lineHeight: '1' }], // 16px
                'pc-liner': ['1rem', { lineHeight: '1' }],
                // Phone sizes - 優化後的手機尺寸
                'phone-h1': ['2.25rem', { lineHeight: '1.2' }], // 36px
                'phone-h2': ['1.5rem', { lineHeight: '1.3' }], // 24px
                'phone-h3': ['1.125rem', { lineHeight: '1.4' }], // 18px
                'phone-liner-bold': ['1rem', { lineHeight: '1.5' }], // 16px
                'phone-liner': ['1rem', { lineHeight: '1.6' }], // 16px
            },
        },
    },
    plugins: [],
};
