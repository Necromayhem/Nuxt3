const axios = require('axios')
const { defineEventHandler } = require('h3')

module.exports = defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const userId = '1839767146' // получите динамически, если требуется
	const baseUrl = 'https://api.music.yandex.net:443'
	const token = 'y0__xDqvKLtBhje-AYg_IbYmRKvzgUtTWneOYnXr6Gw6ZRXFVRotw'

	try {
		// Отправляем GET-запрос с указанием заголовков авторизации и языка
		const response = await axios.get(
			`${baseUrl}/users/${userId}/dislikes/tracks/`,
			{
				headers: {
					Authorization: `OAuth ${token}`,
					'Accept-Language': 'ru',
				},
			}
		)

		// Возвращаем ответ
		return response.data
	} catch (error) {
		// Логирование ошибки
		console.error('Error fetching data:', error)

		// Генерация обработанной ошибки
		throw createError({
			statusCode: 500,
			statusMessage: 'Error fetching data from Yandex Music API',
		})
	}
})
