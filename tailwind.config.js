/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'landing': '#08080D',
                'yellow-dead': '#DDCCAA'
            },
            height: {
                'header': '60px'
            }
        },
        plugins: [],
    }
}
