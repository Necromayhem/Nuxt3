<script setup lang="ts">
// TODO: Вынести сюда компонент Track, разделив логику на компоненты
const likedTracksStore = userLikedTracksStore()

onMounted(() => {
	likedTracksStore.fetchUserData()
})
</script>

<template>
	<div class="p-1 border border-gray-100 rounded-md">
		<h2 class="p-1 mb-2 text-lg font-bold">Понравившаяся музыка</h2>
		<div
			v-if="likedTracksStore.trackInfo.length"
			class="flex flex-wrap gap-2 m-1"
		>
			<div
				v-for="track in likedTracksStore.trackInfo"
				:key="track.id"
				class="p-2 border border-gray-100 rounded-sm bg-white transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300"
			>
				<div class="flex items-center gap-2 w-72 mb-2 p-2">
					<img
						:src="track.avatar"
						alt="Track Avatar"
						class="w-12 h-12 rounded-sm object-cover"
					/>
					<div class="flex-1 min-w-0">
						<div class="text-base font-bold truncate">
							{{ track.name }}
						</div>
						<div class="text-sm text-gray-500 truncate">
							{{ track.artist }}
						</div>
					</div>
				</div>
				<audio :src="track.downloadLink" controls class="w-full" />
			</div>
		</div>
		<div v-else class="p-5 text-center">
			<p class="text-sm text-gray-500">Треки не найдены.</p>
		</div>
	</div>
</template>
