interface TrackInfoResponse {
	result: TrackInfo[]
}

interface TrackInfo {
	title: string
	ogImage: string
	artists: ArtistInfo[]
}

interface ArtistInfo {
	name: string
	cover: {
		uri: string
	}
}

export type { TrackInfo, TrackInfoResponse }
