export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		yandexMusicToken: process.env.YANDEX_MUSIC_TOKEN || '', // Подключаем через переменную окружения
	},

	// Подключение Tailwind CSS
	css: ['~/assets/css/main.css'],

	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

	app: {
		head: {
			title: 'Music App',
			meta: [
				{ name: 'description', content: 'Your music application in Nuxt 3' },
			],
		},
	},

	build: {
		transpile: ['vue-material-design-icons'], // Если требуется!
	},

	// Tailwind CSS (при необходимости)
	tailwindcss: {
		configPath: 'tailwind.config.js', // Замените на TypeScript-файл, если используется
	},

	compatibilityDate: '2025-02-05',
})
