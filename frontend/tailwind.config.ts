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
        "primary-unchecked": "hsl(var(--primary-unchecked) / <alpha-value>)",
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
        coffee: {
          ...require("daisyui/src/theming/themes")["[data-theme=coffee]"],
          '--primary-unchecked': '45 0% 60%'
        }
      }
    ]
  }
}

export default config