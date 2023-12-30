<template>
  <div class="mibanner-btn" @click="btnClick">
    <div class="mibanner-btn-box">
      <div class="mibanner-btn-box__bg">
        <b></b>
      </div>
    </div>
    <div class="mibanner-btn-text">
      <span> intro video </span>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['click'])

const btnClick = () => {
  emit('click')
}
</script>

<style scoped lang="scss">
// 有animated代表被选中了 只有被选中的才显示按钮
.animated {
  .mibanner-btn {
    transition-delay: 500ms;
  }

  .mibanner-btn-box {
    height: 0.96rem;
  }

  .mibanner-btn-text {
    width: 1.6rem;
  }
}

.mibanner-btn {
  position: absolute;
  top: 4.5rem;
  left: 11rem;
  z-index: 9;
  width: 2.24rem;
  height: 0.96rem;
  cursor: pointer;
  b {
    // 向右的三角形
    width: 0;
    height: 0;
    margin-left: 0.14rem;
    border: 0.1rem solid transparent;
    border-left: 0.16rem solid #3d424d;
    transition: all 500ms;
    position: relative;
    z-index: 1;
  }
}
.mibanner-btn-box {
  position: absolute;
  left: 0;
  bottom: 0;
  // top: 0;
  width: 2.24rem;
  height: 0;
  overflow: hidden;
  transition: all 1.2s ease-in;
}

.mibanner-btn-box__bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.24rem;
  height: 0.96rem;
  position: absolute;
  left: 0;
  bottom: 0;
  background: url('https://www.mihoyo.com/_nuxt/img/icon-play-bg.acf8bb6.png') no-repeat 0 0/100% 100%;
}

.mibanner-btn-text {
  position: absolute;
  width: 0;
  height: 0.24rem;
  line-height: 0.24rem;
  left: 0.64rem;
  bottom: -0.34rem;
  text-transform: uppercase;
  font-size: 0.18rem;
  font-family: HarmonyOs, Arial, Helvetica, sans-serif;
  font-weight: bold;
  transition: width 1.2s cubic-bezier(0.17, 0.67, 0.22, 1.09); //让文字慢慢出现

  overflow: hidden;
  transition-delay: 600ms;
  span {
    width: 1.6rem;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    text-align: right;
  }
}
// .mibanner-btn-text {
//   position: absolute;
//   width: 0;
//   height: 0.24rem;
//   line-height: 0.24rem;
//   left: 0.64rem;
//   bottom: -0.34rem;
//   text-transform: uppercase;
//   font-size: 0.18rem;
//   font-family: HarmonyOS, Arial, Helvetica, sans-serif;
//   font-weight: bold;
//   transition: width 1200ms cubic-bezier(0.17, 0.67, 0.22, 1.09);
//   overflow: hidden;
//   transition-delay: 600ms;

//   span {
//     width: 1.6rem;
//     display: block;
//     position: absolute;
//     left: 0;
//     top: 0;
//     text-align: right;
//   }
// }
</style>
