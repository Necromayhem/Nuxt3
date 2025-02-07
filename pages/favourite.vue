<!-- <template>
	<div>
		<h1>Favourite Page</h1>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const favourites = ref([])
</script> -->

<script setup>
import { useTrackInfoStore } from '~/stores/trackInfoStore'
import { onMounted } from 'vue'

const trackStore = useTrackInfoStore()

const trackId = '51400675' // реальный трек с Я музыки
onMounted(() => {
	trackStore.fetchTrack(trackId)
})
</script>

<template>
	<div>
		<div v-if="trackStore.loading">Loading track information...</div>
		<div v-else-if="trackStore.error">{{ trackStore.error }}</div>
		<div v-else>
			<h1>{{ trackStore.trackTitle }}</h1>
			<p>Artist: {{ trackStore.trackArtist }}</p>
			<p>Duration: {{ trackStore.trackDuration }}</p>
		</div>
	</div>
</template>
