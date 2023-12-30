<template>
  <div style="width: 100vw; height: 100vh">
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swiper from 'swiper'

import { onMounted } from 'vue'
onMounted(() => {
  var swiper = new Swiper('.mySwiper', {
    // Optional parameters
    speed: 500,
    direction: 'vertical',
    mousewheel: true,
    // mousewheel: {
    // enabled: true
    // },
    enabled: true,
    preloadImages: true,
    updateOnImagesReady: true,
    threshold: 50,
    slidesPerView: 1
    // spaceBetween: 30
  })
})
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
