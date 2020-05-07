<template>
  <div>
    <van-nav-bar class="top-bar" @click-left="$router.back()" left-arrow :title="title"></van-nav-bar>
   <!-- 下拉菜单 -->
    <van-dropdown-menu>
      <!-- <van-dropdown-item v-model="value" :options="option" /> -->
      <van-dropdown-item :title="title">
        <!-- :activeNav='activeId' -->
        <FoodSelectTree height='100vw'  :list='dropDowmItems'/>
      </van-dropdown-item>
      <van-dropdown-item :title="orderTitle" ref="orderRef">
        <FoodOrderBy @orderValueChange='orderValueChange'/>
      </van-dropdown-item>
      <van-dropdown-item title="筛选" ref="chooseRef">
        <FoodDelivery @confirm='confirm'/>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 店铺列表 -->
    <ShopList :dropdownValue='order'/>
  </div>
</template>

<script>
import { request } from 'request'
import FoodSelectTree from 'components/food/FoodSelectTree'
import FoodOrderBy from 'components/food/FoodOrderBy'
import FoodDelivery from 'components/food/FoodDelivery'
import ShopList from 'components/common/ShopList'
export default {
  data () {
    return {
      // activeIndex: 0,
      // 商家下拉列表选中的值
      activeId: 0,
      // 商家分类下拉菜单列表
      dropDowmItems: [
        { text: '', children: [] }
      ],
      // 导航栏标题
      title: '',
      latitude: '',
      longitude: '',
      // 排序方式的标题
      orderTitle: '智能排序',
      // 排序方式,默认为4 智能排序
      order: 4
    }
  },
  components: {
    FoodSelectTree,
    FoodOrderBy,
    FoodDelivery,
    ShopList
  },
  async mounted () {
    await this.initData()
    this.getCategory()
  },
  methods: {
    initData () {
      const { title, geohash } = this.$route.query
      this.title = title
      this.latitude = geohash.latitude
      this.longitude = geohash.longitude
    },
    // 获取所有商家店铺列表
    async getCategory () {
      const { data: res } = await request({
        url: '/shopping/v2/restaurant/category',
        params: {
          longitude: this.longitude,
          latitude: this.latitude
        }
      })
      res.forEach(v => {
        v.value = v.id
        // if (v.name === this.title) {
        //   this.activeId = v.ids[0]
        // }
        // v.sub_categories.forEach(v1 => {
        //   v1.id = v1._id
        // })
        v.children = v.sub_categories
      })
      console.log(res)
      // 获取激活状态的分类id
      this.dropDowmItems = res
    },

    // 接收orderby组件传过来的排序方式
    orderValueChange (item) {
      this.$refs.orderRef.toggle()
      this.order = item.value
      this.orderTitle = item.text
    },
    // 子组件点击了筛选的确定按钮
    confirm () {
      this.$refs.chooseRef.toggle()
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
  }
  /deep/.van-icon {
    color: #fff;
  }
}
</style>
