/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Premium color system based on redesign.md
        bg: {
          light: '#F8FAFC', // Fondo principal light (Slate 50)
          dark: '#0b131c', // Fondo principal dark (negro casi puro)
        },
        surface: {
          light: '#FFFFFF', // Superficie (cards) light (blanco puro)
          dark: 'rgba(24, 24, 27, 0.8)', // Superficie (cards) dark con transparencia
        },
        textPrimary: {
          light: '#0F172A', // Texto primario light (Slate 900)
          dark: '#FAFAFA', // Texto primario dark (blanco puro)
        },
        textSecondary: {
          light: '#64748B', // Texto secundario light (Slate 500)
          dark: '#A1A1AA', // Texto secundario dark (gris claro)
        },
        accent: {
          light: '#2563EB', // Acento (azul) light (azul profundo)
          dark: '#3B82F6', // Acento (azul) dark (azul eléctrico)
        },
        border: {
          light: '#E2E8F0', // Bordes light (Slate 200)
          dark: '#27272A', // Bordes dark (gris muy oscuro)
        },
        success: {
          light: '#10B981', // Éxito (verde) light (verde esmeralda)
          dark: '#10B981', // Éxito (verde) dark (verde esmeralda)
        },
        danger: {
          light: '#EF4444', // Peligro (rojo) light
          dark: '#F87171', // Peligro (rojo) dark
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
      },
      borderRadius: {
        'card': '1rem', // 16px para cards según diseño
      },
      boxShadow: {
        'premium-light': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(37, 99, 235, 0.05)',
        'premium-light-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(37, 99, 235, 0.1)',
        'premium-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'premium-dark-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'card': '12px', // backdrop-blur-md para glassmorfismo
      },
    },
  },
  plugins: [],
}
