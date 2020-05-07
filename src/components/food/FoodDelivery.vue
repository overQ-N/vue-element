<template>
  <div class="delivery-wrap" ref="deliveryRef">
    <div class="delivery">
      <div class="text">配送方式</div>
      <div class="row">
        <div class="col" ref="deliveryItem" v-for="(item, index) in deliveryMode" :key="index" @click="deliveryItemClick(item,index)">
          <i class="font" :style="`color:#${item.color}`">专</i>
         <i class="van-icon van-icon-success"></i>
          {{item.text}}
        </div>
      </div>
    </div>
    <div class="shopAttr">
      <div class="text">商家属性(可以多选)</div>
      <div class="row">
        <div class="col" ref="item" v-for="(item, index) in shopAttrList" :key="index" @click="shopAttrItemClick(item,index)">
         <i class="font" :style="`border:1px solid #${item.icon_color};color:#${item.icon_color}`">{{item.icon_name}}</i>
         <i class="van-icon van-icon-success"></i>
          {{item.name}}
        </div>
      </div>
      <van-row type='flex' justify='space-between' style="margin-bottom:10px;">
        <van-button style="width:40%;" type="default" @click="clear">清空</van-button>
        <van-button style="width:40%;" type="primary" @click="confirm">确定
          <span v-show="activeList.length>0">({{activeList.length}})</span>
        </van-button>
      </van-row>
    </div>
  </div>
</template>

<script>
import { request } from 'request'
export default {
  data () {
    return {
      longtitude: '',
      latitude: '',
      // 选中的商家属性
      activeList: [],
      // 商家属性列表
      shopAttrList: [],
      // 所有配送方式
      deliveryMode: [],
      // 选中的配送方式
      activeDeliveryModeList: []
    }
  },
  mounted () {
    const geohash = this.$store.state.user.geohash
    this.longtitude = geohash.split(',')[1]
    this.latitude = geohash.split(',')[0]
    this.getShopAttr()
    this.getDeliveryMode()
  },
  methods: {
    // 获取商家属性列表
    async getShopAttr () {
      const { data: res } = await request({
        url: '/shopping/v1/restaurants/activity_attributes',
        params: {
          longtitude: this.longtitude,
          latitude: this.latitude
        }
      })
      this.shopAttrList = res
      console.log(res, '-----------')
    },
    // 当商家属性被点击时
    shopAttrItemClick (item, i) {
      const index = this.activeList.findIndex(v => v === item.id)
      // 已存在,再次点击删除
      // 不存在,点击添加
      if (index === -1) {
        this.$refs.item[i].classList.add('active')
        this.activeList.push(item.id)
      } else {
        this.$refs.item[i].classList.remove('active')
        this.activeList.splice(index, 1)
      }
    },
    // 获取配送方式
    async getDeliveryMode () {
      const { data: res } = await request({
        url: 'shopping/v1/restaurants/delivery_modes',
        params: {
          longitude: this.longitude,
          latitude: this.latitude
        }
      })
      this.deliveryMode = res
      console.log(res, 'mode------------')
    },
    // 配送方式点击时
    deliveryItemClick (item, i) {
      const index = this.activeDeliveryModeList.findIndex(v => v === item.id)
      // 已存在,再次点击删除
      // 不存在,点击添加
      console.log(this)
      if (index === -1) {
        this.$refs.deliveryItem[i].classList.add('active')
        this.activeDeliveryModeList.push(item.id)
      } else {
        this.$refs.deliveryItem[i].classList.remove('active')
        this.activeDeliveryModeList.splice(index, 1)
      }
    },
    // 清空所选中
    clear () {
      this.$refs.deliveryItem.forEach(v => v.classList.remove('active'))
      this.$refs.item.forEach(v => v.classList.remove('active'))
      this.activeList = []
      this.activeDeliveryModeList = []
    },
    // 确定
    confirm () {
      this.$emit('confirm')
    }
  }
}

</script>

<style lang='less' scoped>
.delivery-wrap{
  padding:0 15px;
}
.text{
  padding: 5px 0;
  font-size: 12px;
}
.row{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

}
.col{
    width:30%;
    flex: none;
    display: flex;
    // justify-content: center;
    align-items: center;
    border:1px solid #eee;
    height: 33px;
    margin-bottom: 10px;
    .font{
      display: inline-block;
      margin: 0 4px;
      padding: 2px 3px;
      border-radius: 4px;
    }
    .van-icon{
      display: none;
      margin: 0 3px;
      font-size: 16px;
    }
    &.active{
      color:#3190e8;
      .van-icon{
        display: block;
      }
      .font{
        display: none;
      }
    }
  }
</style>
