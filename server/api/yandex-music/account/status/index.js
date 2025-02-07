import axios from 'axios'
import { createError, defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
	const userId = '1839767146'
	const token = 'y0__xDqvKLtBhje-AYg_IbYmRKvzgUtTWneOYnXr6Gw6ZRXFVRotw'

	if (!token) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Authorization token is missing',
		})
	}

	const baseUrl = 'https://api.music.yandex.net:443'

	try {
		const response = await axios.get(
			`${baseUrl}/users/${userId}/likes/tracks/`,
			{
				headers: {
					Authorization: `OAuth ${token}`,
					'Accept-Language': 'ru',
				},
			}
		)

		// Проверяем структуру данных, возвращаем результаты
		if (response.data && response.data.result) {
			return response.data // Возврат успешного результата
		} else {
			throw new Error('Unexpected response format from Yandex Music API')
		}
	} catch (error) {
		console.error('Error fetching data:', error.message)
		throw createError({
			statusCode: 500,
			statusMessage: 'Error fetching data from Yandex Music API',
		})
	}
})
