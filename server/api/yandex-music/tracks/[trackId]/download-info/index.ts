import crypto from 'node:crypto'
import axios from 'axios'
import { createError, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const baseUrl = 'https://api.music.yandex.net:443'
	const token = config.yandexMusicToken

	const trackId = event.context.params?.trackId

	if (!trackId) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Track ID is required',
		})
	}

	try {
		const trackResponse = await axios.get(`${baseUrl}/tracks/${trackId}/download-info`, {
			headers: {
				'Authorization': `OAuth ${token}`,
				'Accept-Language': 'ru',
			},
		})

		const trackInfo = trackResponse.data.result
		if (!trackInfo || trackInfo.length === 0) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Track download information not found',
			})
		}

		const selectedInfo = trackInfo.find(
			(item: any) => item.codec === 'mp3' && !item.preview,
		) || trackInfo[0]

		if (!selectedInfo || !selectedInfo.downloadInfoUrl) {
			throw createError({
				statusCode: 404,
				statusMessage: 'No valid downloadInfoUrl found',
			})
		}

		const downloadResponse = await axios.get(`${selectedInfo.downloadInfoUrl}&format=json`, {
			headers: {
				Authorization: `OAuth ${token}`,
			},
		})

		const { s, ts, path, host } = downloadResponse.data

		/* NOTE: АЛГОРИТМ РАЗКЕШИРОВАНИЯ MD5 */
		if (!s || !ts || !path || !host) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Invalid response from downloadInfoUrl',
			})
		}

		const trackUrl = `XGRlBW9FXlekgbPrRHuSiA${path.substr(1)}${s}`
		const hashedUrl = crypto.createHash('md5').update(trackUrl).digest('hex')
		const downloadLink = `https://${host}/get-mp3/${hashedUrl}/${ts}${path}`

		return { downloadLink }
	}
	catch (error: any) {
		console.error('Error fetching track data:', error.message || error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Error fetching track download link',
		})
	}
})
