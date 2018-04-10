import fetch from '@/utils/fetch';

/* 登录获取sessionId */
export function login(mobile, password) {
  return fetch.post('/user/', {
    method: 'login',
    params: {
      mobile,
      password
    }
  })
}

/* sessionId获取用户信息 */
export function getInfo(sessionId) {
  return fetch.post('/user/', {
    method: 'queryUserDetail',
    params: {
      sessionId
    }
  })
}

/* 退出系统 */
export function logout(params = {}) {
  return fetch.post('/user/', {
    method: 'logout',
    params
  })
}
