<script setup lang="ts">
defineProps({
	audioSrc: String,
})
</script>

<template>
	<div
		class="flex flex-col gap-1.5 p-2.5 my-2 border border-gray-200 rounded-md bg-white"
	>
		<slot />
		<audio controls :src="audioSrc" class="w-full" />
	</div>
</template>
