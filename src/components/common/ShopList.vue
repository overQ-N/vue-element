<template>
  <van-list
    class="shop-list"
    v-model="loading"
    :finished="finished"
    :immediate-check="false"
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
          <van-rate
            v-model="item.rating"
            allow-half
            readonly
            size="10px"
            void-icon="star"
            void-color="#eee"
          />
          <span class="shop-rate-num">{{item.rating}}</span>
          月售{{item.recent_order_num}}单
        </div>
        <div>￥{{item.float_minimum_order_amount}}起送 / 配送费约￥{{item.float_delivery_fee}}</div>
      </div>
      <div class="diliver cell-item">
        <div class="ticket">保准票</div>
        <div class="tag">
          <span class="fengniao">峰鸟专送</span>
          <span class="time">准时达</span>
        </div>
        <div class="distance">
          {{item.distance}} /
          <span>{{item.order_lead_time}}</span>
        </div>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
import { request } from 'request'
export default {
  props: {
    dropdownValue: {
      type: Number,
      default: 4
    },
    restaurantCategoryId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      geohash: '',
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
        restaurant_category_ids: [],
        // 排序方式
        order_by: this.dropdownValue
      },
      baseURL: '',
      // 商铺信息列表
      shopList: [],
      loading: false,
      finished: false
    }
  },
  mounted () {
    if (!this.geohash) {
      this.geohash = this.$store.state.user.geohash
      this.queryInfo.longitude = this.geohash.split(',')[1]
      this.queryInfo.latitude = this.geohash.split(',')[0]
    }
    this.getShopList()
  },
  methods: {
    // 获取店铺列表
    async getShopList () {
      const res = await request({ url: '/shopping/restaurants', params: this.queryInfo })
      this.baseURL = res.config.baseURL
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
    }
  },
  watch: {
    // 排序方式的改变
    dropdownValue (newVal) {
      this.queryInfo.offset = 0
      this.queryInfo.order_by = newVal
      this.shopList = []
      this.getShopList()
    },
    // 监听餐铺id的变化
    restaurantCategoryId (newVal) {
      this.queryInfo.offset = 0
      this.queryInfo.restaurant_category_ids = []
      this.queryInfo.restaurant_category_ids.push(newVal)
      this.shopList = []
      this.getShopList()
    }
  }
}
</script>

<style lang='less' scoped>
@import "style/variable.less";
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
