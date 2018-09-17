/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:11:36
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-17 16:23:32
 */

<template>
  <div>
    <div
      v-for="(item, itemIndex) in routes"
      :key="itemIndex">
      <template>
        <router-link
          v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
          :to="item.path+'/'+item.children[0].path">
          <el-menu-item :index="item.path+'/'+item.children[0].path">
            <i
              v-if="item.icon"
              :class="`iconfont icon-${item.icon}`" />
            <span slot="title">{{ item.children[0].name }}</span>
          </el-menu-item>
        </router-link>
        <el-submenu
          v-if="!item.noDropdown&&!item.hidden"
          :index="item.name">
          <template slot="title">
            <i
              v-if="item.icon"
              :class="`iconfont icon-${item.icon}`" />
            <span slot="title">{{ item.name }}</span>
          </template>
          <div
            v-for="(child, childIndex) in item.children"
            v-if="!child.hidden"
            :key="childIndex">
            <template>
              <sidebar-item
                v-if="child.children&&child.children.length>0"
                :routes="[child]"
                class="menu-indent"/>
              <router-link
                v-else
                :to="item.path+'/'+child.path"
                class="menu-indent">
                <el-menu-item :index="item.path+'/'+child.path">
                  {{ child.name }}
                </el-menu-item>
              </router-link>
            </template>
          </div>
        </el-submenu>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  margin-right: 10px;
}

.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}

.el-submenu .el-menu-item {
  padding: 0;
  min-width: inherit;
  display: flex;
  align-items: center;
  align-content: center;
}

.el-submenu__title i,
.el-menu-item i {
  color: #fff;
}
</style>
