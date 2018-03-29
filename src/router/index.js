/**
 * author : bolin
 * icon : slider图标
 * hidden : 菜单隐藏
 * redirect : ‘noRedirect’ 面包屑链接配置
 * noDropdown : ’noDropdown:true‘ 下拉菜单
 * meta : ‘{ role: ['admin'] }‘ 权限
 **/

import Vue from 'vue'
import Router from 'vue-router'
import '../icons'
import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
}, {
  path: '/404',
  component: _import('404'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Home',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: _import('dashboard/index')
  }]
}]

export default new Router({
  /* mode: 'history', //需要服务器配置路由 */
  scrollBehavior: () => ({
    y: 0
  }), // 后退后页面位置
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/eeop',
  component: Layout,
  redirect: 'noredirect',
  name: '一级',
  icon: 'dashboard',
  meta: {
    role: ['admin', 'global']
  },
  children: [{
    path: 'activityPage',
    component: _import('eeop/activety'),
    name: '二级'
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}]
