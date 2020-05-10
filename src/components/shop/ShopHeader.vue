<template>
  <header class="header">
      <div class="shop-img">
        <img :src="`https://elm.cangdu.org/img/${shopInfo.image_path}`" alt />
      </div>
      <div class="shop-info">
        <h3>{{shopInfo.name}}</h3>
        <div class="shop-supports">
          <span class="shop-supports-item" v-for="(item, index) in shopInfo.supports" :key="index">
            {{item.name}}
            <span v-if="index!==shopInfo.supports.length">/</span>
          </span>
        </div>
        <div class="shop-notice">{{shopInfo.promotion_info}}</div>
      </div>
      <div class="arrow-right">
        <div class="arrow"></div>
      </div>
    </header>
</template>

<script>
export default {
  props: {
    // 商铺详情
    shopInfo: {
      type: Object,
      default: () => {

      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 70px;
  display: flex;
  padding: 10px;
  background-color: #afb1c3;
  .shop-img {
    width: 72px;
    height: 72px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .shop-info {
    flex: 1;
    margin-left: 10px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    h3 {
      font-size: 18px;
      color: #fff;
    }
    .shop-supports,
    .shop-notice {
      font-size: 10px;
    }
  }
  .arrow-right {
    width: 20px;
    position: relative;
    .arrow {
      position: absolute;
      top: 50%;
      width: 9px;
      height: 9px;
      border-top: 1px solid #fff;
      border-right: 1px solid #fff;
      border-bottom: 1px solid transparent;
      border-left: 1px solid transparent;
      transform: rotate(45deg) translateY(-50%);
    }
  }
}
</style>
