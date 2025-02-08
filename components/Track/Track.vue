<script setup lang="ts">
defineProps<{
	trackAvatar: string
	trackName: string | null
}>()
</script>

<template>
	<div class="flex items-center gap-2.5">
		<img
			:src="trackAvatar"
			alt="No avatar"
			class="w-9 h-9 object-cover border border-gray-300 rounded-full"
		/>
		<p class="text-sm font-normal">
			{{ trackName || 'Название трека отсутствует' }}
		</p>
	</div>
</template>
