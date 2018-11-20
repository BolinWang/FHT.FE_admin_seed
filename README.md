## Author: 柏林
<a href="https://github.com/vuejs/vue">
  <img src="https://img.shields.io/badge/vue-2.5.17-brightgreen.svg" alt="vue">
</a>
<a href="https://github.com/ElemeFE/element">
  <img src="https://img.shields.io/badge/element--ui-2.4.6-brightgreen.svg" alt="element-ui">
</a>

**注意：该项目使用 element-ui@2.3.0+ 版本，所以最低兼容 vue@2.5.0+**

**项目在线Demo地址：[Online Demo](https://bolinwang.github.io/FHT.FE_admin_seed/)**

## 你需要做好的准备

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
- 图片组件（upload上传、cropper裁剪、drag排序、preview预览查看，添加水印组件）
- 表格组件：基于elementUI table/pagenation 二次封装 支持所有配置
- 导出/上传Excel
- 拖拽排序
- dialog拖拽指令
- mock数据
- more...

```

**多环境资源打包请前往分支`build_env`查看相关配置代码[查看](https://github.com/BolinWang/FHT.FE_admin_seed/commit/658426bc8b9edcc19f85cd3c67308f5f9b15ea7b)**

[table组件支持props](https://github.com/BolinWang/FHT.FE_admin_seed/blob/master/src/components/GridUnit/props.js)

[table组件扩展：分页保留已选择数据](https://github.com/BolinWang/FHT.FE_admin_seed/commit/329fe7fdc283c7f8a756e35d0faf2a073e59d757)

[element table配置参考](http://element-cn.eleme.io/#/zh-CN/component/table)

## mockjs（development使用）[config配置](https://github.com/BolinWang/FHT.FE_admin_seed/blob/master/config/dev.env.js)
**1、所有的 mock 数据都在 `@/src/mock` 目录下，它只会拦截 `@/src/mock/index.js` 文件中`正则匹配url`**

**2、`@/src/api` 目录下各文件中需要使用mock数据的添加`axios（fetch）请求 config`属性`isMock: true`**

**3、`@/src/mock` 新建`@/src/api`对应模块的文件，在文件中定义方法以及mock数据，然后在`@/src/mock/index.js`中拦截相应`url`**

**4、3中拦截的`url`，可以分成两类：**
```
- 目前API大部分都是`url+method`的请求体形式，针对这类规范，`@/src/mock/index.js`中的`正则匹配url`须是api请求的`${url}${method}`字段拼接

- 如果API请求体没有`method`，`@/src/mock/index.js`中的`正则匹配url`须是api请求的`${url}isMock`字段拼接
```
`@/src/utils/fetch.js`中的封装，请直接看源码吧[fetch.js](https://github.com/BolinWang/FHT.FE_admin_seed/blob/master/src/utils/fetch.js)

## 开发

```bash
# 克隆项目
git clone https://github.com/BolinWang/FHT.FE_admin_seed.git

或

git clone http://116.62.130.63:3000/FHT.FE/FHT.FE_admin_seed.git

# 安装依赖
npm i

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm i --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://0.0.0.0:1314

## 发布

```bash
# 构建测试环境
npm run build:sit

# 构建生产环境
npm run build:prod
```

## Git Hooks配置

[查看详细代码](https://github.com/BolinWang/FHT.FE_admin_seed/commit/3e8061b2d89af7b40c363cf3cc5c637a09f1c436)

[lint-staged文档](https://github.com/okonet/lint-staged/blob/master/README.md)

```bash
# 如下配置，每次它只会在你本地 commit 之前，校验你提交的内容是否符合你本地配置的 eslint规则
# 如果符合则提交成功
# 如果不符合它会自动执行 eslint --fix 尝试帮你自动修复，如果修复成功则会帮你把修复好的代码提交，如果失败，则会提示你错误，让你修好这个错误之后才能允许你提交代码。

# 安装依赖包
npm i --save-dev lint-staged husky

# package.json配置
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "linters": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  },
  "ignore": []
}
```

## 其它
1、组件使用请自行参考[example](https://github.com/BolinWang/FHT.FE_admin_seed/tree/master/src/views/example)

2、npm scripts请自行参考[package.json](https://github.com/BolinWang/FHT.FE_admin_seed/blob/master/package.json)

3、本项目基于`webpack4`开发，若还想使用`webpack3`开发，请使用该分支[webpack3](https://github.com/BolinWang/FHT.FE_admin_seed/tree/webpack3)

4、多环境资源打包请前往分支`build_env`查看相关配置代码[查看](https://github.com/BolinWang/FHT.FE_admin_seed/commit/658426bc8b9edcc19f85cd3c67308f5f9b15ea7b)

5、解决css引用背景图片路径问题[详细代码](https://github.com/BolinWang/FHT.FE_admin_seed/commit/75227eab39eb74c21ed4945a3256553f83252246)


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

