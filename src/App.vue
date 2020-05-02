<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view v-if="!$route.meta.isTab">
    </router-view>
    <div v-if="$route.meta.isTab">
      <router-view></router-view>
      <Tab/>
    </div>
  </div>
</template>
<script>
import Tab from 'components/common/Tab'
export default {
  components: {
    Tab
  }
}
</script>
<style>
@import './assets/style/base.css';
@import './assets/style/iconfont/iconfont.css';
#app{
  box-sizing: border-box;
  height:100%;
  /* padding:0 10px; */
}
</style>
