<template>
  <header class="header" v-if="isRunder">
    <div class="header__navwrap">
      <div class="header__navbar">
        <div class="header__navbar-logo">
          <router-link to="/">
            <slot name="logo">
              <img src="https://www.mihoyo.com/_nuxt/img/mihoyo-logo.fc3399a.png" alt="miHoYo_F" />
            </slot>
          </router-link>
        </div>

        <div class="header__navbar-links">
          <slot name="links">
            <div
              @click="linkSelect(index)"
              class="header__navbar-link"
              v-for="(item, index) in links"
              :key="item"
              :class="avtiveLink === index ? 'header__navbar-link--active' : ''"
            >
              <span>{{ item }}</span>
              <b>{{ item }}</b>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { usePageStore } from '@/stores/index'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageStore = usePageStore()

defineProps({
  links: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['click'])

// 初始化一个状态数组，根据状态改变连接的选中样式
let avtiveLink = ref(0)

const linkSelect = (index) => {
  pageStore.pageIndex = index //点击的时候把pinia中存储的状态也更改
  avtiveLink.value = index //更改当前的选中索引
  // console.log('索引',index);

  emit('click', index) //传给父组件
}
onMounted(() => {
  // console.log('跳转到',pageStore.pageIndex);
  linkSelect(pageStore.pageIndex)
  // console.log(pageStore.pageIndex)
})
// 向外公开修改选中的方法
defineExpose({
  linkSelect
})

// 控制header在最上面的时候不渲染
const isRunder = ref(false)

const currentPage = route.query.page

// 是不是在首页
const isNotIndexPage = p => {
  // console.log(p)
  if (p !== undefined && p !== '/') {
    return true
  } else {
    return false
  }
}

isRunder.value = isNotIndexPage(currentPage)

// 监听路由 如果为首页就不渲染header
watch(
  () => route.query.page,
  newval => {
    // console.log(newval)
    // 每一次swiper滚动都会改变路由和pageIndex
    isRunder.value = isNotIndexPage(newval)
    // console.log('显示header吗',isRunder.value,isNotIndexPage(newval));

    avtiveLink.value = pageStore.pageIndex
    // console.log(avtiveLink.value)
  }
)
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  min-width: 14rem;
  height: 0.9rem;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  background-color: #fff;
  border: 1px solid #e6e7eb !important;
  transition: top 500ms;
}
.header__navwrap {
  width: 100%;
}

.header__navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.48rem 0 0.7rem;
  white-space: nowrap;
  flex-wrap: nowrap;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    width: 1px;
    height: 0.18rem;
    background-color: #e6e7eb;
  }
}

.header__navbar-logo {
  height: 0.46rem;
  img {
    height: 100%;
  }
}

.header__navbar-links {
  display: flex;
  align-items: center;
}

.header__navbar-link {
  position: relative;
  font-size: 0.18rem;
  color: #676b73;
  padding: 0.1rem;
  padding-right: 0.05rem;
  margin-left: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: color 500ms;
  span {
    visibility: visible;
  }
  b {
    position: absolute;
    top: 50%;
    right: 0.05rem;
    visibility: hidden;
    transform: translateY(-50%);
  }
  &:hover {
    color: #3778e5;
    // 选中后隐藏span，露出span底下的b标签，表示加粗
    span {
      visibility: hidden;
    }
    b {
      visibility: visible;
    }
  }
}
// 表示该项选中的类
.header__navbar-link--active {
  color: #3778e5;

  span {
    visibility: hidden;
    // 选中后隐藏span，露出span底下的b标签，表示加粗
  }

  b {
    visibility: visible;
  }
}
</style>
