/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F766E',
        sidebar: '#0B3A39',
        background: '#F9FAFB',
        border: '#E5E7EB',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
        danger: '#DC2626',
        warning: '#F59E0B',
        success: '#16A34A',
      },
    },
  },
  plugins: [],
};
