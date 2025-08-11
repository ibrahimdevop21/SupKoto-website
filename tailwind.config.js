/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./public/**/*.html',
		// Include any dynamic class patterns
		'./src/components/**/*.{astro,tsx,jsx}',
		'./src/pages/**/*.{astro,md,mdx}',
		'./src/layouts/**/*.{astro,tsx,jsx}'
	],
	// Safelist for dynamic classes that might be missed by purging
	safelist: [
		// Animation classes
		'animate-pulse',
		'animate-spin',
		'animate-bounce',
		// Dynamic color classes
		{ pattern: /bg-(red|green|blue|yellow|purple|pink|indigo)-(100|200|300|400|500|600|700|800|900)/ },
		{ pattern: /text-(red|green|blue|yellow|purple|pink|indigo)-(100|200|300|400|500|600|700|800|900)/ },
		// Grid and flex patterns
		{ pattern: /grid-cols-(1|2|3|4|5|6|12)/ },
		{ pattern: /col-span-(1|2|3|4|5|6|12)/ },
	],
	darkMode: ['class'], // Dark mode forced via class
	// Performance optimizations - disable unused core plugins
	corePlugins: {
		preflight: true,
		container: false, // Using custom container classes
		accessibility: true,
		pointerEvents: true,
		visibility: true,
		position: true,
		inset: true,
		isolation: false, // Rarely used
		zIndex: true,
		order: false, // Rarely used
		float: false, // Modern layout doesn't use float
		clear: false, // Modern layout doesn't use clear
		margin: true,
		boxSizing: true,
		display: true,
		aspectRatio: true,
		height: true,
		maxHeight: true,
		minHeight: true,
		width: true,
		minWidth: true,
		maxWidth: true,
		flex: true,
		flexShrink: true,
		flexGrow: true,
		flexBasis: true,
		tableLayout: false, // Rarely used
		borderCollapse: false, // Rarely used
		borderSpacing: false, // Rarely used
		transformOrigin: true,
		transform: true,
		animation: true,
		cursor: true,
		touchAction: true,
		userSelect: true,
		resize: false, // Rarely used
		scrollSnapType: false, // Rarely used
		scrollSnapAlign: false, // Rarely used
		appearance: true,
		columns: false, // Rarely used
		breakBefore: false, // Rarely used
		breakInside: false, // Rarely used
		breakAfter: false, // Rarely used
		gridTemplateColumns: true,
		gridTemplateRows: true
	},
	
	theme: {
		extend: {
      // Optimized color palette - only colors we actually use
      colors: {
        // Core brand colors
        primary: '#e32636',
        'primary-dark': '#b91c2c',
        'primary-light': '#f87171',
        
        // Neutral colors (optimized set)
        foreground: 'hsl(var(--foreground))',
        background: 'hsl(var(--background))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        // Card colors
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        
        // Accent colors
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))'
      },
      
      // Optimized border radius
      borderRadius: {
        'none': '0px',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'full': '9999px'
      },
      
      // Performance-optimized animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite'
      },
      
      // Font family optimization
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'arabic': ['Noto Sans Arabic', 'Noto Kufi Arabic', 'Arabic UI Text', 'SF Arabic', 'Segoe UI Arabic', 'sans-serif']
      }
    }
  },
  
  // Safelist critical classes that might be dynamically generated
  safelist: [
    // Animation classes
    'animate-fade-in',
    'animate-fade-in-up',
    'animate-slide-in-left',
    'animate-slide-in-right',
    'animation-delay-200',
    'animation-delay-400',
    'animation-delay-600',
    'animation-delay-800',
    
    // Dynamic classes for Arabic/RTL
    'font-arabic',
    'text-right',
    'text-left',
    'flex-row-reverse',
    'justify-end',
    'justify-start',
    'ml-auto',
    'mr-auto',
    
    // Hover states
    'hover:scale-105',
    'hover:bg-red-700',
    'hover:border-red-500'
  ],
  
  plugins: [
    require('tailwindcss-rtl'),
    require('tailwindcss-animate'),
    // Custom plugin for performance optimizations
    function({ addUtilities, addComponents }) {
      // Add performance-optimized utilities
      addUtilities({
        '.will-change-transform': {
          'will-change': 'transform'
        },
        '.will-change-opacity': {
          'will-change': 'opacity'
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden'
        },
        '.transform-gpu': {
          'transform': 'translateZ(0)'
        },
        '.animation-delay-200': {
          'animation-delay': '0.2s'
        },
        '.animation-delay-400': {
          'animation-delay': '0.4s'
        },
        '.animation-delay-600': {
          'animation-delay': '0.6s'
        },
        '.animation-delay-800': {
          'animation-delay': '0.8s'
        }
      });
      
      // Add optimized component classes
      addComponents({
        '.btn-primary': {
          '@apply inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-xl hover:bg-primary-dark transition-all duration-300 hover:scale-105': {}
        },
        '.btn-secondary': {
          '@apply inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-lg hover:border-primary transition-all duration-300 shadow-xl hover:scale-105': {}
        },
        '.container-custom': {
          '@apply mx-auto px-4 w-full max-w-7xl': {}
        }
      });
    }
  ]
};