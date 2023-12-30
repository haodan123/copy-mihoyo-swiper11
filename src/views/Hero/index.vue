<template>
  <div :class="'home-' + page">
    <!-- fp: first paint 首次绘制页面 遮罩层上面的样式 start-->
    <div class="fp-page__wrap">
      <div class="home-index-logo">
        <img src="@/assets/img/hero-logo.png" alt="miHoYo" />
      </div>
      <div class="home-index-slg">
        <!-- 中间的标语 -->
        <img src="@/assets/img/slogan@2x.301d3f9.png" alt="" />
      </div>

      <div class="home-index-action" @click="showVideo">
        <!-- 点击查看视频的按钮 -->
        <div class="home-index-btn"></div>
      </div>

      <div class="scroll-btn scroll-tip">
        <div class="scroll-btn__mouse"></div>
        <div class="scroll-btn__arrow">
          <img src="@/assets/img/downArrow.svg" alt="" />
        </div>
        <div class="scroll-btn__line" style="display: none"></div>
      </div>
    </div>
    <!-- fp: first paint 首次绘制页面 遮罩层上面的样式 end-->
    <!-- 背景播放的视频 -->
    <div class="home-index-bg">
      <video
        src="https://webstatic.mihoyo.com/upload/op-public/2021/08/12/c7f405d6cbb03e5c668a12d3e0de290a_2683598109381103734.mp4"
        poster="https://webstatic.mihoyo.com/upload/op-public/2021/08/12/7a388979f57b0943e38a4fd33ea6d593_3621961254475262927.png"
        loop="loop"
        muted="muted"
        autoplay
        autobuffer
      ></video>
    </div>

    <!-- 遮罩层 -->
    <div class="home-index-bg__mask"></div>
  </div>
</template>

<script setup>
import { usePageStore } from '@/stores'
import { ref } from 'vue'

const page = ref('hero')
const pageStore = usePageStore()

const showVideo = () => {
  pageStore.isShowVideo =
    'https://webstatic.mihoyo.com/upload/op-public/2021/08/12/72d301e9cf955eee821909d756220686_2232999530661425548.mp4'
}
</script>

<style scoped lang="scss">
.home-hero {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 100%;
  }
}
.fp-page__wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9;
}

.home-index-logo {
  transition: opacity 1s;
  transition-delay: 0.2s;
  position: absolute;
  top: 0.22rem;
  left: 0.7rem;
  z-index: 9;
  height: 0.46rem;
  img {
    width: auto;
    height: 100%;
  }
}
.home-index-slg {
  z-index: 9;
  width: 5.74rem;
  max-height: 3.7rem;
  margin-left: 0.84rem;
  margin-bottom: 0.44rem;
  position: relative;
}
.home-index-action {
  position: relative;
  z-index: 9;
  width: 1.1rem;
  height: 0.56rem;
  .home-index-btn {
    position: relative;
    width: 1.06rem;
    height: 0.56rem;
    // 盒子的背景图
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAA4CAYAAAAVZ21rAAAAAXNSR0IArs4c6QAAAm5JREFUeF7tl7/LEnEcxz1OCBp8nBwSLlwa7gQXeQjBCIyGihAHoWhxKmxqzAgOIfqBs4s03j+QQzjKhYODj9KiQyA43CDcFAiBXTj0EFE95zvuPb1d/by/L3i9pjOiKIpS+lEN7Pf7XRiGt3O53Ke4YOMQyjCM+3EHuvt/A/1+/7TVaj05xMrn82dxXlSoOJYSuPE872aj0Xi03W4rlmV9uQihUBcZSvD/4XB4p1ar3Vuv16e2bQf/QilUgiHiPO37/oNSqVTebDbXHccJ/7ZRqDg2E76Zz+ePLcu6EgTBDcdxvv4Jp1AJR4jzvGmaxnK5fJbJZMzxeHyr2Wx++32nUHFMEm6y2ay5WCyep9PpcDAY3HVd9/uvWIUiRIiLsCzr0nQ6dXe73edCofAwlUqdf+MqVFyLpLtisXjZ9/3XQRB8tG376U+sQpECHIOpVCono9Ho3Wq1el8ul18etgp1jEHibb1ez3me92Y2m/Wq1epbhSLKPxbVbrev9no9dzKZvFCoY+2R7zudzrVut/tKocjiEVwURR8UCjFH3igUWTiKUyjUHHmnUGThKE6hUHPknUKRhaM4hULNkXcKRRaO4hQKNUfeKRRZOIpTKNQceadQZOEoTqFQc+SdQpGFoziFQs2RdwpFFo7iFAo1R94pFFk4ilMo1Bx5p1Bk4ShOoVBz5J1CkYWjOIVCzZF3CkUWjuIUCjVH3ikUWTiKUyjUHHmnUGThKE6hUHPknUKRhaM4hULNkXcKRRaO4hQKNUfeKRRZOIpTKNQceadQZOEoTqFQc+SdQpGFoziFQs2RdwpFFo7izkOhD2jHM/ADHdbwJ8875eoAAAAASUVORK5CYII=)
      no-repeat 0 0/100% 100%;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: '';
      width: 0;
      height: 0;
      margin-left: 0.14rem;
      border: 0.1rem solid transparent;
      border-left: 0.16rem solid #fff;
      transition: all 0.5s;
    }

    &:hover {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAA4CAYAAAAVZ21rAAAAAXNSR0IArs4c6QAAAodJREFUeF7tl09Ik3Ecxt/xRjGxQo0iwyKIKV6EGjIjp7YwyRiIJy3wqCEMhCLGCH5EZandu3jwoIdu6sE//aW8F0SB4J9Dh8HCiTI3MZzhIYmo/O2J9zk9u+77/D7w+ZxeX3RkfsfRj2pgJ7+d+55db57uDc3Zgn27oSa6KqO2A939v4GaLlNbUd/es5lNN7+MNXyweVGhbCx5cHPh1mDjyeDVm9mNbxdfxyKL+yEUaj9DHv4f6nt2ray67vp6Kln7PtGS/BdKoTwMYfP0pcRYx5HTVcHtZCo0Y1rSf9solI1Nj28a7493+4+Vl+dSmfBb05T5E06hPI5g9bzr+iL9U30H/MXu15XZK1+M2fp9p1BWJr0/Olh02G14MBn3uW56dvVVq2NM/leqQnnfwJrgLz11KGyem/zW5qcXtyOdjuPsfeMqlLVGzmFxRaAoHB/tz62lpt7EW3t/UhWK478gSsm580fr7gwPZJJLw+9M+73dsUIVpJB3fCIYOR7sfvp4bfnz0NyjG08Uiue+YNLZy51nqjvumvTCx4RCFayPOwhEewKVbbGHCsX1DtGiI/MTCgWp444UiusbpikUrI47VCiub5imULA67lChuL5hmkLB6rhDheL6hmkKBavjDhWK6xumKRSsjjtUKK5vmKZQsDruUKG4vmGaQsHquEOF4vqGaQoFq+MOFYrrG6YpFKyOO1Qorm+YplCwOu5Qobi+YZpCweq4Q4Xi+oZpCgWr4w4ViusbpikUrI47VCiub5imULA67lChuL5hmkLB6rhDheL6hmkKBavjDhWK6xumKRSsjjtUKK5vmKZQsDruUKG4vmGaQsHquEOF4vqGaXuh4Bc0pBn4AfBTumBicdXLAAAAAElFTkSuQmCC);
      &::before {
        border-left-color: #4ea1d9;
      }
    }
  }
}

.scroll-tip {
  position: absolute;
  bottom: 1.24rem;
}

.scroll-btn__mouse {
  width: 0.26rem;
  height: 0.4rem;
  background: url('@/assets/img/mouse.svg') no-repeat top center/0.2rem auto;
}

.home-index-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  overflow: hidden;
  video {
    min-height: 100%;
    min-width: 100%;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
    object-fit: cover;
  }
}

// 动画时间
.home-index-slg,
.home-index-action,
.scroll-tip {
  transition: transform 1000ms;
  transition-delay: 200ms;
}

.scroll-tip {
  transition: transform 800ms;
  transition-delay: 300ms;
}

.home-index-bg__mask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.85);
  // background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAE1JREFUOE9j5BaRuvnr+2cGNk5eBhighM8IMhBuEhUYKAZS4jKQW0D6aeNCargMFge0cSE1Ync0DCGhSI3Ypk0sU8Nlo+lwtDykoOQGAAxCqvFBleXSAAAAAElFTkSuQmCC) repeat 0 0/0.2rem 0.2rem;
}
</style>
