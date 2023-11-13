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
          'primary': '#5c2c0c',
          'secondary': '#dda35d',
          'accent': '#aa6231',
          'neutral': '#e3deca',
          'base-100': '#FFFFEA',
          'base-200': '#EEEEDA',
          'base-300': '#DDDDCA',
          '--primary-container': '#5c2c0c',
          '--primary-container-variant': '#3c3a1e',
          '--primary-unchecked': colors.gray['300'],
          '--secondary-container': '#dda35d',
          '--secondary-container-variant': '#3c3a1e'
        }
      }
    ]
  }
}

export default config