import axios from 'axios'

const API_URL = 'https://api.music.yandex.net:443'
let token = 'y0__xDqvKLtBhje-AYg_IbYmRKvzgUtTWneOYnXr6Gw6ZRXFVRotw'
const userId = '1839767146'

const fetchLikedTracks = async () => {
	try {
		const response = await axios.get(`${API_URL}/users/${userId}/likes/tracks`)
		return response.data
	} catch (error) {
		console.error('Ошибка получения треков "Мне нравится":', error)
		throw error
	}
}

fetchLikedTracks()
	.then(likedTracks => {
		console.log(likedTracks)
	})
	.catch(error => {
		console.error('Ошибка при получении треков:', error)
	})
