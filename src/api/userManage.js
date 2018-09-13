/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:35:15
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-13 11:34:34
 */

import { fetch } from '@/utils/fetch'

/* 修改个人信息 */
export function saveSelfDetailApi (params = {}) {
  return fetch('/user/', {
    method: 'saveSelfDetail',
    params
  })
}

/* 申请注册获取列表数据 */
export function queryUserRequestByPageApi (params = {}) {
  return fetch('/market/apply/', {
    method: 'queryUserRequestByPage',
    params
  })
}
