<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store'
import { storeToRefs } from 'pinia'
import { useFingerprint } from 'src/Common/fingerprint.hook'
import { ref, toValue, watch } from 'vue'
import { useQuasar } from 'quasar'

const loading = ref(false)

const $q = useQuasar()

const showLoginOptions = ref(false)

const router = useRouter()

const authStore = useAuthStore()

const { email, password, token, device_token } = storeToRefs(authStore)

const { isFetching, data: loginData, execute: onHandleLogin } = authStore.login()

const { loadSecret, isAvailable: isBiometricAvailable } = useFingerprint()

const login = async () => {
  try {
    await onHandleLogin(true)
    token.value = loginData.value.token as unknown as string
    router.replace({ name: 'app.dashboard' })
  } catch (error) {
    console.error(error)
  }
}

const loginViaBiometric = async () => {
  try {
    const secret_token = await loadSecret()

    if (typeof secret_token !== 'string') {
      throw new Error('Invalid data')
    }

    device_token.value = secret_token
  } catch (error) {
    $q.notify({
      message: 'Biometric device error',
      color: 'negative',
      timeout: 1000,
      icon: 'error',
    })
    console.error(error)
  }

  try {
    const {
      isFetching,
      data: loginDeviceData,
      execute,
    } = authStore
      .loginViaBiometric()
      .post({
        secret_token: device_token.value,
        device: window.device,
      })
      .json()

    loading.value = true

    await execute(true)

    loading.value = false

    token.value = loginDeviceData.value.token as unknown as string

    // Remove
    device_token.value = null

    // Redirect
    router.replace({ name: 'app.dashboard' })
  } catch (error: any) {
    console.error(error)
    $q.notify({
      message: 'This device does not match on our records.',
      color: 'negative',
      timeout: 1000,
      icon: 'error',
    })
  } finally {
    loading.value = false
  }
}

isBiometricAvailable().then(() => {
  showLoginOptions.value = true
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12">
          <q-card
            class="q-pa-md bg-none"
            flat
          >
            <q-card-section>
              <div class="text-h6">Biometric App</div>
            </q-card-section>
            <q-card-section>
              <q-form
                @submit.prevent="login"
                class="column q-gutter-y-md"
              >
                <qc-input
                  v-model="email"
                  type="email"
                  label="Email"
                  lazy-rules
                  :rules="[(val: any) => !!val || 'Email is required']"
                />
                <qc-input
                  v-model="password"
                  type="password"
                  label="Password"
                  lazy-rules
                  :rules="[(val: any) => !!val || 'Password is required']"
                />
                <div>
                  <qc-btn
                    :loading="isFetching || loading"
                    class="full-width q-py-sm"
                    label="Login"
                    type="submit"
                  />
                </div>
                <div v-if="showLoginOptions">
                  <qc-btn
                    :loading="isFetching || loading"
                    outline
                    class="full-width q-py-sm"
                    label="Biometric Login"
                    icon-right="fingerprint"
                    @click="loginViaBiometric"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
