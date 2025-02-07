import { LikedTracksResponse } from './userLikedTracksStore.types' // Убедитесь в корректной реализации LikedTracksResponse

export default {
	namespaced: true,
	state: () => ({
		likedTracks: [],
		isLoading: false, // Добавлено поле для отслеживания загрузки
		error: null, // Поле для ошибок
	}),
	mutations: {
		setLikedTracks(state, likedTracks) {
			state.likedTracks = likedTracks
		},
		setLoading(state, isLoading) {
			state.isLoading = isLoading
		},
		setError(state, error) {
			state.error = error
		},
	},
	actions: {
		async fetchLikedTracks({ commit }) {
			commit('setLoading', true) // Начало загрузки
			commit('setError', null) // Очистка ошибки
			try {
				const response = await this.$axios.$get('/api/tracks/liked')
				commit('setLikedTracks', new LikedTracksResponse(response)) // Убедитесь, что этот класс правильно конструирует данные!
			} catch (error) {
				commit('setError', error.message) // Устанавливаем ошибку в случае неудачи
				console.error('Error fetching liked tracks:', error)
			} finally {
				commit('setLoading', false) // Конец загрузки
			}
		},
	},
	getters: {
		allLikedTracks(state) {
			return state.likedTracks
		},
		isLoading(state) {
			return state.isLoading
		},
		error(state) {
			return state.error
		},
	},
}
