const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
// 合并插件类似object.assign合并公共部分
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// 自动生成 html 并且注入到 .html 文件中的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 自动检索下一个可用端口
const portfinder = require('portfinder')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// 获取在process.env 定义的host和port
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // css-loader的加工
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // 检测开发环境下是否生成source map(并且生成的模式是怎么样)
  devtool: config.dev.devtool,

  /*
  https://doc.webpack-china.org/configuration/dev-server/#src/components/Sidebar/Sidebar.jsx
  webpack-dev-server 的配置

  package.json中
  "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
  --progess 将运行进度输出到控制台。即npm run dev 显示module 的loading
  --inline  应用程序启用内联模式(inline mode)。
            这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
  (--inline = false 关闭这种模式 那么将不会出现修改代码后实时刷新)
  */
  devServer: {
    clientLogLevel: 'warning',
    // History API 当遇到 404 响应
    historyApiFallback: true,
    //启用 webpack 的模块热替换特性
    hot: true,
    // 一切服务都启用gzip 压缩
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    // 自动打开浏览器
    open: config.dev.autoOpenBrowser,
    // 是否全屏弹窗的形式显示编译过程中的错误
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    // url访问路径前缀
    publicPath: config.dev.assetsPublicPath,
    // 代理
    proxy: config.dev.proxyTable,
    // 除了初始启动信息之外的任何内容都不会被打印到控制台
    quiet: true,
    // 与监视文件相关的控制选项。
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    /*
      https://doc.webpack-china.org/plugins/define-plugin/
      允许在环境中产生一个全局变量, 例如下面'process.env', 就等于隔壁文件夹 dev.env.js export出来的内容
      具体的规则看上方api

      但是以下定义的变量在配置文件中去引用会报错,只允许在服务中编写的代码中使用
    */
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      title: 'FHT.BOP',
      path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  // 判断当前端口是否可用
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        // 添加终端提示内容
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})