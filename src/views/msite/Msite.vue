<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="top-bar" @click-left="handleLeftClick" right-text="登录 | 注册">
      <template #left>
        <van-icon name="search" size="18" />
      </template>
      <template #title >
        <div class="title" @click="goHomePage">
          {{detailAddress.address}}
        </div>
      </template>
    </van-nav-bar>
    <!-- 食品分类列表 -->
    <van-swipe class="my-swipe" indicator-color="#007aff" :stop-propagation="false">
      <van-swipe-item>
        <van-grid :column-num="4" :border="false">
          <van-grid-item v-for="food in foodList.slice(0,8)" :key="food.id" :text="food.title" @click="foodItemClick(food)">
            <template #icon>
              <van-image :src="'https://fuss10.elemecdn.com/'+food.image_url"></van-image>
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid :column-num="4" :border="false">
          <van-grid-item v-for="food in foodList.slice(8,foodList.length)" :key="food.id" :text="food.title" @click="foodItemClick(food)">
            <template #icon>
              <van-image :src="'https://fuss10.elemecdn.com/'+food.image_url"></van-image>
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>

    <!-- 附近商家 -->
    <div class="shop">
      <div class="shop-item nearby">
        <van-icon name="shop-o"></van-icon>附近商家
      </div>
      <van-dropdown-menu class="shop-item">
        <van-dropdown-item v-model="dropdownValue" :options="option" />
      </van-dropdown-menu>
    </div>
    <!-- 店铺列表 -->
    <ShopList :dropdownValue='dropdownValue'/>

  </div>
</template>

<script>
import { request } from 'request'
import { tabBus } from '../../eventbus/tab'
import ShopList from 'components/common/ShopList'
export default {
  data () {
    return {
      // 接收城市搜索页跳转过来的经纬度信息
      geohash: '',
      // 详细地址
      detailAddress: '',
      // 食品列表
      foodList: [],
      baseURL: '',
      dropdownValue: 4,
      option: [
        { text: '起送价', value: 1 },
        { text: '配送速度', value: 2 },
        { text: '评分', value: 3 },
        { text: '智能排序', value: 4 },
        { text: '距离最近', value: 5 },
        { text: '销量最高', value: 6 }
      ]

    }
  },
  components: { ShopList },
  mounted () {
    this.geohash = this.$route.query.geohash
    // 如果没有经纬度信息,尝试从本地中获取
    if (!this.geohash) {
      this.geohash = this.$store.state.user.geohash
    }
    this.getDetailAddress()
    this.getFoodList()
  },
  methods: {
    // 获取详细地址
    getDetailAddress () {
      request({
        url: '/v2/pois/' + this.geohash
      }).then(res => {
        this.detailAddress = res.data
        this.$store.commit('user/setGeohash', this.geohash)
      })
    },
    // 获取食品分类列表
    async getFoodList () {
      const res = await request({ url: '/v2/index_entry' })
      this.foodList = res.data
      this.baseURL = res.config.baseURL
    },

    // 去往城市列表页
    goHomePage () {
      this.$router.push('/')
    },
    handleLeftClick () {
      tabBus.$emit('changeTab', 'search')
      this.$router.push('/search')
    },
    // 点击食品分类项,去往good页面
    foodItemClick (food) {
      this.$router.push({
        path: '/food',
        query: {
          geohash: this.geohash,
          title: food.title
        }
      })
    }
  },
  beforeDestroy () {
    tabBus.$off('changeTab')
  }
}
</script>

<style lang='less' scoped>
@import "style/variable.less";
.top-bar {
  background-color: @color-theme;
  /deep/.van-nav-bar__title {
    color: #fff;
    .title{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  /deep/.van-icon-search {
    color: #fff;
  }
  /deep/.van-nav-bar__text {
    color: #fff;
  }
}
.my-swipe {
  /deep/.van-swipe__indicator {
    background-color: #666;
  }
  /deep/ .van-image {
    width: 44px;
  }
}
.shop {
  display: flex;
  justify-content: space-around;
  .shop-item {
    flex: 1;
  }
  .nearby {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
    .van-icon {
      margin-right: 5px;
    }
  }
}
/deep/.van-dropdown-menu {
  display: flex;
  justify-content: space-around;
  .van-dropdown-menu__bar {
    flex: 1;
  }
}

</style>
