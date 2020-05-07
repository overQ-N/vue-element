<template>
  <div>
    <ul>
      <!-- <li>
        <van-icon class="exchange icon" name="exchange" />
        <div class="text">智能排序</div>
        <i class="van-icon van-icon-success"></i>
      </li>
      <li>
        <van-icon class="icon" name="location-o" />
        <div class="text">距离最近</div>
        <i class="van-icon van-icon-success"></i>
      </li>
      <li>
        <van-icon class="icon" name="fire-o" />
        <div class="text">销量最高</div>
        <i class="van-icon van-icon-success"></i>
      </li>
      <li>
        <van-icon class="icon" name="gold-coin-o" />
        <div class="text">起送价最低</div>
        <i class="van-icon van-icon-success"></i>
      </li>
      <li>
        <van-icon class="icon" name="underway-o" />
        <div class="text">配送速度</div>
        <i class="van-icon van-icon-success"></i>
      </li>
      <li>
        <van-icon class="icon" name="star-o" />
        <div class="text">评分最高</div>
        <i class="van-icon van-icon-success"></i>
      </li> -->
       <li v-for="(item, index) in orderList"
       :class="[index===activeIndex?'selected':'']"
       :key="index" @click="handleClick(item,index)">
        <van-icon class="icon" :class="{exchange:item.isExchange}" :name="item.name" />
        <div class="text">{{item.text}}</div>
        <i class="van-icon van-icon-success"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 0,
      orderList: [
        {
          name: 'exchange',
          text: '智能排序',
          isExchange: true,
          value: 4
        },
        {
          name: 'location-o',
          text: '距离最近',
          value: 5
        },
        {
          name: 'fire-o',
          text: '销量最高',
          value: 6
        },
        {
          name: 'gold-coin-o',
          text: '起送价最低',
          value: 1
        },
        {
          name: 'underway-o',
          text: '配送速度',
          value: 2
        },
        {
          name: 'star-o',
          text: '评分最高',
          value: 3
        }
      ]
    }
  },
  methods: {
    handleClick (item, index) {
      this.activeIndex = index
      this.$emit('orderValueChange', item)
    }
  }
}
</script>

<style lang='less' scoped>
@import 'style/variable.less';
.exchange{
      transform: rotate(90deg) translateY(-2px);
    }
ul{
  li{
    position: relative;
    display: flex;
    height: 46px;
    align-items: center;
    .icon{
      width: 30px;
      padding-left: 20px;
      font-size: 16px;
    }
    .text{
      flex: 1;
      height: 100%;
      line-height: 45px;
      padding-left: 10px;
      border-bottom: 1px solid #e4e4e4;
    }
    .van-icon-success{
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      display: none;
    }
  }
  .selected{
    color:@color-theme;
    .van-icon-success{
      display: block;
    }
  }
}
.van-icon-location-o{
  color:#9acfea;
}
.van-icon-exchange{
  color:#3d88c8;
}
.van-icon-fire-o{
  color:#f07373;
}
.van-icon-gold-coin-o{
  color:#e6b820;
}
.van-icon-underway-o{
  color:#48cbbd;
}
.van-icon-star-o{
  color:#f0bf75;
}
</style>
