const state = () => {
  return {
    // 购物车
    cartList: []
  }
}
const mutations = {
  // 向购物车中添加商品
  addCartList (state, food) {
    // 如果购物车中没有,添加 如果已存在,数量加1
    const index = state.cartList.findIndex(v => v.id === food.item_id)
    if (index !== -1) {
      state.cartList[index].count++
    } else {
      state.cartList.push({
        id: food.item_id,
        count: 1,
        money: food.satisfy_rate
      })
    }
  }
}
const getters = {
  // 购物车总价格
  totalCartPrice (state) {
    let total = 0
    state.cartList.forEach(v => {
      total += v.money * v.count
    })
    return total
  }
}
export default {
  namesapced: true,
  state,
  mutations,
  getters
}
