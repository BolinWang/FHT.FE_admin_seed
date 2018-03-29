import fetch from '@/utils/fetch';

/* 获取表格数据 */
export function getGridApi(params, urlPathObj) {
  return fetch({
    url: '/market/' + urlPathObj.urlPath + '/',
    method: 'post',
    data: {
      method: urlPathObj.queryMethod,
      params
    }
  });
}

/* 新增、编辑、排序、删除接口 */
export function saveDataApi(params, urlPathObj) {
  return fetch({
    url: '/market/' + urlPathObj.urlPath + '/',
    method: 'post',
    data: {
      method: urlPathObj.saveMethod,
      params
    }
  });
}