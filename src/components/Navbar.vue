<template>
  <div class="navBar" :style="navStyle">
    <nav
      class="nav-item"
      :class="index == selected ? 'nav-item-border' : ''"
      v-for="(item, index) in items"
      :key="index"
      @click="navChange(index)"
    >
      <slot name="img" :item="item"> <img :src="item" alt="mihayo" /></slot>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['navchange'])

 defineProps({
  delay: {
    type: Number,
    default: 3420 //延迟时间
  },
  items: {
    type: Array,
    default: () => [
      'https://webstatic.mihoyo.com/upload/op-public/2021/10/11/320a35c423a3d8ca043d7ee14a8c7925_602536019813937911.png',
      'https://webstatic.mihoyo.com/upload/op-public/2021/10/03/4080f2eb748823d8c38507c3d7b69b36_936817768851375073.png',
      'https://webstatic.mihoyo.com/upload/op-public/2021/10/03/a103c80cb895bfdfb7496f4233b63158_8329011972047580487.png',
      'https://webstatic.mihoyo.com/upload/op-public/2021/10/09/def1f2abcfc2af0bbe2e5900a60a5ee1_5699547505742166353.png',
      'https://webstatic.mihoyo.com/upload/op-public/2021/10/09/870472d6104dbbe7ea18b27c13763ccb_5300916022261002498.png',
      'https://webstatic.mihoyo.com/upload/op-public/2022/05/27/3896559583929f643fbe39ec1d6ca1c9_1026345827445617861.png',
      'https://webstatic.mihoyo.com/upload/op-public/2021/10/09/c218c585aac4aad0a30ab9a6e0e0794c_3908343860724847173.png',
      'https://webstatic.mihoyo.com/upload/op-public/2021/10/12/7bca19669fd95c1a961a26dc009c342e_7821980510293425191.png'
    ]
  },
  navStyle: {
    type: Object,
    default: () => ({ top: '8.9rem', left: '50%' })
  }
})
const selected = ref(0) // selected 当前选中的图标位置，获得边框。默认是第一个图标
onMounted(() => {
})



const navChange = (index, fatherClick = false) => {
  // 点击切换选中 并且暂停十秒轮播 把时间传递到父组件 让上面的轮播同步
  selected.value = index
  // pause(1000)
  if (!fatherClick) {
    // 父组件点击无法触发这个时间
    emit('navchange', index)
  }
}


// 向外公开的变量
defineExpose({
  navChange
})

</script>

<style scoped lang="scss">
.navBar {
  position: absolute;
  z-index: 9;
  display: flex;
  width: 13.7rem;
  height: 1rem;
  justify-content: flex-end;
  transform: translateX(-81.9%);
}

.nav-item {
  display: flex;
  justify-content: center;
  box-sizing: content-box;
  align-items: center;
  width: 0.74rem;
  height: 0.74rem;
  padding: 2px;
  border: 2px solid transparent;
  border-radius: 0.06rem;
  margin-right: 0.1rem;

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;

    transition: border 0.3s;
    filter: blur(0.32px);
  }
  &:hover {
    border-color: #3778e5;
  }
}
.nav-item-border {
  border-color: #3778e5;
}
</style>
