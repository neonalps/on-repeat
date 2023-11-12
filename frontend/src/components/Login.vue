<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore();
</script>

<template>
  <div>
    {{ auth.isLoggedIn ? "Logged in" : "Not logged in" }}
  </div>
</template>

<style scoped>

</style>
