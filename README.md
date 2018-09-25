# FHT.FE_admin_seed
# Author: 柏林

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.17-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.4.6-brightgreen.svg" alt="element-ui">
  </a>
</p>

**注意：该项目使用 element-ui@2.3.0+ 版本，所以最低兼容 vue@2.5.0+**
## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。

本项目技术栈基于 [ES6](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)模拟，请提前了解和学习这些知识。


```
vue + vue-router + vuex + axios + elementUI （es6 + eslint：vscode自动纠正）
主要功能：
- axios二次封装：鉴权、重复提交等
- 多环境打包、部署： prod、sit
- 打包资源可视化： prod、sit
- 动态路由： 权限控制addRouters
- 全屏、面包屑、换肤、快捷导航(tagsView)
- 图片组件（upload上传、cropper裁剪、drag排序、preview预览查看，可扩展加水印组件）
- 表格组件：基于elementUI table/pagenation 二次封装 支持所有配置
- 导出excel
- 拖拽排序
- mock数据
- more...

```

## mockjs（development使用）
**1、src/api 各文件中需要使用mock数据的添加属性isMock: true**
**2、src/mock 建议新建对应模块名称的文件，在文件中定义方法以及mock数据，最后在index.js中拦截相应url**
**3、2中拦截的url，是原始http请求中的url+method拼接**
**4、fetch.js中method为空时，url拼接'isMock'，所以在mock/index.js中无method的api正则匹配isMock**

## Extra
1、组件使用请自行参考[example](https://github.com/BolinWang/FHT.FE_admin_seed/tree/master/src/views/example)

2、npm scripts请自行参考[package.json](https://github.com/BolinWang/FHT.FE_admin_seed/blob/master/package.json)

3、本项目基于`webpack4`开发，若还想使用`webpack3`开发，请使用该分支[webpack3](https://github.com/BolinWang/FHT.FE_admin_seed/tree/webpack3)

# 项目结构

```
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── sit.env.js
├── dist
│   ├── favicon.ico
│   ├── index.html
│   └── static
├── favicon.ico
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   ├── components
│   ├── directive
│   ├── filters
│   ├── icons
│   ├── main.js
│   ├── mock
│   ├── router
│   ├── store
│   ├── styles
│   ├── utils
│   ├── vendor
│   └── views
└── static

19 directories, 20 files


```

