<template>
  <div :class="'home-' + page">
    <MiBanner
      ref="mibanner"
      @bannerchange="bannerChange"
      @bannertransition="bannertransition"
      :datasets="datasets"
      :delay="delay"
    ></MiBanner>
    <Navbar ref="navbar" @navchange="navChange" :delay="delay"></Navbar>
  </div>
</template>

<script setup>
import MiBanner from '@/components/MiBanner.vue'
import Navbar from '@/components/Navbar.vue'
import { getBannerInfo } from '@/assets/js/api'
import { onMounted, ref } from 'vue'

const page = ref('product')
const datasets = ref([])
const navbar = ref('')
const mibanner = ref('')

const delay = ref(3420) //延迟时间 多久轮播一次

onMounted(() => {
  getData()
})
const getData = () => {
  datasets.value = getBannerInfo()
  // console.log(datasets.value)
}

// 点击下面的navbar
const navChange = index => {
  // console.log('点击navbar',index);
  mibanner.value.slideTo(index)
}
// 鼠标放到上面后暂停  同步下面也暂停
const bannertransition = () => {
  // console.log('鼠标暂停');
  // navbar.value.pause(time)
}

// 上面的轮播滚动
const bannerChange = index => {
  // console.log('上面轮播',index);
  navbar.value.navChange(index, true)
}
</script>

<style scoped>
.home-product {
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: red; */
}
</style>
