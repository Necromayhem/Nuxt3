// ~/stores/trackInfoStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrackInfoStore = defineStore('trackInfoStore', () => {
	// Состояния
	const trackTitle = ref('')
	const trackArtist = ref('')
	const trackDuration = ref('')
	const loading = ref(false)
	const error = ref(null)

	// Метод для загрузки данных о треке
	const fetchTrack = async trackId => {
		loading.value = true
		error.value = null

		try {
			// Здесь нужно указать реальный API-запрос
			// Пример загрузки данных
			const response = await fetch(`https://api/yandex-music/tracks/${trackId}`)

			if (!response.ok) {
				throw new Error('Failed to fetch track')
			}

			const data = await response.json()

			// Обновляем состояния
			trackTitle.value = data.title
			trackArtist.value = data.artist
			trackDuration.value = data.duration
		} catch (err) {
			error.value = err.message
		} finally {
			loading.value = false
		}
	}

	return {
		trackTitle,
		trackArtist,
		trackDuration,
		loading,
		error,
		fetchTrack,
	}
})
