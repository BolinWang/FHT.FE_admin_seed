/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-11-15 17:31:25
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-11-15 17:31:25
 */

import drag from './drag'

const install = (Vue) => {
  Vue.directive('drag-dialog', drag)
}

if (window.Vue) {
  window['drag-dialog'] = drag
  window.Vue.use(install)
}

drag.install = install
export default drag
