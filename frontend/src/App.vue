<template>
  <main>
    <h1>Dashboard</h1>
    <HomeView />
  </main>
</template>

<script setup lang="ts">
import HomeView from './views/HomeView.vue'
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}
main {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}
</style>
