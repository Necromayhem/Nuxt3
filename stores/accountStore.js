import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccountStore = defineStore('account', () => {
	const accountData = ref({
		fullName: '',
		defaultEmail: '',
	})
	const loading = ref(false)
	const error = ref(null)

	function setAccountData(data) {
		accountData.value = data
	}

	async function fetchAccountData() {
		loading.value = true
		error.value = null

		try {
			const response = await fetch('/api/yandex-music/account/status')

			if (response.result) {
				setAccountData({
					fullName: response.result.account.fullName,
					defaultEmail: response.result.defaultEmail,
				})
			}
		} catch (err) {
			console.error('Failed to fetch account:', err.message)
			error.value = 'Failed to fetch account data'
		} finally {
			loading.value = false
		}
	}

	return {
		accountData,
		loading,
		error,
		setAccountData,
		fetchAccountData,
	}
})
