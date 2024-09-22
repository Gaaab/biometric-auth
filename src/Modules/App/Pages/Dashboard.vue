<script lang="ts" setup>
import { useUserStore } from 'src/Modules/User/store'
import BiometricsInformationBanner from '../Components/BiometricsInformationBanner.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const showBanner = ref(true)

const userStore = useUserStore()

const { user } = storeToRefs(userStore)
</script>

<template>
  <q-page
    padding
    class="row flex-center"
  >
    <div class="col-12">
      <div class="column q-gutter-y-md">
        <BiometricsInformationBanner
          class="col"
          :registered="user.has_biometric_enabled"
          @cancel-click="showBanner = false"
        />
        <q-card
          class="rounded-borders bg-primary text-white"
          flat
        >
          <q-card-section>
            <div class="text-h5">Welcome! User</div>
          </q-card-section>
          <q-card-section>
            <q-scroll-area
              style="height: 350px"
              visible
            >
              <q-list
                separator
                style="max-height: inherit"
              >
                <q-item-label title>Latest Configurations</q-item-label>
                <q-item
                  v-for="i in 9"
                  :key="i"
                >
                  <q-item-section>
                    <q-item-label>App: {{ i }}</q-item-label>
                    <q-item-label>Type: {{ i }}</q-item-label>
                    <q-item-label>Configuration: {{ i }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
