<template>
  <div>
    <div class="tree-select" :style="`height:${height};`">
      <!-- <div class="tree-wrap" > -->
      <div class="tree-select-nav">
        <div
          class="nav-item select-item"
          @click="navClick(item)"
          :class="[activeNav===item.id?'active-nav':'']"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="nav-item-info">
            <img :src="'https://fuss10.elemecdn.com/'+item.image_url" alt />
            {{item.name}}
            <div class="nav-item-badge">{{item.count}}</div>
          </div>
        </div>
      </div>
      <div class="tree-select-slide">
        <div
          :class="['slide-item', 'select-item', activeSlide===subItem.id?'active-slide':'']"
          @click="slideClick(subItem)"
          v-for="(subItem, index) in slideList"
          :key="index"
        >
          {{subItem.name}}
          <!-- <div class="slide-badge">{{subItem.count}}</div> -->
          <i class="van-icon van-icon-success select-slide"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 高度
    height: {
      type: [String, Number],
      default: '55vw'
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
    // activeNav: {
    //   type: Number,
    //   default: 0
    // }
  },
  data () {
    return {
      // 左侧滚动区选中的id
      activeNav: 1,
      // 右侧滚动区选中的id
      activeSlide: 1
    }
  },
  mounted () {
    // this.activeSlide = this.activeNav
  },
  computed: {
    slideList () {
      if (this.list.length <= 1) return []
      const children = this.list.filter(v => v.id === this.activeNav)
      return children[0] ? children[0].children : []
    }
  },
  methods: {
    // 点击左侧滚动区
    navClick (item) {
      this.activeNav = item.id
    },
    // 点击右侧滚动区
    slideClick (subItem) {
      this.activeSlide = subItem.id
      this.$emit('restaurantCateIdChanged', subItem)
    }
  }
}
</script>

<style lang='less' scoped>
@import "style/variable.less";
.tree-select {
  display: flex;
  width: 100%;
  font-size: 13px;
  .tree-select-nav {
    flex: 1;
    background: #f7f8fa;
    overflow-y: auto;
    .nav-item {
      padding-left: 8px;
      .nav-item-info {
        position: relative;
        img {
          width: 20px;
          height: 20px;
        }
        .nav-item-badge {
          position: absolute;
          right: -10px;
          top: -12px;
          transform-origin: 100%;
          transform: translate(50%, 50%) scale(0.9);
          background-color: #3190e8;
          border-radius: 30px;
          padding: 0 4px;
          font-size: @font-small;
          color: #fff;
        }
      }
    }
    .active-nav {
      background: #fff;
      position: relative;
      &::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 20px;
        background-color: @color-theme;
      }
    }
  }
  .select-item {
    height: 48px;
    display: flex;
    position: relative;
    align-items: center;
    .select-slide {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
      display: none;
    }
  }
  .active-slide {
    color: @color-theme;
    .select-slide {
      display: block;
    }
  }
  .tree-select-slide {
    flex: 1.5;
    overflow-y: auto;
    padding-left: 15px;
    .slide-item {
    }
  }
}
</style>
