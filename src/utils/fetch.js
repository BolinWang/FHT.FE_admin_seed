import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getSessionId } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  interceptors: true, // 是否开启response拦截器 默认true
  noAssign: false, // 请求体是否带defaultConfig 默认false
  // timeout: 5000 // 请求超时时间
})

/* 防止重复提交，利用axios的cancelToken */
let cancelPromise, requestList = {}
const CancelToken = axios.CancelToken

/* 默认请求参数 */
const defaultConfig = {
  version: "1.0",
  timestamp: new Date().getTime(),
  reqId: "0010C2379272774D6EC087B917CE2A71438DEF90",
  sign: "8F4C4A8E9D850EDD9692DE38723D0543"
}

// request拦截器
service.interceptors.request.use(config => {
  /* 发起请求时，取消掉当前正在进行的相同请求 */
  const dataMethod =  config.method.toUpperCase() === 'POST' ? config.data.method : config.params.method
  const requestUrlAndMethod = config.url + dataMethod
  if (requestList[requestUrlAndMethod]) {
    requestList[requestUrlAndMethod]('操作取消')
    requestList[requestUrlAndMethod] = cancelPromise
  } else {
    requestList[requestUrlAndMethod] = cancelPromise
  }
  /* post请求 */
  if (config.method.toUpperCase() == 'POST') {
    if (store.getters.sessionId) {
      config.data['sessionId'] = getSessionId()
    }
    if (!config.noAssign) {
      config.data = Object.assign(config.data, defaultConfig)
    }
  } else {
    if (store.getters.sessionId) {
      config.params['sessionId'] = getSessionId()
    }
    if (!config.noAssign) {
      config.params = Object.assign(config.params, defaultConfig)
    }
  }
  return config
}, error => {
  console.log('【REQUEST】' + error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('【response】' + error)
    Message({
      message: '连接服务器失败',
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

const responseMehod = (response, resolve, reject) => {
  const res = response.data
  if (!response.config.interceptors || res.code == 0) {
    return resolve(res)
  }
  if (res.code == 1011) {
    if (res.message == '数据不存在') {
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
  Message({
    message: res.message || '未知错误，请联系管理员',
    type: 'error',
    duration: 5 * 1000
  })
  // sessionId 失效
  if (res.code == 1016) {
    MessageBox.confirm(`${res.message}，请重新登录`, '提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
  }
  return reject("error")
}

const judgeMethod = (url, params, method = 'post') => {
  const requestBody = {
    method,
    url,
    cancelToken: new CancelToken(c => {
      cancelPromise = c
    })
  }
  if (method.toUpperCase() === 'POST') {
    requestBody.data = params
  } else {
    requestBody.params = params
  }
  return new Promise((resolve, reject) => {
    service(requestBody).then(response => {
      responseMehod(response, resolve, reject)
    })
  })
}

export const fetch = judgeMethod
