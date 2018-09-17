/* OTA 房源管理集 */
export const houseAsyncApi = {
  defaultOptions: {
    requestUrl: '/market/rooms',
    method: 'list'
  },
  list (params) {
    return fetch({
      url: houseAsyncApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: houseAsyncApi.defaultOptions.method,
        params
      }
    })
  }
}
/* 发布撤销房源 */
export function publishHouseApi (params, type) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: type === 1 ? 'publish' : 'unpublish', // 1.发布 2.撤销
      params
    }
  })
}
