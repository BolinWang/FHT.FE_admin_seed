import fetch from '@/utils/fetch';

/* 获取用户列表 */
export function getGridApi(params = {}) {
  return fetch({
    url: '/user/',
    method: 'post',
    data: {
      method: 'loadUserList',
      params
    }
  });
}

/* 重置密码、删除、新增 */
export function saveDataApi(params = {}) {
  return fetch({
    url: '/user/',
    method: 'post',
    data: {
      method: 'saveUser',
      params
    }
  });
}

/* 修改个人信息 */
export function saveSelfDetailApi(params = {}) {
  return fetch({
    url: '/user/',
    method: 'post',
    data: {
      method: 'saveSelfDetail',
      params
    }
  });
}

/* 意见反馈获取列表数据 */
export function queryFeedbackByPageApi(params = {}) {
  return fetch({
    url: '/market/feedback/',
    method: 'post',
    data: {
      method: 'queryFeedbackByPage',
      params
    }
  });
}

/* 意见反馈删除 */
export function saveFeedbackApi(params = {}) {
  return fetch({
    url: '/market/feedback/',
    method: 'post',
    data: {
      method: 'saveFeedback',
      params
    }
  });
}

/* 申请注册获取列表数据 */
export function queryUserRequestByPageApi(params = {}) {
  return fetch({
    url: '/market/apply/',
    method: 'post',
    data: {
      method: 'queryUserRequestByPage',
      params
    }
  });
}

/* 申请注册保存 */
export function saveUserRequestApi(params = {}) {
  return fetch({
    url: '/market/apply/',
    method: 'post',
    data: {
      method: 'saveUserRequest',
      params
    }
  });
}


/* 申请注册注册账号 */
export function registeredUserApi(params = {}) {
  return fetch({
    url: '/market/apply/',
    method: 'post',
    data: {
      method: 'registeredUser',
      params
    }
  });
}
// C端租客查询
export function customerListApi(params = {}) {
  return fetch({
    url: '/market/customer/',
    method: 'post',
    data: {
      method: 'customerList',
      params
    }
  });
}
// 租房记录
export function queryRentRecordApi(params = {}) {
  return fetch({
    url: '/market/customer/',
    method: 'post',
    data: {
      method: 'queryRentRecord',
      params
    }
  });
}
// B端租客查询
export function businessUserListApi(params = {}) {
  return fetch({
    url: '/market/customer/',
    method: 'post',
    data: {
      method: 'businessUserList',
      params
    }
  });
}

// 查询组织列表
export function initOrgListApi(params = {}) {
  return fetch({
    url: '/market/organization/',
    method: 'post',
    data: {
      method: 'list',
      params
    }
  });
}
// 查询权限模板
export function queryTemplateListApi(params = {}) {
  return fetch({
    url: '/market/organization/',
    method: 'post',
    data: {
      method: 'queryTemplateList',
      params
    }
  });
}
// 组织启用/禁用/删除
export function updateOrgStatusAndDeleteApi(params = {}) {
  return fetch({
    url: '/market/organization/',
    method: 'post',
    data: {
      method: 'updateOrgStatusAndDelete',
      params
    }
  });
}
// 新增组织
export function saveOrgApi(params = {}) {
  return fetch({
    url: '/market/organization/',
    method: 'post',
    data: {
      method: 'saveOrg',
      params
    }
  });
}
// 编辑组织
export function editOrgBasicInfoApi(params = {}) {
  return fetch({
    url: '/market/organization/',
    method: 'post',
    data: {
      method: 'editOrgBasicInfo',
      params
    }
  });
}
// 查询组织信息
export function organizationInfoApi(params = {}) {
  return fetch({
    url: '/market/organization/',
    method: 'post',
    data: {
      method: 'organizationInfo',
      params
    }
  });
}
// 实名校验
export function realNameAuthApi(params = {}) {
  return fetch({
    url: '/market/organization/',
    method: 'post',
    data: {
      method: 'realNameAuth',
      params
    }
  });
}