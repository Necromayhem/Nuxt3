import type { LikedTrack, LikedTracksResponse, TrackInfo } from './userLikedTracksStore.types.ts'
import { defineStore } from 'pinia'
import { useTrackDownloadInfoStore } from './trackDownloadInfoStore.js'
import { useTrackInfoStore } from './trackInfoStore.js'

export const userLikedTracksStore = defineStore('userLikedStore', () => {
	const likedTracks = ref<string[]>([])
	const twelveLikedTracks = ref<string[]>([])
	const trackInfo = ref<TrackInfo[]>([])

	function setLikedTracks(data: string[]): void {
		likedTracks.value = data
		twelveLikedTracks.value = data.slice(0, 12)
	}

	function toArray(arrayFrom: LikedTrack[]): string[] {
		return arrayFrom.map(track => track.id)
	}

	async function fetchUserData() {
		try {
			const response = await $fetch<LikedTracksResponse>('/api/yandex-music/users/:id/likes/tracks', {
				method: 'GET',
			})

			if (response) {
				const trackIds = toArray(response.result.library.tracks)
				setLikedTracks(trackIds)
				await fetchTrackInfoForLikedTracks()
			}
		}
		catch (e) {
			console.log(e)
		}
	}

	async function fetchTrackInfoForLikedTracks() {
		const trackInfoStore = useTrackInfoStore()
		const trackDownloadInfoStore = useTrackDownloadInfoStore()
		trackInfo.value = []

		for (const trackId of twelveLikedTracks.value) {
			await trackInfoStore.fetchTrackInfoData(trackId)
			await trackDownloadInfoStore.fetchTrackDownloadInfoData(trackId)

			if (trackInfoStore.trackInfoData && trackDownloadInfoStore.trackDownloadInfoData) {
				trackInfo.value.push({
					id: trackId,
					name: trackInfoStore.trackName || 'Unknown Track',
					avatar: trackInfoStore.trackAvatar,
					artist: trackInfoStore.trackArtist,
					downloadLink: trackDownloadInfoStore.trackDownloadInfoData.downloadLink,
				})
			}
		}
	}

	return {
		likedTracks,
		twelveLikedTracks,
		trackInfo,
		fetchUserData,
	}
})
