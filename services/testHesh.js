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

const decodeTrackTitle = hashedTitle => {
	// Предположим, что здесь будет ваша функция расхеширования названия
	// Вам нужно будет заменить эту логику на ту, что подходит вашим данным
	return decodeURIComponent(hashedTitle) // пример расхеширования с использованием декодирования URI
}

// Вызов функции для получения треков
fetchLikedTracks()
	.then(likedTracks => {
		const tracks = likedTracks.tracks || [] // Предполагаем, что likedTracks содержит массив треков в likedTracks.tracks
		const trackInfoPromises = tracks.map(async track => {
			const decodedTitle = decodeTrackTitle(track.title) // Получаем расхешированное название
			return {
				id: track.id,
				title: decodedTitle,
			}
		})

		return Promise.all(trackInfoPromises)
	})
	.then(trackDetails => {
		console.log('Информация о треках "Мне нравится":', trackDetails)
	})
	.catch(error => {
		console.error('Ошибка при получении треков:', error)
	})
