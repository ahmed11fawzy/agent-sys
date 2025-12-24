/** @type {import('tailwindcss').Config} */

// Helper to generate hsl color with alpha support
const hsl = (variable) => `hsl(var(${variable}) / <alpha-value>)`;

// Helper to generate color scale object
const colorScale = (prefix) => ({
    50: hsl(`${prefix}-50`),
    100: hsl(`${prefix}-100`),
    200: hsl(`${prefix}-200`),
    300: hsl(`${prefix}-300`),
    400: hsl(`${prefix}-400`),
    500: hsl(`${prefix}-500`),
    600: hsl(`${prefix}-600`),
    700: hsl(`${prefix}-700`),
    800: hsl(`${prefix}-800`),
    900: hsl(`${prefix}-900`),
    DEFAULT: hsl(prefix),
});

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // === BRAND COLORS ===
                primary: colorScale('--color-primary'),
                secondary: colorScale('--color-secondary'),
                accent: colorScale('--color-accent'),

                // === NEUTRALS ===
                neutral: colorScale('--color-neutral'),

                // === SEMANTIC COLORS ===
                success: hsl('--color-success'),
                warning: hsl('--color-warning'),
                error: hsl('--color-error'),
                info: hsl('--color-info'),

                // === BACKGROUNDS ===
                bg: {
                    main: hsl('--color-bg-main'),
                    surface: hsl('--color-bg-surface'),
                    elevated: hsl('--color-bg-elevated'),
                    muted: hsl('--color-bg-muted'),
                },

                // === TEXT ===
                txt: {
                    main: hsl('--color-text-main'),
                    muted: hsl('--color-text-muted'),
                    inverted: hsl('--color-text-inverted'),
                },

                // === BORDERS ===
                border: {
                    DEFAULT: hsl('--color-border'),
                    focus: hsl('--color-border-focus'),
                },
            },
        },
    },
    plugins: [],
}