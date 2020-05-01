<template>
  <div>
    <van-nav-bar class="nav-bar" :title="city" left-arrow @click-left="$router.back()" />
    <van-search v-model="value" shape="round" placeholder="请输入地址 商务楼 学校" @search='search'/>
    <div class="main">
      <div class="search-history" v-show="address.length<=0">
        <van-divider dashed>搜索历史</van-divider>
        <AddressList :address='user.citySearchHistory' :isSearchList='true' />
      </div>
      <div class="loading" v-show="isShow"><van-loading  type="spinner" /></div>
      <AddressList :address='address'/>
    </div>
  </div>
</template>

<script>
import { request } from 'request'
import { mapState } from 'vuex'
import AddressList from 'components/home/AddressList'
export default {
  data () {
    return {
      city: '',
      value: '',
      // 搜索地址
      address: [],
      // 显示加载中
      isShow: false
    }
  },
  components: {
    AddressList
  },
  mounted () {
    this.getCity()
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    value (val) {
      if (!val) this.address = []
      return ''
    }
  },
  methods: {
    // 获取选中的城市
    getCity () {
      const { id } = this.$route.params
      request({
        url: '/v1/cities/' + id
      }).then(res => {
        this.city = res.data.name
      })
    },
    // 搜索地址
    search () {
      this.isShow = true
      const { id } = this.$route.params
      request({
        url: '/v1/pois',
        params: {
          id,
          keyword: this.value
        }
      }).then(res => {
        this.address = res.data
        this.isShow = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import "assets/style/variable.less";
.nav-bar {
  background-color: @color-theme;
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-icon {
    color: #fff;
  }
}
.main {

  .loading{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
