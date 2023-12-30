import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const pageIndex = ref(0)
  const homePage = ref('hero')
  const isShowVideo = ref('') //视频弹窗控件
  return { pageIndex, homePage, isShowVideo }
}
  , {
    persist: true //持久化这个页面的状态  保证刷新的时候路由参数不会消失
  }
)
