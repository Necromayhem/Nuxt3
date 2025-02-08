import { createError, defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
	const config = useRuntimeConfig()
	const userId = '1296937379'
	const baseUrl = 'https://api.music.yandex.net:443'
	const token = config.yandexMusicToken

	const cacheKey = `yandex-music:user-${userId}-likes`

	const storage = useStorage()
	const cachedData = await storage.getItem(cacheKey)

	if (cachedData) {
		return cachedData
	}

	try {
		const response = await $fetch(`${baseUrl}/tracks/${userId}`, {
			method: 'GET',
			headers: {
				'Authorization': `OAuth ${token}`,
				'Accept-Language': 'ru',
			},
		})
		return response
	}
	catch (error) {
		console.error('Error fetching data:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Error fetching data from Yandex Music API',
		})
	}
})
