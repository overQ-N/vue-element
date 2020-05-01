<template>
  <div>
    <NavBar bgColor='#3190e8'>
      <template #left>
        饿了么
      </template>
      <template #right>
        <div>
          <router-link to='#'>登录</router-link>
          <span class="separator">|</span>
          <router-link to='#'>注册</router-link>
        </div>
      </template>
    </NavBar>
    <NavBar :height='43' class="location-bar">
      <template #left>
        当前定位城市:
      </template>
      <template #right>
        <div class="location-bar-right">定位不准确时，请在列表中选择</div>
      </template>
    </NavBar>
    <NavBar :height='43' class="location-city">
      <template #left>
        广州
      </template>
      <template #right>
        <i class="location-city-right el-icon-arrow-right">
        </i>
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>

<style lang='less' scoped>
.separator{
  margin:0 3px;
}
.location-bar{
  color:#666;
  border-bottom: 1px solid #e4e4e4;
  .location-bar-right{
    font-size: 10px;
  }
}
</style>
