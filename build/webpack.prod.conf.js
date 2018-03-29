const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// webpack 复制文件和文件夹的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 整合css的工具 https://github.com/webpack-contrib/extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 压缩提取出的css 并解决ExtractTextPlugin分离出的重复问题
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const env = require('../config/' + process.env.env_config + '.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    /*
      在utils.js已经配置好相关对extractTextPlugin的css抽取配置.通过extract: true即可触发
      如果要触发这个 extract 需要在plugins里面注册一下
    */
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // 将每个模块的css提取到一个文件里面
    new ExtractTextPlugin({
      // 提取出来的文件名称
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: false,
    }),
    // 删除重复的css内容
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? {
        safe: true,
        map: {
          inline: false
        }
      } : {
        safe: true
      }
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      title: 'FHT.BOP',
      path: config.build.assetsPublicPath + config.build.assetsSubDirectory,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // 控制生成的js插入位置的顺序(可以结合chunks进行选择)
      chunksSortMode: 'dependency'
    }),
    // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        /*
          一般来讲这里的module会返回整个项目所用到的组件库包,和import的东西
          然后通过这个函数去控制一下哪一些放入vendor的文件
          然后查看了一下打包出来的vendor文件.
          主要是将(在package.json中的dependencies部分被页面所import使用的包)
        */
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    // 提取echarts
    new webpack.optimize.CommonsChunkPlugin({
      async: 'echarts',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0);
      }
    }),
    // 提取xlsx
    new webpack.optimize.CommonsChunkPlugin({
      async: 'xlsx',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('xlsx') >= 0);
      }
    }),
    // split codemirror into its own file
    new webpack.optimize.CommonsChunkPlugin({
      async: 'codemirror',
      minChunks(module) {
        var context = module.context;
        return context && (context.indexOf('codemirror') >= 0);
      }
    }),

    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

// gzip压缩
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig