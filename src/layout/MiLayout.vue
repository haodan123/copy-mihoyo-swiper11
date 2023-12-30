<template>
  <div class="container">
    <slot name="header"></slot>

    <div class="home">
      <swiper-container
        ref="mySwiper"
        class="swiper-container"
        :init="false"
      >
        <!-- @slideChangeTransitionStart="slideChange" -->
        <!-- @swiperslidechange="onSlideChange" -->
        <swiper-slide> <slot></slot></swiper-slide>
        <swiper-slide> <slot name="product"></slot></swiper-slide>
        <swiper-slide> <slot name="about"></slot></swiper-slide>
        <swiper-slide> <slot name="join"></slot></swiper-slide>
        <swiper-slide> <slot name="news"></slot></swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup>
import { usePageStore } from '@/stores/index'
import { Mousewheel } from 'swiper/modules'

import { onMounted, watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const pageStore = usePageStore()
const mySwiper = ref()

const init = () => {
  const params = {
    modules: [Mousewheel],
    injectStylesUrls: ['path/to/Mousewheel-element.min.css'],
    direction: 'vertical',
    speed: '500',
    mousewheel: true,
    preloadImages: true,
    updateOnImagesReady: true,
    threshold: 50,
    on: {
      // slideChange:onSlideChange,
      // swiperslidechange: onSlideChange
      slideChangeTransitionStart: onSlideChange
    }
  }

  Object.assign(mySwiper.value, params)

  mySwiper.value.initialize()
  // console.log(mySwiper.value.swiper)
}

const onSlideChange = e => {
  // console.log(e.slides);
  // const [swiper] = e.detail
  // console.log('slide changed', swiper.slides, progress)
  // console.log(swiper.slides[swiper.activeIndex].children[0])
  let page = mySwiper.value.swiper.slides[e.activeIndex].children[0].classList[0].replace('home-', '') // 当前活跃页
  pageStore.pageIndex = e.activeIndex //更改当前页面索引
  pageStore.homePage = page //修改当前活跃页面的状态
  const routeUrl = page == 'hero' ? '/' : '/?page=' + page
  // console.log(routeUrl)
  router.push(routeUrl)
}
onMounted(() => {
  init()
  routeMatch(500)
})

/**
 *
 * @param {number} speed swiper-slide滚动的速度，默认为0
 */

const routeMatch = (speed = 0) => {
  const query = route.query
  // 如果是首页
  if (query.page == undefined || query.page == '/' || query.page == '') {
    mySwiper.value.swiper.slideTo(0, speed) //轮播图滚动到索引0
  } else {
    mySwiper.value.swiper.slideTo(pageStore.pageIndex, speed)
    // for (let i in mySwiper.value.swiper.slides) {
    //   let { className } = mySwiper.value.swiper.slides[i].children[0]
    //   if (className.indexOf(query.page) !== -1) {
    //     mySwiper.value.swiper.slideTo(i, speed) //轮播图滚动到对应索引
    //     break //因为会重复执行  不break就会重复调用
    //   } else {
    //     // 如果不是任何一个已有的页面, 跳转到首页
    //     mySwiper.value.swiper.slideTo(0, speed) //轮播图滚动到索引0
    //   }
    // }
  }
}

watch(
  () => route.query,
  () => {
    // console.log(111)
    routeMatch(500)
  }
)
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  min-height: 720px;
  min-width: 1280px;
  overflow-y: auto;
  height: 10.8rem;
}
.home {
  width: 100%;
  height: 100%;
  position: sticky;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAFVJREFUSEtjfPn+238GJMDBxozMJZn949dfuB5GkOHiglyMJJtChIYhbPjHrz//83Oz0yZYRg3HlngYR4NlNFiIKFUgSkZTC9agGg0W7MEyWs1hCxcAF5pe5Ya82ZoAAAAASUVORK5CYII=')
    repeat center center/.23rem 0.23rem;
}

// .home-swiper > .swiper-wrapper {
//   flex-direction: column;
// }
// .home-swiper,
// .swiper-slide,
// .swiper-wrapper {
//   height: 100%;
// }

.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 0;
}

// .swiper-slide {
//   flex-shrink: 0;
//   width: 100%;
//   position: relative;
//   transition-property:
//     transform,
//     -webkit-transform;
// }

// .swiper-wrapper {
//   position: relative;
//   width: 100%;
//   z-index: 1;
//   display: flex;
//   transition-property:
//     transform,
//     -webkit-transform;
//   box-sizing: content-box;
// }
// .swiper-slide-active {
//   z-index: 99;
//   height: 746px;
// }
</style>
