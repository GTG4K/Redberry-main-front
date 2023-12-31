/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'landing': '#08080D',
                'background': '#181623',
                'backdrop':'#11101A',
                'form':'#222030',
                'form-input':'#e4ecf5',
                'form-text': '#6C757D',
                'yellow-dead': '#DDCCAA',
                'header':'#222030',
                'input': '#24222F',
            },
            height: {
                'header': '60px'
            },
            padding: {
                'header': '60px'
            }
        },
        plugins: [],
    }
}
