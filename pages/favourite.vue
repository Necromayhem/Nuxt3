<script setup lang="ts">
// TODO: не автоимпортируются компоненты
import AudioPlayer from '~/components/Track/AudioPlayer.vue'
import LikedTracks from '~/components/Track/LikedTracks.vue'
import Track from '~/components/Track/Track.vue'

const trackInfoStore = useTrackInfoStore()
const trackDownloadInfoStore = useTrackDownloadInfoStore()

const trackId = ref('1000')
const audioSrc = ref('')
const trackName = ref<null | string>(null)
const trackAvatar = ref('')

// NOTE: Ф-ия для получения данных из сторов и связи этих данных с рефами
async function fetchTrackDownloadInfo() {
	if (!trackId.value) {
		return
	}

	await trackDownloadInfoStore.fetchTrackDownloadInfoData(trackId.value)
	await trackInfoStore.fetchTrackInfoData(trackId.value)

	const downloadInfo: any = trackDownloadInfoStore.trackDownloadInfoData
	audioSrc.value = downloadInfo.downloadLink

	trackName.value = trackInfoStore.trackName
	trackAvatar.value = trackInfoStore.trackAvatar
}

onMounted(() => {
	fetchTrackDownloadInfo()
})
</script>

<template>
	<div class="track-page space-y-4">
		<!-- Fetch Track -->
		<div class="flex gap-4">
			<input
				v-model="trackId"
				class="p-2 border border-black rounded-md text-sm"
				placeholder="Enter track ID"
			/>
			<button
				class="p-2 px-4 text-sm bg-gray-200 border border-black rounded-md transition-colors duration-300 hover:bg-gray-300"
				@click="fetchTrackDownloadInfo"
			>
				Fetch Track
			</button>
		</div>

		<AudioPlayer :audio-src="audioSrc">
			<Track :track-avatar="trackAvatar" :track-name="trackName" />
		</AudioPlayer>
		<LikedTracks />
	</div>
</template>
