import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-overlay': 'linear-gradient(to bottom, rgba(26,18,8,0.4) 0%, rgba(26,18,8,0.65) 60%, rgba(26,18,8,0.85) 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #C9A96E 0%, #E8C98A 50%, #C9A96E 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1A1208 0%, #2C2015 100%)',
        'hero-pattern': 'radial-gradient(ellipse 80% 60% at 50% 0%, hsl(215 55% 24% / 0.08) 0%, transparent 70%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(215 60% 96%)',
          100: 'hsl(215 55% 90%)',
          200: 'hsl(215 55% 78%)',
          600: 'hsl(215 55% 30%)',
          700: 'hsl(215 55% 24%)',
          800: 'hsl(215 55% 18%)',
          900: 'hsl(215 55% 12%)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          50: 'hsl(42 60% 96%)',
          100: 'hsl(42 55% 88%)',
          200: 'hsl(42 52% 75%)',
          600: 'hsl(42 52% 44%)',
          700: 'hsl(42 52% 36%)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        gold: {
          50: '#FDFBF7',
          100: '#FBF5EB',
          200: '#F4E5CB',
          300: '#EBD2A7',
          400: '#DFC084',
          500: '#C9A96E',
          600: '#A8854D',
          700: '#876535',
          800: '#674A24',
          900: '#4A3418',
        },
        tropical: {
          night: '#1A1208',
          card: '#2C2015',
          border: '#3D2D1E',
          forest: '#1E3320',
          sage: '#4A6741',
          gold: '#C9A96E',
          cream: '#F7F3EB',
        },
        chamber: {
          blue: 'hsl(var(--chamber-blue, 215 55% 24%))',
          gold: 'hsl(var(--chamber-gold, 42 52% 52%))',
          'gold-light': 'hsl(var(--chamber-gold-light, 42 60% 92%))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2.5s infinite linear',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
