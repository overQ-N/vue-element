<template>
  <div class="container" :style="`background:${bgColor};height:${height}px`">
    <div class="nav-item left">
      <slot name='left'></slot>
    </div>
    <div class="nav-item center">
      <slot name='center'></slot>
    </div>
    <div class="nav-item right">
      <slot name='right'></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    },
    height: {
      type: Number,
      default: 49
    }
  }
}
</script>

<style lang='less' scoped>
.container{
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  color:#fff;
  .nav-item{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center{
    flex:1;
  }
}
</style>
