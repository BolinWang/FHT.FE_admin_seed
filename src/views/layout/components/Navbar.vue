/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:22:27
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-17 09:56:22
 */

<template>
  <div class="clearfix">
    <el-menu
      class="navbar"
      mode="horizontal">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"/>
      <tags-view/>
      <div class="right-menu">
        <el-tooltip
          effect="dark"
          content="全屏"
          placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="换肤"
          placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip>
        <el-dropdown
          class="avatar-container right-menu-item"
          trigger="click">
          <div class="avatar-wrapper">
            <img
              :src="avatar"
              class="user-avatar">
              <!-- <span class="user-name">{{ name }}</span>
            <i class="el-icon-caret-bottom"/> -->
          </div>
          <el-dropdown-menu
            slot="dropdown"
            class="user-dropdown">
            <el-dropdown-item>
              <span
                style="display:block;"
                @click="layer_showUserInfo = true">个人信息</span>
            </el-dropdown-item>
            <router-link
              class="inlineBlock"
              to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span
                style="display:block;"
                @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <!-- 个人信息 -->
    <el-dialog
      :visible.sync="layer_showUserInfo"
      title="个人信息"
      width="600px"
      @close="dialogClose">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        label-width="100px">
        <el-form-item
          label="用户名"
          prop="name">
          <el-input
            v-model="ruleForm.name"
            disabled/>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import ThemePicker from '@/components/ThemePicker'
import Screenfull from '@/components/Screenfull'
import { default as TagsView } from './TagsView'

export default {
  components: {
    Hamburger,
    ThemePicker,
    Screenfull,
    TagsView
  },
  data () {
    return {
      layer_showUserInfo: false,
      ruleForm: {
        name: this.$store.state.user.name
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  created () {

  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    dialogClose () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 54px;
    height: 49px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  .right-menu {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      height: 40px;
      display: inline-block;
      margin: 0 5px;
    }
    .screenfull {
      padding: 4px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        height: 40px;
      }
      .user-name {
        position: relative;
        top: -5px;
      }
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 4px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
