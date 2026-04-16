/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef9ff',
          100: '#d8f1ff',
          200: '#b9e8ff',
          300: '#87daff',
          400: '#4ec3ff',
          500: '#25a8f8',
          600: '#0d8ce0',
          700: '#0e72b8',
          800: '#115e96',
          900: '#134f7b',
          950: '#0d3152',
        },
        accent: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        surface: {
          900: '#0a0e1a',
          800: '#0f1629',
          700: '#151d38',
          600: '#1e2845',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.slate.300'),
            a: { color: theme('colors.brand.400'), textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            'h1,h2,h3,h4': { color: theme('colors.white'), fontWeight: '700', scrollMarginTop: '80px' },
            code: { color: theme('colors.brand.300'), background: theme('colors.surface.700'), padding: '2px 6px', borderRadius: '4px', fontWeight: '400' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: { background: 'transparent', padding: '0', margin: '0' },
            blockquote: { borderLeftColor: theme('colors.brand.500'), color: theme('colors.slate.400'), fontStyle: 'normal' },
            hr: { borderColor: theme('colors.slate.700') },
            strong: { color: theme('colors.white') },
            thead: { color: theme('colors.slate.200'), borderBottomColor: theme('colors.slate.700') },
            'tbody tr': { borderBottomColor: theme('colors.slate.800') },
            'ul > li::marker': { color: theme('colors.brand.400') },
            'ol > li::marker': { color: theme('colors.brand.400') },
          },
        },
      }),
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '0.8' } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
