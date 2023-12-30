<template>
  <div :class="'home-' + page">关于</div>
</template>

<script setup>
import { ref } from 'vue'

const page = ref('about')
</script>

<style scoped>
.home-about {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
