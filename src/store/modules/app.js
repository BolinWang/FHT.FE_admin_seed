/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:08:47
 * @Last Modified by:   FT.FE.Bolin
 * @Last Modified time: 2018-04-11 17:08:47
 */

import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    ToggleSideBar: ({
      commit
    }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
