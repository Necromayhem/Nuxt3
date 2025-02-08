import type { AccountData, AccountDataResponse } from './accountStore.types.ts'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {
	const accountData = ref<AccountData>({
		fullName: '',
		defaultEmail: '',
	})

	function setAccountData(data: AccountData): void {
		accountData.value = data
	}

	async function fetchAccountData(): Promise<void> {
		try {
			const response = await $fetch<AccountDataResponse>('/api/yandex-music/account/status')

			if (response.result) {
				setAccountData({
					fullName: response.result.account.fullName,
					defaultEmail: response.result.defaultEmail,
				})
			}
		}
		catch (error) {
			console.error('Failed to $fetch account in /stores/accountStore:', error)
		}
	}

	return {
		accountData,
		setAccountData,
		fetchAccountData,
	}
})
