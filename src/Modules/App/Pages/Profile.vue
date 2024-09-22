<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useFingerprint } from 'src/Common/fingerprint.hook'
import { useDeviceStore } from 'src/Modules/Device/store'
import { useUserStore } from 'src/Modules/User/store'

const $q = useQuasar()

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const deviceStore = useDeviceStore()

const { isFetching, data: deviceRegisterData, execute: requestRegisterDevice } = deviceStore.registerDevice()

const { isFetching: isFetchingDevices, data: userDevices, execute: requestMyDevices } = deviceStore.myDevices()

const { registerSecret } = useFingerprint()

const processRegisterDevice = async () => {
  try {
    await requestRegisterDevice()
    await registerSecret(deviceRegisterData.value.secret_token)

    $q.notify({
      message: 'Device has been registered successfully.',
      timeout: 1500,
      color: 'primary',
      icon: 'la la-bell',
    })

    requestMyDevices()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <q-page
    padding
    class="row flex-center"
  >
    <div class="col-12">
      <div class="column q-gutter-y-md">
        <div class="col">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ user.name }}</div>
              <div class="text-caption">{{ user.email }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card v-if="!isFetchingDevices">
            <q-card-section>
              <div class="text-h6">Devices</div>
            </q-card-section>
            <q-card-section>
              <q-list separator>
                <q-item v-if="!userDevices?.length">
                  <q-item-section class="flex flex-center">
                    <q-icon
                      name="la la-frown"
                      size="5em"
                      color="grey-5"
                    />
                    <div class="text-body1 text-grey-5">No Devices Found</div>
                  </q-item-section>
                </q-item>
                <q-item
                  v-else
                  v-for="userDevice in userDevices"
                  :key="userDevice?.id"
                >
                  <q-item-section>
                    <q-item-label>Device: {{ userDevice.platform }}</q-item-label>
                    <q-item-label>Model: {{ userDevice.model }}</q-item-label>
                    <q-item-label>UUID: {{ userDevice.uuid_formatted }}</q-item-label>
                  </q-item-section>
                  <q-item-section
                    top
                    side
                  >
                    <q-btn
                      icon="la la-trash"
                      round
                      dense
                      flat
                      color="negative"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
              <q-card-actions align="right">
                <qc-btn
                  @click="processRegisterDevice"
                  label="Device"
                  icon-right="la la-plus"
                  :loading="isFetching"
                />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
