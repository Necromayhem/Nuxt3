module.exports = {
	content: [
		'./components/**/*.{vue,js}',
		'./pages/**/*.vue',
		'./layouts/**/*.{vue,js}',
	], // Укажите пути к файлам
	theme: {
		extend: {
			colors: {
				backgroundDark: '#121216', // Ваш фон
			},
		},
	},
	plugins: [],
}
