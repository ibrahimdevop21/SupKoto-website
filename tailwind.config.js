/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['class'], // Dark mode forced via class
	theme: {
	  extend: {
		colors: {
		  background: 'hsl(var(--background))',
		  surface: 'hsl(var(--card))', // use card token for surface
  
		  primary: {
			DEFAULT: 'hsl(var(--primary))', // SK Red
			foreground: 'hsl(var(--primary-foreground))',
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))', // usually white
			foreground: 'hsl(var(--secondary-foreground))',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
  
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		  },
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))',
		  },
		},
		fontFamily: {
		  sans: ['Inter', 'ui-sans-serif', 'system-ui'],
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		animation: {
		  'gradient-x': 'gradient-x 8s ease infinite',
		  'gradient-conic': 'gradient-conic 8s ease infinite',
		  'gradient-pulse': 'gradient-pulse 6s ease-in-out infinite',
		  'gradient-shine': 'gradient-shine 3s ease infinite',
		},
		keyframes: {
		  'gradient-x': {
			'0%, 100%': { backgroundPosition: '0% 50%' },
			'50%': { backgroundPosition: '100% 50%' },
		  },
		  'gradient-conic': {
			'0%': { backgroundPosition: '0% 0%' },
			'50%': { backgroundPosition: '100% 100%' },
			'100%': { backgroundPosition: '0% 0%' },
		  },
		  'gradient-pulse': {
			'0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
			'50%': { opacity: 1, transform: 'scale(1.05)' },
		  },
		  'gradient-shine': {
			'0%': { backgroundPosition: '200% 0' },
			'100%': { backgroundPosition: '-200% 0' },
		  },
		},
		extend: {
		  transitionDelay: {
			'300': '300ms',
			'600': '600ms',
			'900': '900ms',
		  },
		},
	  },
	},
	plugins: [
	  require('tailwindcss-rtl'),
	  require('tailwindcss-animate'),
	  function({ addUtilities }) {
		const newUtilities = {
		  '.animation-delay-300': {
			'animation-delay': '300ms',
		  },
		  '.animation-delay-600': {
			'animation-delay': '600ms',
		  },
		  '.animation-delay-900': {
			'animation-delay': '900ms',
		  },
		}
		addUtilities(newUtilities)
	  },
	],
  }
  