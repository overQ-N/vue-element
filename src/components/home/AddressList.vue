<template>
  <div>
    <ul class="list">
        <li v-for="(item, index) in address" :key="index" @click="handleItemClick(item)">
          <div class="name">{{item.name}}</div>
          <div class="address">{{item.address}}</div>
        </li>
        <li v-show="isSearchList&&address.length>0" class="clear">
          <van-button type="info" size='small' @click="clearHistory">清空记录</van-button>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Array,
      default: () => {
        return []
      }
    },
    isSearchList: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 当列表项被点击时
    handleItemClick (item) {
      if (!this.isSearchList) {
        // 如果不是搜索记录的列表 点击存进搜索记录中
        this.$store.commit('user/setCitySearchHistory', item)
      }
      console.log(item)
      this.$router.push({
        path: '/msite', query: { geohash: item.geohash }
      })
    },
    // 清空搜索记录
    clearHistory () {
      this.$store.commit('user/clearCitySearchHistory')
    }
  }
}
</script>

<style lang='less' scoped>
@import "assets/style/variable.less";
.list {
    li {
      height: 74px;
      border-bottom: 1px solid @color-border;
      padding: 20px 20px;
      box-sizing: border-box;
      .name{
        margin-bottom: 6px;
        font-size: 16px;
        color:#333;
      }
      .address{
        font-size: @font-small;
        color:#999999;
        text-overflow:ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .clear{
      border-bottom: 0;
      text-align: center;
    }
  }
</style>
