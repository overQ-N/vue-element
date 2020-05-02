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
          <van-grid-item v-for="food in foodList1" :key="food.id" :text="food.title">
            <template #icon>
              <van-image :src="'https://fuss10.elemecdn.com/'+food.image_url"></van-image>
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid :column-num="4" :border="false">
          <van-grid-item v-for="food in foodList2" :key="food.id" :text="food.title">
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
    <van-list
      class="shop-list"
      v-model="loading"
      :finished="finished"
      :immediate-check='false'
      :offset="100"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell class="cell" v-for="item in shopList" :key="item.id">
        <img :src="baseURL+'/img/'+item.image_path" alt />
        <div class="shop-info cell-item">
          <div class="shop-name">
            <van-tag color="#ffd930" v-if="item.is_premium">品牌</van-tag>
            <span class="shop-title">{{item.name}}</span>
          </div>
          <div class="shop-rate">
            <van-rate v-model="item.rating" allow-half readonly size='10px' void-icon="star" void-color="#eee" />
            <span class="shop-rate-num">{{item.rating}}</span>
            月售{{item.recent_order_num}}单
          </div>
          <div>￥{{item.float_minimum_order_amount}}起送 / 配送费约￥{{item.float_delivery_fee}}</div>
        </div>
        <div class="diliver cell-item">
          <div class='ticket'>保准票</div>
          <div class="tag">
            <span class="fengniao">峰鸟专送</span>
            <span class="time">准时达</span>
          </div>
          <div class="distance">{{item.distance}} / <span>{{item.order_lead_time}}</span></div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { request } from 'request'
export default {
  data () {
    return {
      // 接收城市搜索页跳转过来的经纬度信息
      geohash: '',
      // 详细地址
      detailAddress: '',
      // 食品列表
      foodList1: [],
      foodList2: [],
      baseURL: '',
      dropdownValue: 4,
      rate: 3.7,
      option: [
        { text: '起送价', value: 1 },
        { text: '配送速度', value: 2 },
        { text: '评分', value: 3 },
        { text: '智能排序', value: 4 },
        { text: '距离最近', value: 5 },
        { text: '销量最高', value: 6 }
      ],
      // 请求商家信息的参数
      queryInfo: {
        latitude: '',
        longitude: '',
        // 跳过多少条数据
        offset: 0,
        // 请求的数据量
        limit: 20,
        // 餐馆分类id
        restaurant_category_id: 1,
        // 排序方式
        order_by: 4
      },
      // 商铺信息列表
      shopList: [],
      loading: false,
      finished: false
    }
  },
  components: {},
  mounted () {
    this.geohash = this.$route.query.geohash
    // 如果没有经纬度信息,尝试从本地中获取
    if (!this.geohash) {
      this.geohash = this.$store.state.user.geohash
    }
    this.getDetailAddress()
    this.getFoodList()
  },
  watch: {
    // 监听排序方式的改变
    dropdownValue (newVal) {
      this.queryInfo.offset = 0
      this.queryInfo.order_by = newVal
      this.shopList = []
      this.getShopList()
    }
  },
  methods: {
    // 获取详细地址
    getDetailAddress () {
      request({
        url: '/v2/pois/' + this.geohash
      }).then(res => {
        this.detailAddress = res.data
        this.queryInfo.longitude = this.detailAddress.longitude
        this.queryInfo.latitude = this.detailAddress.latitude
        this.$store.commit('user/setGeohash', this.geohash)
        this.getShopList()
      })
    },
    // 获取食品分类列表
    async getFoodList () {
      const res = await request({ url: '/v2/index_entry' })
      this.foodList1 = res.data.slice(0, 8)
      this.foodList2 = res.data.slice(8, res.data.length)
      this.baseURL = res.config.baseURL
    },

    // 获取商家信息
    async getShopList () {
      const res = await request({ url: '/shopping/restaurants', params: this.queryInfo })
      if (this.shopList.length === 0) {
        this.shopList = res.data
      } else {
        this.shopList = this.shopList.concat(res.data)
      }
      this.loading = false
    },
    // 商家店铺列表下拉刷新
    onLoad () {
      this.queryInfo.offset += 20
      this.getShopList()
      if (this.shopList.length >= 100) {
        this.finished = true
      }
    },
    // 去往城市列表页
    goHomePage () {
      this.$router.push('/')
    },
    handleLeftClick () {
      this.$router.push('/search')
    }
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

.shop-list {
  .cell {
    .van-cell__value {
      display: flex;
      font-size: @font-small;
      img {
        width: 72px;
        height: 72px;
        display: block;
      }
      .cell-item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .shop-info {
        padding-left:10px;
        flex: 1;
        .shop-name{
          width:150px;
           text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          .shop-title{
            font-size: 14px;
            width:100%;
            padding-left: 5px;
            font-weight: 600;
          }
        }
        .shop-rate-num{
          -moz-transform: scale(.9);
          transform: scale(.9);
          margin-left: 3px;
        }
      }
      .diliver{
        align-items: flex-end;
        transform: scale(.9);
        .ticket{
          color:#333;
        }
        .tag{
          .fengniao{
            background-color: @color-theme;
            color:#fff;
          }
          .time{
            border:1px solid @color-theme;
            color:@color-theme;
            margin-left: 3px;
          }
        }
        .distance{
          height: 20px;
          span{
            color:@color-theme;
          }
        }
      }

    }
  }
}
</style>
