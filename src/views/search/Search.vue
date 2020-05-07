<template>
  <div>
    <van-nav-bar
      class="top-bar"
      title="搜索"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="main">
      <van-search
  v-model="keyword"
  shape="round"
  placeholder="请输入商家或美食"
  @search='onSearch'
/>
      <van-divider dashed>搜索历史</van-divider>
    </div>
  </div>
</template>

<script>
import { request } from 'request'
export default {
  data () {
    return {
      // 搜索关键词
      keyword: '',
      geohash: ''
    }
  },
  components: {

  },
  mounted () {
    this.geohash = this.$store.state.user.geohash
  },
  methods: {
    // 搜索商家，美食
    async onSearch () {
      const { data: res } = await request({
        url: 'v4/restaurants',
        params: {
          geohash: this.geohash,
          keyword: this.keyword
        }
      })
      console.log(res)
    }

  }
}
</script>

<style lang='less' scoped>
@import 'style/variable.less';
.top-bar {
  background-color: @color-theme;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-icon {
    color: #fff;
  }
}
</style>
