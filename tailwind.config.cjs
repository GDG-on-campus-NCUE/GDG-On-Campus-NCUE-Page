/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,jsx,ts,tsx,html}',
        './src/components/**/*.{js,jsx,ts,tsx,html}',
        './pages/**/*.{js,jsx,ts,tsx,html}',
    ],
    theme: {
        extend: {
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
                'pc-h0': ['6rem', { lineHeight: '1' }], // 96px
                'pc-h1': ['4rem', { lineHeight: '1' }], // 64px
                'pc-h2': ['2.25rem', { lineHeight: '1' }], // 36px
                'pc-h3': ['1.5rem', { lineHeight: '1' }], // 24px
                'pc-liner-bold': ['1rem', { lineHeight: '1' }], // 16px
                'pc-liner': ['1rem', { lineHeight: '1' }],
                // Phone sizes
                'phone-h1': ['2.25rem', { lineHeight: '1' }], // 36px
                'phone-h2': ['1.25rem', { lineHeight: '1' }], // 20px
                'phone-h3': ['0.875rem', { lineHeight: '1' }], // 14px
                'phone-liner-bold': ['0.875rem', { lineHeight: '1' }],
                'phone-liner': ['0.875rem', { lineHeight: '1' }],
            },
        },
    },
    plugins: [],
};
