/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:05:25
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-13 11:09:56
 */

import Clipboard from './clipboard'

const install = function (Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.clipboard = Clipboard
  Vue.use(install); // eslint-disable-line
}

Clipboard.install = install
export default Clipboard
