require('./check-versions')()

process.env.NODE_ENV = 'production'

let ora = require('ora')
// 可以在 node 中执行`rm -rf`的工具
let rm = require('rimraf')
let path = require('path')
let chalk = require('chalk')
let webpack = require('webpack')
let config = require('../config')
let webpackConfig = require('./webpack.prod.conf')

let spinner = ora('building for production...')
spinner.start()

// 删除文件夹 （递归删除）
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
