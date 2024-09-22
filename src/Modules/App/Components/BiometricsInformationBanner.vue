<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ registered?: boolean }>()

const determineNotificationMessage = computed(() => {
  return props?.registered ? 'You can now use biometric authentication.' : 'Biometric authentication is now available setup now.'
})

const emits = defineEmits(['cancel-click'])
</script>

<template>
  <q-banner
    rounded
    :class="[{ ['bg-positive']: props.registered }, 'bg-secondary']"
    class="text-dark"
  >
    <template v-slot:avatar>
      <q-icon
        :name="`${props?.registered ? 'la la-check-circle' : 'la la-bell'}`"
        color="dark"
      />
    </template>
    {{ determineNotificationMessage }}

    <template v-slot:action>
      <qc-btn
        v-if="!props?.registered"
        flat
        color="dark"
        label="Continue Setup"
        @click="$router.replace({ name: 'app.profile' })"
      />
      <qc-btn
        v-else
        flat
        color="dark"
        label="Done"
        @click="(e: any) => emits('cancel-click')"
      />
    </template>
  </q-banner>
</template>
