<template>
  <div class="view hide">
    <MiLayout>
      <template #header>
        <MiHeader :links="links" @click="linkMatchRoute" ref="miheader"></MiHeader>
      </template>
      <template #default>
        <Hero></Hero>
      </template>
      <template #product>
        <Product></Product>
      </template>
      <template #about>
        <About></About>
      </template>
      <template #join>
        <Join></Join>
      </template>
      <template #news>
        <News></News>
      </template>
    </MiLayout>
    <!-- 视频组件 -->
    <MiMaskVideo></MiMaskVideo>
  </div>
</template>

<script setup>
import MiLayout from '@/layout/MiLayout.vue'
import MiHeader from '@/components/MiHeader.vue'
import About from '@/views/About/index.vue'
import Hero from '@/views/Hero/index.vue'
import Join from '@/views/Join/index.vue'
import News from '@/views/News/index.vue'
import Product from '@/views/Product/index.vue'
import MiMaskVideo from '@/components/MiMaskVideo.vue'
import { onMounted, ref, watch } from 'vue'
import { getHeaderLinks, getMihoyoData } from '@/assets/js/api'
import { useRouter, useRoute } from 'vue-router'
import { usePageStore } from '@/stores/index'
const router = useRouter()
const route = useRoute()
const pageStore = usePageStore()
// 传递给子组件的数据
let links = ref([])
const paths = ref([])

// 顶部的dom
const miheader = ref()

onMounted(() => {
  getData()
  routeMatchLink()
})
// 点击头部导航栏链接后切换路由
const linkMatchRoute = index => {
  // 如果是个网络链接就开一个新窗口
  if (paths.value[index]?.indexOf('http') != -1) {
    // window.open(paths.value[index], '_blank')
  } else {
    const page = index == 0 ? '' : '/?page=' + paths.value[index]
    router.push(page)
    // router.push("/?page=" + paths.value[index]);
  }
}

// 根据路由改变顶部导航栏的连接状态
const routeMatchLink = () => {
  // console.log('调用');
  // header创建后
  if (miheader.value) {
    // console.log('路哟',route.query.page);
    if (route.query.page == undefined) {
      //首页
      miheader.value.linkSelect(0)
    } else {
      miheader.value.linkSelect(pageStore.pageIndex)
    }
  }
}
watch(
  () => route.query,
  () => {
    // console.log(newval)
    routeMatchLink()
  }
)

// 获取数据
const getData = async () => {
  // const res = getMihoyoData()//获取历史的数据
  const data = getHeaderLinks() //获取header的数据

  data.forEach(item => {
    links.value.push(item.title)
    paths.value.push(item.path)
  })

  setTimeout(() => {
    document.querySelector(".view").classList.remove("hide")
  }, 8)
}
</script>

<style scoped lang="scss">
.view {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f8f9fb
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAFVJREFUSEtjfPn+238GJMDBxozMJZn949dfuB5GkOHiglyMJJtChIYhbPjHrz//83Oz0yZYRg3HlngYR4NlNFiIKFUgSkZTC9agGg0W7MEyWs1hCxcAF5pe5Ya82ZoAAAAASUVORK5CYII=)
    repeat center center/0.23rem 0.23rem;
}
.hide {
  visibility: hidden;
}
</style>
