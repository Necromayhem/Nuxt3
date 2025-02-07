const { createError, defineEventHandler } = require('h3')

module.exports = defineEventHandler(async () => {
	const config = useRuntimeConfig()
	const userId = '1839767146'
	const baseUrl = 'https://api.music.yandex.net:443'
	const token = 'y0__xDqvKLtBhje-AYg_IbYmRKvzgUtTWneOYnXr6Gw6ZRXFVRotw'

	try {
		const response = await $fetch(`${baseUrl}/users/${userId}/likes/tracks/`, {
			method: 'GET',
			headers: {
				Authorization: `OAuth ${token}`,
				'Accept-Language': 'ru',
			},
		})

		return response
	} catch (error) {
		console.error('Error fetching data:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Error fetching data from Yandex Music API',
		})
	}
})
