import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Material 3 color semantics adapter for DaisyUI
        // https://m3.material.io/styles/color/the-color-system/color-roles
        // https://daisyui.com/docs/colors/
        // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl
        'primary-container': 'hsl(var(--primary-container) / <alpha-value>)',
        'primary-container-variant': 'hsl(var(--primary-container-variant) / <alpha-value>)',
        'primary-unchecked': 'hsl(var(--primary-unchecked) / <alpha-value>)',
        'secondary-container': 'hsl(var(--secondary-container) / <alpha-value>)',
        'secondary-container-variant': 'hsl(var(--secondary-container-variant) / <alpha-value>)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        valid: {
          'primary': 'hsl(30deg 100% 50%)',
          'secondary': 'green',
          'accent': '#37cdbe',
          'neutral': '#3d4451',
          'base-100': '#FFFFEA',
          'base-200': '#EEEEDA',
          'base-300': '#DDDDCA',
          '--primary-container':  '30deg 20% 50%',
          '--primary-container-variant':  '30deg 50% 50%',
          '--primary-unchecked': 'none 0% 60%',
          '--secondary-container':  '45deg 80% 50%',
          '--secondary-container-variant':  '45deg 50% 50%',
        }
      }
    ]
  }
}

export default config