import axios from 'axios'
import { createError, defineEventHandler } from 'h3'

export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const baseUrl = 'https://api.music.yandex.net:443'
	const token = 'y0__xDqvKLtBhje-AYg_IbYmRKvzgUtTWneOYnXr6Gw6ZRXFVRotw'

	const trackId = event.context.params?.trackId

	try {
		const response = await axios.get(`${baseUrl}/tracks/${trackId}`, {
			headers: {
				Authorization: `OAuth ${token}`,
				'Accept-Language': 'ru',
			},
		})
		return response.data
	} catch (error) {
		console.error('Error fetching data:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Error fetching data from Yandex Music API',
		})
	}
})
