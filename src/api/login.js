
/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:33:06
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-13 11:34:31
 */

import { fetch } from '@/utils/fetch'

/* 登录获取sessionId */
export function login (mobile, password) {
  return fetch('/user/', {
    method: 'login',
    params: {
      mobile,
      password
    }
  })
}

/* sessionId获取用户信息 */
export function getInfo (sessionId) {
  return fetch('/user/', {
    method: 'queryUserDetail',
    params: {
      sessionId
    }
  })
}

/* 退出系统 */
export function logout (params = {}) {
  return fetch('/user/', {
    method: 'logout',
    params
  })
}
