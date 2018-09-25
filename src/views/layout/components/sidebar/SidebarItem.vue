/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:11:36
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-25 20:02:33
 */

<template>
  <div class="container">
    <div
      v-for="(item, itemIndex) in routes"
      :key="itemIndex">
      <template>
        <router-link
          v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
          :to="item.path+'/'+item.children[0].path"
          :class="item.icon ? 'linkItem_icon' : '' "
          class="menu_linkItem">
          <el-menu-item :index="item.path+'/'+item.children[0].path">
            <span class="inlineBlock">
              <i
                v-if="item.icon"
                :class="`iconfont icon-${item.icon}`" />
              <span slot="title">{{ item.children[0].name }}</span>
            </span>
          </el-menu-item>
        </router-link>
        <el-submenu
          v-if="!item.noDropdown&&!item.hidden"
          :index="item.name">
          <template slot="title">
            <span class="inlineBlock">
              <i
                v-if="item.icon"
                :class="`iconfont icon-${item.icon}`" />
              <span slot="title">{{ item.name }}</span>
            </span>
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
                :class="child.icon ? 'linkItem_icon' : '' "
                class="menu-indent menu_linkItem">
                <el-menu-item :index="item.path+'/'+child.path">
                  <span class="inlineBlock">
                    <i
                      v-if="child.icon"
                      :class="`iconfont icon-${child.icon}`" />
                    <span slot="title">{{ child.name }}</span>
                  </span>
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
.iconfont {
  margin-right: 20px;
}

.inlineBlock {
  display: inline-block;
}

.hideSidebar .menu-indent {
  display: block;
  text-indent: 20px;
}

.el-submenu .el-menu-item {
  padding: 0;
  min-width: inherit;
  display: flex;
  align-items: center;
  align-content: center;
}
.el-menu-item.is-active {
  background-color:rgba(41, 44, 207, 1) !important;
  .inlineBlock {
    transform: translate(-6px)
  }
}

.menu_linkItem {
  display: inline-block;
  width: 100%;
  &.router-link-active {
    border-left: 6px solid #1E52FF;
  }
}

.el-submenu__title i,
.el-menu-item i {
  color: #fff;
}
</style>
