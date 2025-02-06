import axios from 'axios'

const API_URL = 'https://api.music.yandex.net:443'
let token = 'y0__xDqvKLtBhje-AYg_IbYmRKvzgUtTWneOYnXr6Gw6ZRXFVRotw' // Замените на ваш токен
const userId = '1839767146' // ID пользователя

const fetchLikedTracks = async () => {
	try {
		const response = await axios.get(
			`${API_URL}/users/${userId}/likes/tracks`,
			{
				headers: {
					Authorization: `OAuth ${token}`, // Добавляем авторизацию
					'Accept-Language': 'ru', // Устанавливаем язык
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Ошибка получения треков "Мне нравится":', error)
		throw error
	}
}

// Вызов функции для получения треков
fetchLikedTracks()
	.then(likedTracks => {
		// Предположим, что likedTracks содержит массив треков в likedTracks.tracks
		const tracks = likedTracks.tracks || [] // Путь до массива треков может отличаться
		const trackNames = tracks.map(track => track.title) // Извлекаем названия треков
		console.log('Названия треков "Мне нравится":', trackNames)
	})
	.catch(error => {
		console.error('Ошибка при получении треков:', error)
	})
