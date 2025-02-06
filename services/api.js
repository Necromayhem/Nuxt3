import axios from 'axios'

const API_URL = 'https://api.music.yandex.net:443'
let token = 'y0__xDqvKLtBhje-AYg_IbYmRKvzgUtTWneOYnXr6Gw6ZRXFVRotw'
const userId = '1839767146'

export const setAuthToken = newToken => {
	token = newToken
	axios.defaults.headers['Authorization'] = `Bearer ${token}`
}

// Получение списка плейлистов пользователя
export const fetchPlaylists = async () => {
	try {
		const response = await axios.get(`${API_URL}/users/${userId}/playlists`)
		return response.data
	} catch (error) {
		console.error('Ошибка получения плейлистов:', error)
		throw error
	}
}

// Получение треков с отметкой "Не рекомендовать"
export const fetchDislikedTracks = async () => {
	try {
		const response = await axios.get(
			`${API_URL}/users/${userId}/dislikes/tracks`
		)
		return response.data
	} catch (error) {
		console.error('Ошибка получения отклоненных треков:', error)
		throw error
	}
}

// Получение плейлиста по уникальному идентификатору
export const fetchPlaylistById = async kind => {
	try {
		const response = await axios.get(
			`${API_URL}/users/${userId}/playlists/${kind}`
		)
		return response.data
	} catch (error) {
		console.error('Ошибка получения плейлиста по ID:', error)
		throw error
	}
}

// Создание нового плейлиста
export const createPlaylist = async playlistData => {
	try {
		const response = await axios.post(
			`${API_URL}/users/${userId}/playlists/create`,
			playlistData
		)
		return response.data
	} catch (error) {
		console.error('Ошибка создания плейлиста:', error)
		throw error
	}
}

// Изменение названия плейлиста
export const renamePlaylist = async (kind, newName) => {
	try {
		const response = await axios.post(
			`${API_URL}/users/${userId}/playlists/${kind}/name`,
			{ name: newName }
		)
		return response.data
	} catch (error) {
		console.error('Ошибка изменения названия плейлиста:', error)
		throw error
	}
}

// Удаление плейлиста
export const deletePlaylist = async kind => {
	try {
		const response = await axios.post(
			`${API_URL}/users/${userId}/playlists/${kind}/delete`
		)
		return response.data
	} catch (error) {
		console.error('Ошибка удаления плейлиста:', error)
		throw error
	}
}

// Добавление треков в плейлист
export const addTracksToPlaylist = async (kind, tracks) => {
	try {
		const response = await axios.post(
			`${API_URL}/users/${userId}/playlists/${kind}/change-relative`,
			{ tracks }
		)
		return response.data
	} catch (error) {
		console.error('Ошибка добавления треков в плейлист:', error)
		throw error
	}
}

// Получение треков с отметкой "Мне нравится"
export const fetchLikedTracks = async () => {
	try {
		const response = await axios.get(`${API_URL}/users/${userId}/likes/tracks`)
		return response.data
	} catch (error) {
		console.error('Ошибка получения треков "Мне нравится":', error)
		throw error
	}
}

// Пометить треки как "Мне нравится"
export const likeMultipleTracks = async tracks => {
	try {
		const response = await axios.post(
			`${API_URL}/users/${userId}/likes/tracks/add-multiple`,
			{ tracks }
		)
		return response.data
	} catch (error) {
		console.error('Ошибка добавления треков в "Мне нравится":', error)
		throw error
	}
}

// Удаление треков из списка "Мне нравится"
export const removeLikedTracks = async tracks => {
	try {
		const response = await axios.post(
			`${API_URL}/users/${userId}/likes/tracks/remove`,
			{ tracks }
		)
		return response.data
	} catch (error) {
		console.error('Ошибка удаления треков из "Мне нравится":', error)
		throw error
	}
}

// Другие функции для треков могут быть добавлены аналогично

export default {
	setAuthToken,
	fetchPlaylists,
	fetchDislikedTracks,
	fetchPlaylistById,
	createPlaylist,
	renamePlaylist,
	deletePlaylist,
	addTracksToPlaylist,
	fetchLikedTracks,
	likeMultipleTracks,
	removeLikedTracks,
	// другие экспортируемые функции
}
