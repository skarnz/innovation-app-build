import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					background: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					border: 'hsl(var(--sidebar-border))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				glass: 'hsl(var(--glass-background))',
				// Custom colors for BUILD
				electric: {
					blue: '#2F80ED',
					purple: '#BB6BD9',
					pink: '#FF0080',
				},
				navy: {
					DEFAULT: '#0B0E1E',
					light: '#1A1F36',
				},
				neon: {
					blue: '#00FFFF',
					purple: '#BB6BD9',
				},
				'electric-blue': '#00FFFF',
				'electric-purple': '#BF00FF',
				'deep-space-blue': '#000020',
				'galaxy-purple': '#4B0082',
				'star-yellow': '#FFD700',
				'nebula-pink': '#FF69B4',
				'comet-grey': '#A9A9A9',
				'orbitron-orange': '#FFA500',
				'plasma-green': '#00FF00',
				'quantum-grey': '#808080',
				'dark-matter': '#1a1a1a',
				'light-grey': '#D3D3D3',
				'light-accent': '#E0E0E0',
				'navy-dark': '#0a192f',
				'navy-light': '#112240',
				'slate-grey': '#708090',
				'teal-accent': '#008080',
				'sky-blue-light': '#87CEEB',
				// New colors based on screenshot analysis
				'dark-bg': '#0D0F1C', // Very dark blue/purple background
				'gradient-blue': '#3A7BFD', // Bright blue for gradients
				'gradient-purple': '#C446F8', // Vibrant purple/magenta for gradients
				'hero-card-bg': '#1A1D33', // Dark blue/grey for cards
				'hero-textarea-bg': '#0F1120', // Darker text area background for contrast
				'circle-blue': '#2F80ED', // Existing electric blue for circle
				'circle-purple': '#BB6BD9', // Existing electric purple for circle
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(1)'
					},
					'50%': { 
						opacity: '0.8',
						filter: 'brightness(1.2)'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'text-shimmer': {
					'0%': {
						backgroundPosition: '-200% 0',
					},
					'100%': {
						backgroundPosition: '200% 0',
					},
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-out': 'fade-out 0.6s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'slide-down': 'slide-down 0.6s ease-out',
				'spin-slow': 'spin-slow 12s linear infinite',
				'text-shimmer': 'text-shimmer 8s infinite linear',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'text-gradient': 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))',
				// New gradient definition using new colors
				'hero-gradient': 'linear-gradient(90deg, var(--colors-gradient-blue) 0%, var(--colors-gradient-purple) 100%)',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(8px)',
			},
			transitionDuration: {
				'2000': '2000ms',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				orbitron: ['Orbitron', 'sans-serif'],
			},
		}
	},
	plugins: [animatePlugin],
} satisfies Config;
