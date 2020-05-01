<template>
  <div>
    <van-tree-select
      :items="Hotitems"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-item='handleItemClick'
      height='100%'
    />
  </div>
</template>

<script>
import { request } from 'request'
export default {
  data () {
    return {
      Hotitems: [{
        text: '热门城市',
        class: 'my-clss',
        children: []
      }],
      activeIndex: 0,
      activeId: 1
    }
  },
  mounted () {
    this.getCities('hot')
    this.getCities('group')
  },
  methods: {
    // 获取城市列表
    getCities (type) {
      request({
        url: '/v1/cities',
        params: {
          type
        }
      }).then(res => {
        console.log(res)
        if (type === 'hot') this.setHotCities(res.data)
        if (type === 'group') this.setGroupCities(res.data)
      })
    },
    // 热门城市
    setHotCities (data) {
      const cities = data.map(city => {
        city.text = city.name
        return city
      })
      this.Hotitems[0].children = cities
    },
    // 全部城市
    setGroupCities (data) {
      const cities = []
      for (const key in data) {
        const obj = {}
        obj.text = key
        const children = data[key].map(city => {
          city.text = city.name
          return city
        })
        obj.children = children
        cities.push(obj)
      }
      // 城市根据字母排序
      cities.sort((a, b) => {
        var letterA = a.text
        var letterB = b.text
        if (letterA < letterB) {
          return -1
        }
        if (letterA > letterB) {
          return 1
        }
        return 0
      })

      this.Hotitems = [...this.Hotitems, ...cities]
    },
    handleItemClick (item) {
      this.$router.push({
        path: '/city/' + item.id
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import 'assets/style/variable.less';
.van-sidebar-item--select::before{
  background-color: @color-theme;
}
.van-tree-select__item--active{
  color:@color-theme;
}
</style>
