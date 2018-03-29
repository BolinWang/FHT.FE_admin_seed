const path = require('path') // node path模块
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

/* 转换绝对路径 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

/* eslint */
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  // 基础目录，绝对路径，用于从配置中解析入口起点
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    // 此选项决定了每个输出 bundle 的名称。 
    // [name]是指入口名称 [id]是指chunk id [hash]是指构建完的hash [chunkhash]是指每个内容的hash
    filename: '[name].js',
    // 正式发布环境下编译输出的上线路径的根路径
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动补全对应模块的后缀
    extensions: ['.js', '.vue', '.json'],
    // 路径别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      /*
          1.babel-preset-env 是指动态的require浏览器所缺的转换babel插件.
          这个动态是通过文件里面的配置,
          "env", {
            //是否将模块编译为 amd cmd commonjs等
            "modules": false,
            "targets": {
              //指浏览器最新的2个版本 或者safari大于7的版本 >5%是指 市场率超过5%的浏览器
              "browsers": ["last 2 versions", "safari >= 7"]
            }
          }
          如果用了env 没有加任何配置的话 那么默认与 babel-preset-latest一样

          2.babel-preset-stage 有4个版本
          Stage 0 - 稻草人: 只是一个想法，可能是 babel 插件。
          Stage 1 - 提案: 初步尝试。
          Stage 2 - 初稿: 完成初步规范。
          Stage 3 - 候选: 完成规范和浏览器初步实现。
          Stage 4(隐藏版本表示已经完成 将会在新的一版所发布) 等同于es2015 es2016...

          3.在plugin中有 babel-plugin-transform-runtime 是动态的模块加载所需的转换模块
          因为如文档所说
          Babel 几乎可以编译所有时新的 JavaScript 语法，但对于 APIs 来说却并非如此。
          例如： Promise、Set、Map 等新增对象，Object.assign、Object.entries等静态方法。
          --说到runtime就会提到babel-polyfill
          (babel-polyfill 的做法是将全局对象通通污染一遍)

          babel-runtime 更像是分散的 polyfill 模块，我们可以在自己的模块里单独引入，它们不会在全局环境添加未实现的方法，
          只是，这样手动引用每个 polyfill 会非常低效。我们借助 Runtime transform 插件来自动化处理这一切。

      */
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      /* 将src/icons 目录下的svg文件转换成icon */
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          // 限制10000字节以下的图片均变为base64. 不然如果使用background-image 打包之后会找不到资源 
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  /* 
  https://doc.webpack-china.org/configuration/node/#node
  每个属性都是 Node.js 全局变量或模块的名称
  true：提供 polyfill。
  false: 什么都不提供。
  "empty"：提供空对象。
  */
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}