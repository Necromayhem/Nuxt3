interface AccountData {
	fullName: string | undefined
	defaultEmail: string | undefined
}

interface AccountDataResponse {
	result: {
		account: {
			fullName: string
		}
		defaultEmail: string
	}
}

export type { AccountData, AccountDataResponse }
