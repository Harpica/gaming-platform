/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {},
    },
    plugins: [],
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    darkMode: 'class', // or 'media' or 'class'
    content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
};
