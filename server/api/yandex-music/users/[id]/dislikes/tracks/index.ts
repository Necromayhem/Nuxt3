import axios from 'axios'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const userId = '1296937379' // или получите динамически
	const baseUrl = 'https://api.music.yandex.net:443'
	const token = config.yandexMusicToken // убедитесь, что токен правильно настроен в конфигурации

	try {
		const response = await axios.get(
			`${baseUrl}/users/${userId}/dislikes/tracks/`,
			{
				headers: {
					'Authorization': `OAuth ${token}`,
					'Accept-Language': 'ru',
				},
			},
		)
		return response.data
	}
	catch (error) {
		console.error('Error fetching data:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Error fetching data from Yandex Music API',
		})
	}
})
