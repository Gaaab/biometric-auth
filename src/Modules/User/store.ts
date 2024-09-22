import { defineStore } from 'pinia'
import { HTTP_API } from 'src/Common/api'
import { ref } from 'vue'

export const useUserStore = defineStore('USER_STORE', () => {
  const user = ref({
    id: 0,
    name: null,
    email: null,
    has_biometric_enabled: false,
  })

  const requestSelf = (opts = { immediate: false }) => {
    return HTTP_API('users/self', opts).get().json()
  }

  return {
    requestSelf,
    user,
  }
})
