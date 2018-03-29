import fetch from '@/utils/fetch';

/* 登录获取sessionId */
export function login(mobile, password) {
  return fetch({
    url: '/user/',
    method: 'post',
    data: {
      method: 'login',
      params: {
        mobile,
        password
      }
    }
  });
}

/* sessionId获取用户信息 */
export function getInfo(sessionId) {
  return fetch({
    url: '/user/',
    method: 'post',
    data: {
      method: 'queryUserDetail',
      params: {
        sessionId
      }
    }
  });
}

/* 退出系统 */
export function logout(params = {}) {
  return fetch({
    url: '/user/',
    method: 'post',
    data: {
      method: 'logout',
      params
    }
  });
}