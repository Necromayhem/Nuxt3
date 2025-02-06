import axios from 'axios'

const baseUrl = 'https://api.music.yandex.net:443'
const token = 'y0__xDqvKLtBhje-AYg_IbYmRKvzgUtTWneOYnXr6Gw6ZRXFVRotw'

async function fetchData() {
	try {
		const response = await axios.get(`${baseUrl}/account/status`, {
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
}

// Вызов функции для получения данных
fetchData()
	.then(data => {
		console.log(data)
	})
	.catch(err => {
		console.error('Caught an error:', err)
	})
