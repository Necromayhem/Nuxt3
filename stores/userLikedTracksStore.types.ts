interface LikedTrack {
	id: string
	albumId: string
	timestamp: string
}

interface LikedTracksResponse {
	result: {
		library: {
			tracks: LikedTrack[]
		}
	}
}

interface TrackInfo {
	id: string
	name: string
	avatar: string
	artist: string
	downloadLink: string
}

export type { LikedTrack, LikedTracksResponse, TrackInfo }
