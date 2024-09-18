/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				apricot: '#FCBB6D',
				rose: '#D3737F',
				mauve: '#AB6C82',
				slate: '#685D79',
				steel: '#475C7A',
				white: '#F7F4EF',
			},
		},
	},
	plugins: [],
};
