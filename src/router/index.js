/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:07:11
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-20 16:22:54
 */

import Vue from 'vue'
import Router from 'vue-router'
import '../icons'
import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/**
 * icon : slider图标
 * hidden : 菜单隐藏
 * redirect : ‘noRedirect’ 面包屑链接配置
 * noDropdown : ’noDropdown:true‘ 下拉菜单
 * meta : ‘{ role: ['admin'] }‘ 权限
 */

export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
}, {
  path: '/404',
  component: _import('404'),
  hidden: true
}, {
  path: '',
  component: Layout,
  redirect: '/dashboard',
  icon: 'home',
  noDropdown: true,
  children: [{
    name: '首页',
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

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '示例',
    icon: 'example',
    meta: {
      role: ['admin', 'global']
    },
    children: [{
      path: 'image',
      component: _import('example/image'),
      name: '图片组件'
    }, {
      path: 'grid',
      component: _import('example/tablePagenation'),
      name: '表格组件'
    }, {
      path: 'areaSelect',
      component: _import('example/areaSelect'),
      name: '省市区联动'
    }, {
      path: 'dragDialog',
      component: _import('example/dragDialog'),
      name: '拖拽dialog'
    }, {
      path: 'downloadExcel',
      component: _import('example/downloadExcel'),
      name: '下载Excel'
    }, {
      path: 'uploadExcel',
      component: _import('example/uploadExcel'),
      name: '上传Excel'
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
