import fetch from '@/utils/fetch'

/* 修改个人信息 */
export function saveSelfDetailApi(params = {}) {
  return fetch.post('/user/', {
    method: 'saveSelfDetail',
    params
  })
}

/* 申请注册获取列表数据 */
export function queryUserRequestByPageApi(params = {}) {
  return fetch.post('/market/apply/', {
    method: 'queryUserRequestByPage',
    params
  })
}
