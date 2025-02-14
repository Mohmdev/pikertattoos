import animate from 'tailwindcss-animate'
import defaultTheme from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  plugins: [animate],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '1.5rem'
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem'
      }
    },
    backgroundImage: {
      'radial-gradient': 'radial-gradient(circle at 50% 40%, white, black)'
    },
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        themeBlack: '#09090B',
        themeGray: '#27272A',
        themeDarkGray: '#27272A',
        themeTextGray: '#B4B0AE',
        themeTextWhite: '#F7ECE9',
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
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        'color-1': 'hsl(var(--color-1))',
        'color-2': 'hsl(var(--color-2))',
        'color-3': 'hsl(var(--color-3))',
        'color-4': 'hsl(var(--color-4))',
        'color-5': 'hsl(var(--color-5))'
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
        'spinner-leaf-fade': {
          '0%, 100%': {
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          }
        },
        'fade-in': {
          from: {
            opacity: '0'
          },
          to: {
            opacity: '1'
          }
        },
        'fade-out': {
          from: {
            opacity: '1'
          },
          to: {
            opacity: '0'
          }
        },
        'zoom-in': {
          from: {
            transform: 'scale(0.95)'
          },
          to: {
            transform: 'scale(1)'
          }
        },
        'zoom-out': {
          from: {
            transform: 'scale(1)'
          },
          to: {
            transform: 'scale(0.95)'
          }
        },
        'slide-in-from-top': {
          from: {
            transform: 'translateY(-100%)'
          },
          to: {
            transform: 'translateY(0)'
          }
        },
        'slide-out-to-top': {
          from: {
            transform: 'translateY(0)'
          },
          to: {
            transform: 'translateY(-100%)'
          }
        },
        'line-shadow': {
          '0%': {
            'background-position': '0 0'
          },
          '100%': {
            'background-position': '25% -25%'
          }
        },
        'background-position-spin': {
          '0%': {
            backgroundPosition: 'top center'
          },
          '100%': {
            backgroundPosition: 'bottom center'
          }
        },
        rainbow: {
          '0%': {
            'background-position': '0%'
          },
          '100%': {
            'background-position': '200%'
          }
        },
        'shimmer-slide': {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)'
          }
        },
        'spin-around': {
          '0%': {
            transform: 'translateZ(0) rotate(0)'
          },
          '15%, 35%': {
            transform: 'translateZ(0) rotate(90deg)'
          },
          '65%, 85%': {
            transform: 'translateZ(0) rotate(270deg)'
          },
          '100%': {
            transform: 'translateZ(0) rotate(360deg)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spinner-leaf-fade': 'spinner-leaf-fade 800ms linear infinite',
        'fade-in': 'fade-in 150ms ease-out',
        'fade-out': 'fade-out 150ms ease-in',
        'zoom-in': 'zoom-in 150ms ease-out',
        'zoom-out': 'zoom-out 150ms ease-in',
        'slide-in-from-top': 'slide-in-from-top 150ms ease-out',
        'slide-out-to-top': 'slide-out-to-top 150ms ease-in',
        'line-shadow': 'line-shadow 20s linear infinite',
        'background-position-spin': 'background-position-spin 4000ms infinite alternate',
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
        'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear'
      }
    }
  },
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30'
  ]
  // variants: {
  //   extend: {
  //     display: ['sticky-active']
  //   }
  // }
} satisfies Config
