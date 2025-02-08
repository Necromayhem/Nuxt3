<script setup lang="ts">
import AudioPlayer from '~/components/Track/AudioPlayer.vue'
import LikedTracks from '~/components/Track/LikedTracks.vue'
import Track from '~/components/Track/Track.vue'
import { onMounted, ref, watch } from 'vue'
import { useTrackInfoStore } from '@/stores/trackInfoStore'
import { useTrackDownloadInfoStore } from '@/stores/trackDownloadInfoStore'
import { useRoute } from 'vue-router'

const trackInfoStore = useTrackInfoStore()
const trackDownloadInfoStore = useTrackDownloadInfoStore()
const route = useRoute()

const trackId = ref('')
const audioSrc = ref('')
const trackName = ref<null | string>(null)
const trackAvatar = ref('')

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

watch(
	() => route.query.id,
	newId => {
		trackId.value = newId || '1000' // Устанавливаем значение по умолчанию
		fetchTrackDownloadInfo() // Загружаем информацию о треке при изменении идентификатора
	}
)

onMounted(() => {
	trackId.value = (route.query.id as string) || '1000' // Устанавливаем значение по умолчанию
	fetchTrackDownloadInfo()
})
</script>

<template>
	<div class="track-page space-y-4">
		<AudioPlayer :audio-src="audioSrc">
			<Track :track-avatar="trackAvatar" :track-name="trackName" />
		</AudioPlayer>
		<LikedTracks />
	</div>
</template>
