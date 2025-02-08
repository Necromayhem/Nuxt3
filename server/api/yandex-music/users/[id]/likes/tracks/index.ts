import { createError, defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
	const config = useRuntimeConfig()
	const userId = '1296937379'
	const baseUrl = 'https://api.music.yandex.net:443'
	const token = config.yandexMusicToken

	try {
		const response = await $fetch(`${baseUrl}/users/${userId}/likes/tracks/`, {
			method: 'GET',
			headers: {
				'Authorization': `OAuth ${token}`,
				'Accept-Language': 'ru',
			},
		})

		return response
	}
	catch (error) {
		console.error('Error fetching data:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Error fetching data from Yandex Music API',
		})
	}
})
