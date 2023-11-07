<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Login from './components/Login.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <Login />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
