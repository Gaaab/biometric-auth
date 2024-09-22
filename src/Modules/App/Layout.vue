<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../User/store'
import { watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const { isFetching, data, execute: onHandleRequestUser } = userStore.requestSelf()

watch(
  () => isFetching.value,
  (loading: boolean) => {
    if (loading) {
      $q.loading.show({
        message: 'Processing please wait.',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary',
      })
    } else {
      $q.loading.hide()
    }
  },
)

const prepareUser = async () => {
  await onHandleRequestUser(true)
  user.value = data.value as any
}

const refresh = async (done: any) => {
  await prepareUser()
  done()
}

prepareUser()
</script>

<template>
  <q-layout>
    <q-page-container class="app-bg">
      <q-pull-to-refresh @refresh="refresh">
        <router-view v-if="user.id" />
      </q-pull-to-refresh>
    </q-page-container>
    <q-footer class="bg-grey-2 text-primary">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey-8"
      >
        <q-route-tab
          icon="dashboard"
          to="/app"
          exact
        />
        <q-route-tab
          icon="la la-user-cog"
          to="/app/profile"
          exact
        />
        <q-route-tab
          icon="la la-sign-out-alt"
          to="/"
          replace
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
