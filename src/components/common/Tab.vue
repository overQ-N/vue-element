<template>
  <div>
    <van-tabbar v-model="activeName" @change="onChange">
      <van-tabbar-item name="msite">
        <template #icon>
          <i class="iconfont icon-SSS-copy"></i>
        </template>
        外卖
      </van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item name="order" icon="notes-o" to='/order'>订单</van-tabbar-item>
      <van-tabbar-item name="profile" icon="contact" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// data: {
//   activeName: 'msite'
// }
export default {
  // eslint-disable-next-line vue/no-shared-component-data
  data () {
    return {
      activeName: 'msite'
    }
  },
  methods: {
    onChange (item) {
      this.activeName = item
    }
  }
}
</script>

<style scoped>

</style>
