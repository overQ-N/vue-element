<template>
  <div>
    <van-tabbar v-model="activeName" @change="onChange" class="tabbar">
      <van-tabbar-item name="msite" to="/msite">
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
      activeName: '/msite'
    }
  },
  methods: {
    onChange (item) {
      // this.activeName = item
    }
  }
}
</script>

<style scoped>
.tabbar{
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 2px 3px rgba(0,0,0.5);
}
</style>
