export class LikedTrack {
	constructor(id, albumId, timestamp) {
		this.id = id
		this.albumId = albumId
		this.timestamp = timestamp
	}
}

export class LikedTracksResponse {
	constructor(result) {
		this.result = result
	}
}

export class TrackInfo {
	constructor(id, name, avatar, artist, downloadLink) {
		this.id = id
		this.name = name
		this.avatar = avatar
		this.artist = artist
		this.downloadLink = downloadLink
	}
}

export class TrackInfoResponse {
	constructor(result) {
		this.result = result
	}
}
