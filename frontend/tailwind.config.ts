import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

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
        'primary-container': 'var(--primary-container)',
        'primary-container-variant': 'var(--primary-container-variant)',
        'primary-unchecked': 'var(--primary-unchecked)',
        'secondary-container': 'var(--secondary-container)',
        'secondary-container-variant': 'var(--secondary-container-variant)'
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
          '--primary-container':  colors.amber['900'],
          '--primary-container-variant': colors.amber['200'],
          '--primary-unchecked': colors.gray['300'],
          '--secondary-container':  colors.yellow['400'],
          '--secondary-container-variant':  colors.yellow['200']
        }
      }
    ]
  }
}

export default config