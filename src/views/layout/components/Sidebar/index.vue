/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:11:31
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-18 10:16:50
 */

<template>
  <div class="layout-side">
    <el-menu
      :default-active="$route.path"
      mode="vertical"
      background-color="#423C6E"
      text-color="#fff"
      active-text-color="#fff">
      <sidebar-item :routes="permission_routers"/>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  border-right: 0;
}
</style>
