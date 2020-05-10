<template>
  <!-- 店铺展示页 -->
  <div class="container">
    <div class="arrow-fixed" @click="$router.back()"></div>
    <ShopHeader :shopInfo='shopInfo'/>
    <van-tabs v-model="activeTab" class="tabs">
      <van-tab title="商品">
        <ShopTreeSelect :menu='menu'/>
      </van-tab>
      <van-tab title="评价">内容 2</van-tab>
    </van-tabs>
    <div class="cart">
      <div class="cart-icon-wrap">
        <van-icon name="cart-o" class="cart-icon"></van-icon>
      </div>
      <div class="money">
        <div class="money-total">￥
          <!-- <pre>{{$store.getters.order.totalCartPrice}}</pre> -->
          {{Number($store.getters.totalCartPrice).toFixed(2)}}
        </div>
        <div class="money-delivery">配送费￥5</div>
      </div>
      <div class="isSend">
        {{sendMoney}}
      </div>
    </div>
  </div>
</template>

<script>
import { request } from 'request'
import ShopHeader from 'components/shop/ShopHeader'
import ShopTreeSelect from 'components/shop/ShopTreeSelect'
export default {
  data () {
    return {
      // 商铺id
      shopid: 0,
      // 商铺详情
      shopInfo: {},
      // 激活的菜单栏
      activeTab: 0,
      // 菜单列表
      menu: []
    }
  },
  components: {
    ShopHeader,
    ShopTreeSelect
  },
  mounted () {
    this.shopid = this.$route.query.id
    this.getShopDetail()
    this.getMenu()
  },
  methods: {
    // 获取店铺详情
    getShopDetail () {
      request({
        url: 'https://elm.cangdu.org/shopping/restaurant/' + this.shopid
      }).then(res => {
        this.shopInfo = res.data
      })
    },
    // 获取菜单
    getMenu () {
      request({ url: '/shopping/v2/menu', params: { restaurant_id: this.shopid } }).then(res => {
        this.menu = res.data
      })
    }
  },
  computed: {
    //  是否免费配送 订单超20元免费配送
    sendMoney () {
      const freeMoney = 20
      const remainMoney = freeMoney - this.$store.getters.totalCartPrice
      if (remainMoney > 0) {
        return `还差￥${remainMoney}元起送`
      } else {
        return '蜂鸟专送'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.container{
  padding-bottom: 49px;
}
@import 'style/variable.less';
.arrow-fixed {
  position: fixed;
  top: 50%;
  width: 10px;
  height: 10px;
  top: 5px;
  left: 12px;
  z-index: 2;
  border-top: 3px solid #fff;
  border-right: 3px solid #fff;
  border-bottom: 1px solid transparent;
  border-left: 1px solid transparent;
  transform: rotate(-135deg) translateY(-50%);
}

.tabs{
  /deep/.van-tabs__line{
    background-color:@color-theme;
  }
}
.cart{
  position: fixed;
  left: 0;
  bottom:0;
  width: 100%;
  color: #fff;
  background-color: #3d3d3f;
  height: 49px;
  display: flex;
  justify-content: space-between;
  .cart-icon-wrap{
    margin: 0 10px;
    width: 40px;
    height: 40px;
    background: #3d3d3f;
    position: relative;
    text-align: center;
    border-radius: 100px;
    padding: 10px;
    box-shadow: 0 2px 3px rgba(255, 255, 255, .25);
    top: -25px;
    .cart-icon{
    font-size: 40px;
  }
  }
  .money{
    flex: 1;
    .money-total{
      font-weight: 600;
      font-size: 16px;
    }
    .money-delivery{}
  }
  .isSend{
    width: 100px;
    line-height: 49px;
    padding: 0 10px;
  }
}
</style>
