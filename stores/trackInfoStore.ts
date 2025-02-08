import type { TrackInfo, TrackInfoResponse } from './trackInfoStore.types.ts'
import { defineStore } from 'pinia'

export const useTrackInfoStore = defineStore('trackInfo', () => {
	const trackInfoData = ref<TrackInfo | null>(null)
	const trackName = ref<string | null>(null)
	const trackAvatar = ref('')
	const trackArtist = ref('')
	const trackArtistCover = ref('')

	function setTrackInfoData(data: TrackInfo) {
		trackInfoData.value = data
		trackName.value = data.title
		trackAvatar.value = `https://${data.ogImage.slice(0, -2)}100x100`
		trackArtist.value = data.artists[0].name
		trackArtistCover.value = `https://${data.artists[0].cover.uri.slice(0, -2)}50x50`
	}

	async function fetchTrackInfoData(trackId: string) {
		try {
			const response = await $fetch<TrackInfoResponse>(`/api/yandex-music/tracks/${trackId}`)

			if (response) {
				setTrackInfoData(response.result[0])
			}
		}
		catch (err) {
			console.error('Failed to fetch track data:', err)
		}
	}

	return {
		trackInfoData,
		trackName,
		trackAvatar,
		trackArtist,
		trackArtistCover,
		fetchTrackInfoData,
	}
})
