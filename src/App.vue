<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuthStore } from './Modules/Auth/store'

const authStore = useAuthStore()

if (typeof device !== 'undefined') {
  authStore.device = device
  console.log('CURRENT DEVICE', { device })
}
</script>
