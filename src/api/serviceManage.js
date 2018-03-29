import fetch from '@/utils/fetch';

/* 获取区域数据 */
export function getAreaListApi(params = {}) {
  return fetch({
    url: '/house/region',
    method: 'post',
    data: {
      method: 'query.region.area',
      params
    }
  });
}

/* 获取区域对应板块数据 */
export function getZoneListApi(params = {}) {
  return fetch({
    url: '/house/region',
    method: 'post',
    data: {
      method: 'query.region.zone',
      params
    }
  });
}

/* 获取房源数据列表 */
export function getGridApi(params = {}) {
  return fetch({
    url: 'https://api.mdguanjia.com/myhome/api/search',
    method: 'post',
    data: {
      method: 'searchByPage',
      params
    }
  });
}

/* 获取服务人员列表 */
export function getServicersApi(params = {}) {
  return fetch({
    url: '/flyingsquad',
    method: 'post',
    data: {
      method: 'query.server.people',
      params
    }
  });
}

/* 提交租客信息 */
export function saveRenterInfoApi(params = {}) {
  return fetch({
    url: '/flyingsquad',
    method: 'post',
    data: {
      method: 'distribute.server',
      params
    }
  });
}

/* 带看记录查看 */
export function queryLookRecordApi(params = {}) {
  return fetch({
    url: '/flyingsquad/staff',
    method: 'post',
    data: {
      method: 'seeRecord',
      params
    }
  });
}