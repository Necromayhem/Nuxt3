import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrackDownloadInfoStore = defineStore(
	'trackDownloadInfo',
	() => {
		const trackDownloadInfoData = ref(null)
		const loading = ref(false)
		const error = ref(null)

		function setTrackDownloadInfoData(data) {
			trackDownloadInfoData.value = data
		}

		async function fetchTrackDownloadInfoData(trackId) {
			loading.value = true
			error.value = null

			try {
				const response = await $fetch(
					`/api/yandex-music/tracks/${trackId}/download-info`
				)

				if (response) {
					setTrackDownloadInfoData(response)
				} else {
					throw new Error('Invalid response format')
				}
			} catch (err) {
				console.error('Failed to fetch track download info:', err.message)
				error.value = 'Failed to load track download info'
			} finally {
				loading.value = false
			}
		}

		return {
			trackDownloadInfoData,
			loading,
			error,
			fetchTrackDownloadInfoData,
		}
	}
)
