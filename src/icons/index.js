/*
 * @Author: FT.FE.Bolin 
 * @Date: 2018-04-11 16:32:34 
 * @Last Modified by:   FT.FE.Bolin 
 * @Last Modified time: 2018-04-11 16:32:34 
 */

import Vue from 'vue'
import SvgIcon from '@/components/Icon-svg'

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const iconMap = requireAll(req)