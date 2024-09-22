import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { HTTP_API } from 'src/Common/api'
import { ref } from 'vue'

export const useAuthStore = defineStore('AUTH_STORE', () => {
  const email = ref<string | null>('admin@example.com')

  const password = ref<string | null>('password')

  const device = ref<Device | null>(null)

  const token = useLocalStorage('AUTH_TOKEN', null as string | null)

  const device_token = useLocalStorage('DEVICE_TOKEN', null as string | null)

  const login = (opts = { immediate: false }) => {
    // Email password login
    return HTTP_API('auth/login', opts)
      .post({
        email: email.value,
        password: password.value,
        device: device.value,
      })
      .json()
  }

  const logout = async () => {
    // Auth
    // Remove current token
    // Reset App State
  }

  const loginViaBiometric = () => {
    return HTTP_API('auth/find-token-by-device', { immediate: true })
  }

  return {
    loginViaBiometric,
    login,
    logout,
    device,
    email,
    password,
    token,
    device_token,
  }
})
