import { defineStore } from 'pinia'

export const useTrackDownloadInfoStore = defineStore('trackDownloadInfo', () => {
	const trackDownloadInfoData = ref<string | null | any>(null)

	function setTrackDownloadInfoData(data: string) {
		trackDownloadInfoData.value = data
	}

	async function fetchTrackDownloadInfoData(trackId: string) {
		try {
			const response = await $fetch<string>(`/api/yandex-music/tracks/${trackId}/download-info`)

			if (response) {
				setTrackDownloadInfoData(response)
			}
		}
		catch (err) {
			console.error('Failed to fetch track download info:', err)
		}
	}

	return {
		trackDownloadInfoData,
		fetchTrackDownloadInfoData,
	}
})
