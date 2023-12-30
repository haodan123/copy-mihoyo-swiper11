<template>
  <div class="home-pv custom-mihoyo-common-mask pv" @click.stop.prevent="closeVideo(1)" v-if="pageStore.isShowVideo">
    <div class="custom-mihoyo-common-container">
      <!-- 关闭按钮 -->
      <div class="home-pv-close" @click="closeVideo(2)"></div>
      <video class="home-pv-video " controls="controls" autoplay="autoplay" preload  :src="pageStore.isShowVideo"></video>
    </div>
  </div>
</template>

<script setup>
import { usePageStore } from '@/stores'

const pageStore = usePageStore()

const closeVideo = (e) => {
  console.log(e);
  pageStore.isShowVideo = false
}
</script>

<style scoped lang="scss">
.pv {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &>*{
    pointer-events: auto;
  }
}
.custom-mihoyo-common-mask {
  position: fixed;
  z-index: 9999;
  animation-duration: 0.25s;
  transition-duration: 0.25s;
  animation: masked 0.19s linear ;
  // animation: masked 0.19s linear backwards;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.25s;
}
@keyframes masked {
  0% {
    background-color: rgba(0, 0, 0, 0.6);
  }

  100% {
    background-color: rgba(0, 0, 0, 0.9);
  }
}
@keyframes videoshow {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.custom-mihoyo-common-container {
  position: relative;
}

.home-pv-close {
  position: absolute;
  right: -0.64rem;
  top: -0.14rem;
  z-index: 9;
  width: 0.6rem;
  height: 0.6rem;
  background: url('@/assets/img/close.png') no-repeat center center;
  cursor: pointer;
  transform: rotate(0);
  transition: transform 0.5s;

  &:hover {
    transform: rotate(90deg);
  }
}

.home-pv-video {
  width: 12.8rem;
  transition: all 0.25s;
  animation: videoshow 0.25s linear;
}
</style>
