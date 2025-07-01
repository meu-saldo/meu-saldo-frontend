export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
],
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
    }
  }
}
}



