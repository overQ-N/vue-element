<template>
  <div class="tree-select">
    <div class="nav">
      <div
        class="nav-item"
        v-for="(item, index) in menu"
        @click="navClick(item)"
        :class="activeNavId===item.id?'activeNav':''"
        :key="index"
      >{{item.name}}</div>
    </div>
    <div class="aside">
      <div
        class="aside-item"
        v-for="(item, index) in asideList"
        :key="index"
        @click="asideClick(item)"
      >
        <img :src="`https://elm.cangdu.org/img/${item.image_path}`" alt />
        <div class="good-info">
          <h4>{{item.name}}</h4>
          <div class="good-description">
            <div class="description">{{item.description}}</div>
            <span
              v-if="item.activity"
              class="good-activity"
              :style="`border:1px solid #${item.activity.image_text_color};color:#${item.activity.image_text_color}`"
            >{{item.activity.image_text}}</span>
          </div>
          <div class="good-tips">{{item.tips}}</div>
          <div class="money">
            <span style="color:#ff6600">￥{{item.satisfy_rate}}</span>起
          </div>
        </div>
        <div class="good-attributes">
          <div class="tag-wrap" v-if="item.attributes&&item.attributes.length>0">
            <div v-for="(attr, index) in item.attributes" :key="index">
              <div
                v-if="attr"
                class="tag"
                :style="`border:1px solid #${attr.icon_color};color:#${attr.icon_color}`"
              >{{attr.icon_name}}</div>
            </div>
          </div>
          <div v-else style="visibility: hidden">这是隐匿的div</div>
          <button
            v-if="item.specifications&&item.specifications.length>0"
            class="btn"
            @click="specificationsClick(item)"
          >选规格</button>
          <button v-else class="btn-round" @click="addCart(item)">+</button>
        </div>
      </div>
    </div>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="0"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @sku-selected="skuSelected"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    menu: {
      type: Array,
      default: () => {
        return [{}]
      }
    }
  },
  data () {
    return {
      // 左侧区域内容
      navList: [],
      // 右侧区域内容
      asideList: [{ activity: { image_text_color: null, image_text: null } }],
      // 左侧区域激活的id
      activeNavId: '',
      // 右侧区域激活的id
      activeAsideId: '',
      timer: '',
      // 是否显示选择规格的弹出框
      show: false,
      sku: {},
      goods: {},
      goodsId: '',
      // 购物车列表
      cartList: []
    }
  },
  mounted () {
    this.setActiveNavId()
  },
  watch: {
    activeNavId (val) {
      const activeNavList = this.menu.filter(v => v.id === val)
      this.asideList = activeNavList[0].foods
    }
  },
  methods: {
    ...mapMutations(['addCartList']),
    // 右侧内容项被点击时触发
    asideClick (item) {
      this.activeAsideId = item.item_id
    },
    setActiveNavId () {
      this.timer = setInterval(() => {
        if (this.menu.length > 0) {
          this.activeNavId = this.menu[0].id
          clearInterval(this.timer)
        }
      }, 30)
    },
    // 左侧内容被点击时
    navClick (item) {
      this.activeNavId = item.id
    },
    // 选择规格时触发
    specificationsClick (item) {
      this.goodsId = item.item_id
      const sku = {
        tree: [],
        list: [
          {
            s1: 0,
            id: 112,
            price: 100,
            stock_num: 110
          }
        ]
      }
      // sku.collection_id = 1
      // 商品价格
      sku.price = item.satisfy_rate
      // 商品库存
      sku.stock_num = 99
      // 设置商品规格
      item.specifications.forEach(v => {
        const treeObj = {}
        treeObj.k = v.name
        treeObj.k_s = 's1'
        treeObj.v = []
        v.values.forEach((v1, i1) => {
          if (!v1) return
          treeObj.v.push({
            id: i1,
            name: v1
          })
        })
        sku.tree.push(treeObj)
        // sku.properties.push(treeObj)
      })
      // 商品图片
      this.goods.picture = 'https://elm.cangdu.org/img/' + item.image_path
      this.sku = sku
      this.show = true
    },
    // 立即购买
    onBuyClicked () {},
    // 加入购物车
    onAddCartClicked (item) {
      // this.$store.commit('addCartList', item)
    },
    // 规格项被点击时触发
    skuSelected (skuItem) {
    },
    // 点击 + 按钮,加入购物车
    addCart (item) {
      this.$store.commit('addCartList', item)
    }
  }
}
</script>

<style lang='less' scoped>
@import "style/variable.less";
.tree-select {
  height: calc(100vh - 184px);
  overflow-y: auto;
  .nav {
    overflow-y: auto;
    width: 75px;
    float: left;
    background: #f7f8fa;
    .nav-item {
      height: 46px;
      line-height: 46px;
      padding-left: 10px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 4px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 20px;
        background-color: @color-theme;
        display: none;
      }
    }
    .activeNav {
      background: #fff;
      &::before {
        display: block;
      }
    }
  }
  .aside {
    float: right;
    overflow-y: auto;
    height: calc(100vh - 184px);
    width: calc(100% - 75px);
    .aside-item {
      padding: 8px 5px;
      display: flex;
      border-bottom: 1px solid #eee;
      justify-content: space-between;
      img {
        width: 60px;
        height: 60px;
      }
      .good-info {
        flex: 1;
        padding-left: 8px;

        .good-description {
          width: 120px;
          .description {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .good-activity {
            border-radius: 15px;
            font-size: @font-small;
          }
        }
        .good-tips {
          font-size: @font-small;
        }
        .money {
          span {
            margin-right: 5px;
          }
        }
      }
      .good-attributes {
        width: 80px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        .tag-wrap {
          height: 20px;
          width: 100%;
        }
        .tag {
          float: right;
          border-radius: 15px;
          padding: 0 2px;
          font-size: @font-small;
          margin-right: 2px;
        }
        .btn {
          border-radius: 6px;
          color: #fff;
          background-color: @color-theme;
          height: 20px;
          border: 0;
          padding: 0 2px;
        }
        .btn-round {
          border-radius: 10px;
          background: @color-theme;
          border: 0;
          color: #fff;
        }
      }
    }
  }
}
</style>
