<template>
  <div>
    <van-nav-bar class="bar-top" left-text="饿了么" right-text="登录 | 注册" @click-right="onClickRight"></van-nav-bar>
    <van-nav-bar class='bar-city' left-text="当前定位城市" right-text="定们不准时，请在城市列表中选择"></van-nav-bar>
    <van-nav-bar class='bar-location' :left-text="guessCity" :border='false'>
       <template #right>
        <van-icon name="arrow" size="18" />
      </template>
    </van-nav-bar>
    <div class="line"></div>
    <TreeSelect class="tree-select"/>
  </div>
</template>

<script>
import TreeSelect from 'components/home/TreeSelect'
import { request } from 'request'
export default {
  data () {
    return {
      // 当前城市
      guessCity: ''
    }
  },
  components: {
    TreeSelect
  },
  methods: {
    onClickRight () {},
    getCities (type) {
      request({
        url: '/v1/cities',
        params: {
          type
        }
      }).then(res => {
        this.guessCity = res.data.name
      })
    }
  },
  mounted () {
    this.getCities('guess')
  }
}
</script>

<style lang='less' scoped>
@import "../assets/style/variable.less";
.bar-top {
  background-color: @color-theme;
  /deep/ .van-nav-bar__text {
    color: #fff;
  }
}
.bar-city{
  border:1px solid @color-border;
  /deep/ .van-nav-bar__text{
    color:@color-font;
  }
  /deep/ .van-nav-bar__right{
    .van-nav-bar__text{
      font-size: @font-small;
    }
  }
}
.line{
  height: 10px;
  border-top:2px solid @color-border;
  border-bottom:2px solid @color-border;
}
.tree-select{
  height: calc(100vh - 154px);
}
</style>
