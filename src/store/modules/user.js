const state = () => ({
  citySearchHistory: [],
  // 用户经纬度信息
  geohash: ''
})
const actions = {

}
const getters = () => {

}
const mutations = {
  setCitySearchHistory (state, data) {
    const index = state.citySearchHistory.findIndex(v => v.name === data.name)
    // 如果记录中不存在这条搜索记录,添加  否则删除旧的,添加为新的
    if (index !== -1) {
      state.citySearchHistory.splice(index, 1)
    }
    state.citySearchHistory.unshift(data)
  },
  clearCitySearchHistory (state) {
    state.citySearchHistory = []
  },
  setGeohash (state, data) {
    state.geohash = data
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
