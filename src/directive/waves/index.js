/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:05:35
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-13 11:09:43
 */

import waves from './waves'

const install = function (Vue) {
  Vue.directive('waves', waves)
}

if (window.Vue) {
  window.waves = waves
  Vue.use(install); // eslint-disable-line
}

waves.install = install
export default waves
