/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:08:35
 * @Last Modified by:   FT.FE.Bolin
 * @Last Modified time: 2018-04-11 17:08:35
 */

const getters = {
  sidebar: state => state.app.sidebar,
  sessionId: state => state.user.sessionId,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  visitedViews: state => state.tagsView.visitedViews
}
export default getters
