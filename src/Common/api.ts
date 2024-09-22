import { store } from 'src/stores'
import { createFetch } from '@vueuse/core'
import { useAuthStore } from 'src/Modules/Auth/store'
import { removeTrailingSlash } from 'src/utils/string-helpers'

export const HTTP_API = createFetch({
  baseUrl: removeTrailingSlash(process.env.API_ENDPOINT) + '/api',
  options: {
    async beforeFetch({ options }) {
      const authStore = useAuthStore(store)

      options.headers = {
        ...options.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
        }
      }

      return {
        options,
      }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})
