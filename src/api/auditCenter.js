import fetch from '@/utils/fetch';

/* 获取房源审核列表 */
export function queryReviewCheckListByPageApi(params = {}) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'queryReviewCheckListByPage',
      params
    }
  });
}

/* 房源审核结果编辑 */
export function saveReviewStatusApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'saveReviewStatus',
      params
    }
  });
}

/* 房源详情查看 */
export function queryReviewCheckRoomDetailApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'queryReviewCheckRoomDetail',
      params
    }
  });
}


/* 签章审核 */
export function signaturesHandleApi(params) {
  return fetch({
    url: '/market/audit/',
    method: 'post',
    data: {
      method: 'handle',
      params
    }
  });
}

/* 签章审核列表 */
export function signaturesListsApi(params) {
  return fetch({
    url: '/market/audit/',
    method: 'post',
    data: {
      method: 'list',
      params
    }
  });
}

/* 实名认证 */
export function upgradeRealNameApi(params) {
  return fetch({
    url: '/market/audit/',
    method: 'post',
    data: {
      method: 'upgradeRealName',
      params
    }
  });
}

/* 已发布房源列表 */
export function queryPublishRoomListByPageApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'queryPublishRoomListByPage',
      params
    }
  });
}

/* 已发布房源详情 */
export function queryPublishRoomDetailApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'queryPublishRoomDetail',
      params
    }
  });
}

/* 已发布房源下架 */
export function savePublishStatusApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'savePublishStatus',
      params
    }
  });
}

/* 已发布房源图片删除 */
export function batchRemoveRoomPictureApi(params) {
  return fetch({
    url: '/market/review/',
    method: 'post',
    data: {
      method: 'batchRemoveRoomPicture',
      params
    }
  });
}