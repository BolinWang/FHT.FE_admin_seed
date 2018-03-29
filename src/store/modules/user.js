import { login, logout, getInfo } from '@/api/login'
import { getSessionId, setSessionId, removeSessionId } from '@/utils/auth'
import defaultAvatar from '@/assets/defaultAvatar.png'

const user = {
  state: {
    sessionId: getSessionId(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      const rolesMap = {
        '1': 'admin',
        '99': 'service',
        '0': 'global'
      }
      state.roles = rolesMap[roles.toString()] || 'global'
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const mobile = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        login(mobile, userInfo.password).then(response => {
          const data = response.data
          setSessionId(data.sessionId)
          commit('SET_SESSIONID', data.sessionId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.sessionId).then(response => {
          const data = response.data
          commit('SET_ROLES', data.isAdmin)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.picUrl || defaultAvatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout({ sessionId: state.sessionId }).then(() => {
          removeSessionId()
          commit('SET_SESSIONID', '')
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeSessionId()
        commit('SET_SESSIONID', '')
        resolve()
      })
    }
  }
}

export default user
