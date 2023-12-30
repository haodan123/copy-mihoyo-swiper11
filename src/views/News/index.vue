<template>
  <div :class="'home-' + page">新闻</div>
</template>

<script setup>
import { ref } from 'vue'

const page = ref('news')
</script>

<style scoped>
.home-news {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
