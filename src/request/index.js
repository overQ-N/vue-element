import axios from 'axios'

const instance1 = axios.create({
  baseURL: 'https://elm.cangdu.org',
  timeout: 15000
})
const request = function (config) {
  return instance1(config)
}
export {
  request
}
