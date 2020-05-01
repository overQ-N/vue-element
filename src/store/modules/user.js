const state = () => ({
  // return {
  citySearchHistory: []
  // }
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
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
