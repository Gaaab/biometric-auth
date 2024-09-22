import { defineStore, storeToRefs } from 'pinia'
import { HTTP_API } from 'src/Common/api'
import { useUserStore } from '../User/store'
import { ref } from 'vue'

export const useDeviceStore = defineStore('DEVICE_STORE', () => {
  //const userStore = useUserStore()

  //const { user } = storeToRefs(userStore)

  const userDevices = ref([])

  const registerDevice = () => {
    if (typeof window.device === 'undefined') {
      throw Error('Not on device')
    }

    return HTTP_API('users/devices/register-device', { immediate: false }).post({ device }).json()
  }

  const myDevices = () => {
    const { isFetching, data, execute } = HTTP_API('users/devices', { immediate: true }).get().json()

    if (!isFetching.value) {
      userDevices.value = data.value
    }

    return { isFetching, data, execute }
  }

  const loadSecretFromDevice = () => {}

  return {
    userDevices,
    myDevices,
    loadSecretFromDevice,
    registerDevice,
  }
})
