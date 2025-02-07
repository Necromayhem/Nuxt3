export class AccountData {
	constructor(fullName = undefined, defaultEmail = undefined) {
		this.fullName = fullName
		this.defaultEmail = defaultEmail
	}
}

export class AccountDataResponse {
	constructor(result) {
		this.result = result
	}
}
