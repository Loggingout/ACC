export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // Restore Tailwind 1.9 color palette
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
      },
      red: {
        500: '#f56565',
      },
      orange: {
        500: '#ed8936',
      },
      yellow: {
        700: '#b7791f',
      },
      green: {
        500: '#48bb78',
      },
      blue: {
        500: '#4299e1',
      },
      indigo: {
        500: '#667eea',
      },
      purple: {
        600: '#805ad5',
      },
      pink: {
        500: '#ed64a6',
      },
    },

    // Restore Tailwind 1.9 font sizes
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },

    // Restore Tailwind 1.9 spacing scale
    spacing: {
      0: '0px',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
    },

    extend: {},
  },
  plugins: [],
}
