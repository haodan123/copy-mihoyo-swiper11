<template>
  <div class="" style="width: 100%; height: 100%" @mousemove="slideWithMouse">
    <swiper-container ref="swiper" class="swiper-container home-product-swiper" :init="false">
      <swiper-slide v-for="(item, index) in datasets" :key="index">
        <div :class="index === activeIndex ? 'animated' : ''">
          <!-- 左边的图片部分 start-->
          <div class="mibanner">
            <div class="mibanner-board">
              <!-- 背景图片 -->
              <img :src="item.bannerboard" alt="mihoyo_F" :style="boardstyle" />
            </div>
            <div class="mibanner-box">
              <!-- 人物的图片 --><slot name="game">
                <img
                  class="mibanner-game"
                  :style="style"
                  :class="index == activeIndex ? 'animate' : ''"
                  :src="item.bannerimg"
                  alt="mihoyo_imitate"
                />
              </slot>
            </div>
            <MiBannerBtn @click="showVideo" v-if="item.videosrc || item.videosrc != ''"></MiBannerBtn>
          </div>
          <!-- 左边的图片部分 end-->

          <!-- 右边的详情部分 start-->
          <div class="mibanner__info">
            <div class="mibanner__info-name">
              <img v-if="item.name.img" :src="item.name.img" class="mibanner__info-name-img" alt="" />
              <div v-else style="font-weight: bold">{{ item.name.cname }}</div>
              <!-- 炫彩副标题 -->
              <span class="enname anim">{{ item.name.enname }}</span>
            </div>
            <!-- 斜线 -->
            <div class="mibanner__info-slash"></div>
            <div class="mibanner__info-desc">
              <p v-for="(desc, indext) in item.desc" :key="indext">
                {{ desc }}
              </p>
            </div>
            <div class="mibanner__info-socials" v-if="item.socials.length > 0">
              <div class="mibanner__info-social" v-for="(social, indexf) in item.socials" :key="indexf">
                <span>{{ social.title }}</span>
                <div class="mibanner__info-social-grcode" v-if="social.qrcode">
                  <img :src="social.qrcode" alt="mihoyo" />
                </div>
              </div>
            </div>
          </div>
          <!-- 右边的详情部分 end-->
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
import MiBannerBtn from '@/components/MiBannerBtn.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePageStore } from '@/stores'

const emit = defineEmits(['bannerchange', 'bannertransition'])
const route = useRoute()
const pageStore = usePageStore()

const props = defineProps({
  datasets: {
    type: Array,
    default: () => []
  },
  delay: {
    //多久轮播一次
    type: Number,
    default: 3420
  }
})
let swiper = ref()
let timerOut = ref()
let translate = 0
const style = ref()
const boardstyle = ref()

const activeIndex = ref(-1)

onMounted(() => {
  init()
})
// 向外公开的变量
defineExpose({
  slideTo
})

// 传给父组件的方法 让navbar调用
function slideTo(index) {
  swiper.value.swiper.slideTo(index)
  // 用户调用方法后，延迟10秒再开始自动播放
  pause(10000)
}

// 查看对应的视频
const showVideo = () => {
  // console.log(props.datasets[swiper.value.activeIndex].videosrc);
  pageStore.isShowVideo = props.datasets[swiper.value.swiper.activeIndex].videosrc
  // console.log(pageStore.videosrc);
}
// 看视频的时候暂停定时器
watch(
  () => pageStore.videosrc,
  changeVideo => {
    if (changeVideo == '') {
      pause(false)
    } else {
      pause(true)
    }
  }
)

const init = () => {
  const params = {
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper,也就是响应式
    observeParents: true, // 修改swiper的父元素时，自动初始化swiper
    preloadImages: true,
    updateOnImagesReady: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    on: {
      init: e => {
        // 将原本没有的animated类，经过一定的延时添加，才能产生过渡效果，直接添加的话是没有过渡的，直接就是最终样式
        setTimeout(() => {
          activeIndex.value = e.activeIndex
        }, 10)
      },
      transitionStart: e => {
        activeIndex.value = e.activeIndex
        emit('bannerchange', e.activeIndex)
        // let page = swiper.slides[swiper.activeIndex].children[0].classList[0].replace('home-', '') // 当前活跃页
      },
      touchMove: () => {
        // 手动切换元素后，也暂停10s，
        pause(10000)
      }
    }
  }

  Object.assign(swiper.value, params)
  swiper.value.initialize()
  // console.log(swiper.value.swiper)
  autoPlay()
}

// wathc监听路由的变化，在离开当前页面后轮播图不再播放，当回到该页面后重新播放并重新加载动画类，让动画也重新播放
watch(
  () => route.query,
  newRoute => {
    if (newRoute.page != 'product') {
      activeIndex.value = -1 // activeIndex的值控制动画是否加载，只需要变化这个值即可重新加载动画。
      pause(true)
    } else {
      console.log(swiper.value.swiper)
      activeIndex.value = swiper.value.swiper.activeIndex // activeIndex的值控制动画是否加载，只需要变化这个值即可重新加载动画。
      pause(false)
    }
  }
)

// 自动轮播
const autoPlay = () => {
  timerOut.value = setTimeout(() => {
    if (swiper.value.swiper.isEnd) {
      // 如果是结尾
      swiper.value.swiper.slideTo(0)
    } else {
      swiper.value.swiper.slideNext()
    }
    autoPlay()
  }, props.delay)
}

/**
 * 设置轮播图暂停一段时间
 * @param {number|boolean} time 需要暂停的时间，单位为毫秒(ms),如果传入true则永久暂停直到手动开启，传入false重新启动
 */
const pause = pauseTime => {
  clearTimeout(timerOut.value)
  if (pauseTime == false) {
    // 自动播放
    autoPlay()
  } else if (typeof pauseTime == 'number') {
    timerOut.value = setTimeout(() => {
      // 一定要在这里清除一次鼠标对轮播图的位移影响，不然自动播放后，图片会"跳"一下
      style.value = null
      boardstyle.value = null
      // 处理
      autoPlay()
    }, pauseTime)
  }
}
// 鼠标经过时暂停轮播 以及滑动动画
const slideWithMouse = e => {
  emit('bannertransition', 700)

  translate = -0.05 * e.pageX + 38.4 // box中的轮播大图最终位移位置
  let trans_board = -0.015 * e.pageX + 11.52 // board中背景小图的最终位移位置
  style.value = `transform: translate(${translate}px, 0); transition: transform ${700}ms cubic-bezier(0,.3,.5,1);`
  boardstyle.value = `transform: translate3d(${trans_board}px, 0px, 0px) scale(1.2, 1.2); backface-visibility: hidden; transform-style: preserve-3d;transition: transform 600ms cubic-bezier(0,.3,.5,1)`
  // console.log(style.value)
  pause(700)
}
</script>

<style scoped lang="scss">
@keyframes shiftslide {
  0% {
    // transform: translate(-71px, 0);
    transform: translate(-100px, 0);
    opacity: 0;
  }

  15% {
    transform: translate(-50px, 0);
    opacity: 1;
  }

  100% {
    transform: translate(0px, 0);
  }
}
@keyframes masked-animation {
  0% {
    background-position-x: 0px;
  }

  100% {
    background-position-x: 100px;
  }
}
.home-product-swiper {
  height: 100%;
  width: 100%;

  .mibanner__info-name,
  .mibanner__info-slash,
  .mibanner__info-desc,
  .mibanner__info-socials {
    opacity: 0;
    pointer-events: none;
    transform: translateX(0.6rem);
    -webkit-transform: translateX(0.6rem);
    -ms-transform: translateX(0.6rem);
    transition:
      opacity 500ms ease-out,
      transform 500ms ease-out;
  }
}

.animated {
  .mibanner__info-name,
  .mibanner__info-slash,
  .mibanner__info-desc,
  .mibanner__info-socials {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
    -webkit-transform: translateX(0);
  }

  .mibanner__info-name {
    transition-delay: 300ms;
  }

  .mibanner__info-slash {
    transition-delay: 500ms;
  }

  .mibanner__info-desc {
    transition-delay: 700ms;
  }

  .mibanner__info-socials {
    transition-delay: 900ms;
  }
  // }
}

.mibanner {
  position: relative;
  width: 12.8rem;
  height: calc(100% - 0.9rem); //减去header的高度
  // margin: 0 auto;
  top: 0.9rem;

  &::before {
    content: '';
    position: absolute;
    // right: 3.5rem;
    right: -1.3rem;
    top: 5.2rem;
    width: 0.3rem;
    height: 0.3rem;
    background-color: #3778e5;
  }
}

.mibanner-board {
  position: absolute;
  top: 5.2rem;
  // left: -4.8rem;
  width: 13.7rem;
  height: 2.8rem;
  overflow: hidden;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    right: 0;
    z-index: 1;
  }
  &::before {
    // 背景图片的点缀
    width: 3.22rem;
    height: 2.02rem;
    top: 0;
    background: url('https://www.mihoyo.com/_nuxt/img/product-card-bg.2acc93f.png') top right/cover no-repeat;
  }
  &::after {
    // 背景图片的点缀
    width: 0.38rem;
    height: 0.34rem;
    bottom: 0;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAiCAYAAAAzrKu4AAAAAXNSR0IArs4c6QAAAmhJREFUWEfNmD2MTUEYhp8XIRQUNDR0dJS0NH5XFMSqFKgo/HVERUOU6OhshZCgolLR0GgoNAoJCSHi95VvM7vZvXtm5kjO2Xsn2VvtfPPcOTPv95wrRmzYFnA5PkZm2F4M3ALGRwbM9nLgDrAtdmokwGyvBh4Cm6Ye39DBbK8HHgPrZp6poYLZ3gw8AFYNHvShgdneA0wAy5pu31DAbB8BrgOLcpEw72C2LwDxV1x73sBsLwSuAccqwfkXODsvYLaXpvM0VoH6ARyWNNE7mO2V6eZtqUB9BvZJetp7wNpemzJqQwXqPbBD0qveA9b2xpTmaypQrxPUu94D1vbW1PdWVKCeAWOSPvUesLYPJkNYUoG6BxyS9L33gLV9ErgCLKhARbiekPSn14CdkjvgdAXIwHlJF3P/15kozpS7CtSvCFdJIYKNozNRHJS7AthX4ICkRwWobkSxSe4yi34Adkl6UYDqRhRzctew8Btgu6S3BahuRNF2tJb7TXI3sPhzYLek2LHcmepGFGtyN2P1OEv7JX0rQHUjiraPJm3Jyl2CuJlu3+8CVDei2FLuIqMuSTpXio2WtcoWmeQuUjp2qzQiwY9LulHYpbaiOFki62O24yXhdjTZClT0uuh50ftyh7ytKE7PbwT7D7n7COyVFJaQg2orirPmzwGzHS+ecatqchf+FHIXPpWDaltrzvxZYEnuAiqSuDReAjslhXnmoEIU29RqnD8NluTuLhA9qzSeJDf/UoAKUWxTK7vOJJjtcSDypyZ3cRniLeZnAaptreK3l+1T8UNZC7m7CpyRFHmVe3xta1UeCvwDshr8RLnNUx4AAAAASUVORK5CYII=')
      top right/cover no-repeat;
  }

  img {
    height: 100%;
    position: absolute;
    transform: scale(1.2);
    left: 0;
    top: 0;
    transform-origin: center;
  }
}

.mibanner-box {
  position: absolute;
  top: 0;
  // left: -5.4rem;
  // padding-left: 0.3rem;
  z-index: 1;
  min-width: 13.7rem;
  height: 8rem;
  overflow: hidden;
  margin: 0 auto;
  .mibanner-game {
    height: 100%;
    // transform-origin: center;
    pointer-events: none;
    transition: all 0.3s;
    overflow-y: hidden;
    opacity: 0;
  }

  .animate {
    opacity: 1;
    animation: shiftslide 3s ease-out backwards;
    transition: opacity 0.5s ease-out;
    transition: transform 0.5s ease-in;
  }
}

.mibanner__info {
  position: absolute;
  top: 1.4rem;
  right: 0.8rem;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: flex-end; //像右边对齐
}

.mibanner__info-name {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.85rem;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1;
  font-weight: bold;
  color: #242933;
  img {
    height: 0.88rem;
  }

  .enname {
    margin-top: 0.14rem;
    font-size: 0.2rem;
    font-family: HarmonyOs, Arial, Helvetica, sans-serif;
    background: linear-gradient(to right, #3778e5, #e98bc0);
  }
  .anim {
    background-image: linear-gradient(-135deg, #3778e5, #e98bc0, #3778e5, #e98bc0, #3778e5);
    background-clip: text;
    background-size: 200% 100%;
    animation: masked-animation 3s infinite linear;
  }
}

.mibanner__info-slash {
  position: relative;
  width: 1rem;
  height: 0.6rem;
  margin: 0.16rem 0;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-top: 1px solid #242933;
    transform: rotate(-34deg);
    transform-origin: top right;
  }
}
.mibanner__info-desc {
  max-width: 7.5rem;
  text-align: right;
  font-size: 0.16rem;
  line-height: 0.28rem;
  color: #3d424d;
  p {
    text-align: right;
    white-space: pre-wrap;
  }
}

.mibanner__info-socials {
  display: flex;
  margin-top: 0.3rem;
  margin-right: 0.14rem;
  .mibanner__info-social {
    position: relative;
    font-size: 0.2rem;
    margin-left: 0.3rem;
    cursor: pointer;

    font-weight: bold;
    color: #3d424d;
    &:hover {
      // 鼠标滑过显示二维码
      color: #3778e5;
      .mibanner__info-social-grcode {
        display: block;
      }
      span {
        position: relative;
      }
    }

    .mibanner__info-social-grcode {
      position: absolute;
      bottom: -1.6rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1.36rem;
      height: 1.45rem;
      padding: 0.08rem;
      padding-top: 0.17rem;
      display: none;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACRCAYAAAAYY/ABAAAAAXNSR0IArs4c6QAABOlJREFUeF7t1E9olwUcx/Hn+flzjtFo5QK3JkYlURaElStsIEWdCoIivCT01yjoupkeFmgm3YIisTzkRRpCB6GDREVJ/0cHk6LMhG2GbbZYjN/mb3uiaESRbnyOvt+/6+/5HD6f7+t5ysKfC1xggdJ1/lnglv4Tl9bLFW82q5nHv9pzzW9uUxQCWVAwWNU2NMbeKYvi/rIoDq8+0f3A0FA5R0cikL8FbBgY21kW1fa1Xcu/+/70ueuqotz1+UvdOwRCX6Aoitv7Rx6uyvLg+qtXDL/25MrDz+ybuG/4x5n1ZVVt/nRPz9vkifBfkNueH7m5Nl8evXJlffzAc51vtbXU5qZn55c98sr4ltGJZud8rdr4xYs9X1ORoIH0bTt9xblq/stLWmsdbzzbuXdNZ316AcKp8WbbE6+Ob/29MT+5vKzd+tHurl+ISLBAbhj8pqW90XGkvqy8Y+fmy/ZvurH15/8C+OBYY9WOg78+1pyrPplqnbzn+OC6WRoSLJDebWOvl0W19dFN7Yeeurf92PkOv+/I1Lr97089VBXl3s92dz+NA9I7MFrRSi/07bu+9eOXt1z+3mL9+w+cvevD442+xZ67GP8v/wSyqqM+srarfupiLHi+Tm0risb2BzuOttRri74gs835ctehyY3TM0UrZaOTZ5o9IxPNNX8BWeqbRBnHnkXxwtDZO98dbtwtEDX87wICEcYFFxCIQASigXwBvyD5doikQBBnzksKJN8OkRQI4sx5SYHk2yGSAkGcOS8pkHw7RFIgiDPnJQWSb4dICgRx5rykQPLtEEmBIM6clxRIvh0iKRDEmfOSAsm3QyQFgjhzXlIg+XaIpEAQZ85LCiTfDpEUCOLMeUmB5NshkgJBnDkvKZB8O0RSIIgz5yUFkm+HSAoEcea8pEDy7RBJgSDOnJcUSL4dIikQxJnzkgLJt0MkBYI4c15SIPl2iKRAEGfOSwok3w6RFAjizHlJgeTbIZICQZw5LymQfDtEUiCIM+clBZJvh0gKBHHmvKRA8u0QSYEgzpyXFEi+HSIpEMSZ85ICybdDJAWCOHNeUiD5doikQBBnzksKJN8OkRQI4sx5SYHk2yGSAkGcOS8pkHw7RFIgiDPnJQWSb4dICgRx5rykQPLtEEmBIM6clxRIvh0iKRDEmfOSAsm3QyQFgjhzXlIg+XaIpEAQZ85LCiTfDpEUCOLMeUmB5NshkgJBnDkvKZB8O0RSIIgz5yUFkm+HSAoEcea8pEDy7RBJgSDOnJcUSL4dIikQxJnzkgLJt0MkBYI4c15SIPl2iKRAEGfOSwok3w6RFAjizHlJgeTbIZICQZw5LymQfDtEUiCIM+clBZJvh0gKBHHmvKRA8u0QSYEgzpyXFEi+HSIpEMSZ85ICybdDJAWCOHNeUiD5doikQBBnzksKJN8OkRQI4sx5SYHk2yGSAkGcOS8pkHw7RFIgiDPnJQWSb4dICgRx5rykQPLtEEmBIM6clxRIvh0iKRDEmfOSAsm3QyQFgjhzXlIg+XaIpEAQZ85LCiTfDpEUCOLMeUmB5NshkgJBnDkvKZB8O0RSIIgz5yUFkm+HSAoEcea8pEDy7RBJgSDOnJcUSL4dIikQxJnzkgLJt0Mk/wWkp7P+002rW35ANLfkkhb4dnT2qpNnmteWvQOj1ZISPoRc4A+oyxkEmgdh9wAAAABJRU5ErkJggg==')
        no-repeat center/100% 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
