/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f5f3ef',
          light: '#faf9f7',
          alt: '#eae7e1',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          secondary: '#4a4a4a',
          muted: '#8a8a8a',
          light: '#b0b0b0',
        },
        border: {
          DEFAULT: '#e0ddd7',
          light: 'rgba(0,0,0,0.06)',
        },
        accent: '#6366f1',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 6vw, 4rem)',
        'section': 'clamp(2rem, 4vw, 3rem)',
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
        'pill': '999px',
      },
      maxWidth: {
        'content': '720px',
        'page': '1100px',
      },
      spacing: {
        'sidebar': '72px',
        'topbar': '64px',
      },
    },
  },
  plugins: [],
};
