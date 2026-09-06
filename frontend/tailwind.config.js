/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '600px',     // Tablet portrait
      'md': '900px',     // Tablet landscape (iPad landscape)
      'lg': '1200px',    // Laptop
      'xl': '1440px',    // Desktop
      '2xl': '1600px',   // Large desktop
    },
    extend: {
      colors: {
        medical: {
          dark: '#0a0e17',
          card: '#111827',
          panel: '#151d30',
          border: '#1f293d',
          accent: '#06b6d4', // Cyan
          primary: '#2563eb', // Medical Blue
          emerald: '#10b981', // Clinical Green
          rose: '#f43f5e',   // Anatomy Rose
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
