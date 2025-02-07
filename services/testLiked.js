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

		// Извлекаем треки из ответа
		if (
			response.data &&
			response.data.result &&
			response.data.result.library &&
			response.data.result.library.tracks
		) {
			return response.data.result.library.tracks // Возвращаем массив треков
		} else {
			throw new Error('Неверная структура ответа API')
		}
	} catch (error) {
		console.error('Ошибка получения треков "Мне нравится":', error)
		throw error
	}
}

// Вызов функции для получения треков
fetchLikedTracks()
	.then(likedTracks => {
		// likedTracks - это массив треков
		const trackNames = likedTracks.map(track => track.id) // Получение ID треков
		console.log('ID треков "Мне нравится":', trackNames)
		// Если требуется извлекать какие-то другие атрибуты треков, вы можете сделать это здесь
	})
	.catch(error => {
		console.error('Ошибка при получении треков:', error)
	})
