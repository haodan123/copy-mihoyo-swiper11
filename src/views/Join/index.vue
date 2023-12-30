<template>
  <div :class="'home-' + page">加入</div>
</template>

<script setup>
import { ref } from 'vue'

const page = ref('join')
</script>

<style scoped>
.home-join {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
