const path = require('path')
const resolve = dir => {
  return path.resolve(__dirname, dir)
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('plugins', resolve('src/plugins'))
      .set('request', resolve('src/request'))
  }
}
