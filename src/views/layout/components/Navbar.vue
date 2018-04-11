/*
 * @Author: FT.FE.Bolin 
 * @Date: 2018-04-11 17:22:27 
 * @Last Modified by:   FT.FE.Bolin 
 * @Last Modified time: 2018-04-11 17:22:27 
 */

<template>
  <div class="clearfix">
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <levelbar></levelbar>
      <div class="right-menu">
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <screenfull class="screenfull right-menu-item"></screenfull>
        </el-tooltip>
        <el-tooltip effect="dark" content="换肤" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"></theme-picker>
        </el-tooltip>
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar">
            <span class="user-name">{{name}}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <el-dropdown-item>
              <span @click="layer_showUserInfo = true" style="display:block;">个人信息</span>
            </el-dropdown-item>
            <router-link class='inlineBlock' to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <!-- 个人信息 -->
    <el-dialog title="个人信息" :visible.sync="layer_showUserInfo" width="600px" @close="dialogClose">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="layer_showUserInfo = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handelSaveUserInfo">确定并重新登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import Hamburger from '@/components/Hamburger'
import ThemePicker from '@/components/ThemePicker'
import Screenfull from '@/components/Screenfull'
import { saveSelfDetailApi } from '@/api/userManage'
import { ObjectMap } from '@/utils'

export default {
  components: {
    Levelbar,
    Hamburger,
    ThemePicker,
    Screenfull
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value && value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      layer_showUserInfo: false,
      ruleForm: {
        name: this.$store.state.user.name,
        password: ''
      },
      rules: {
        password: [
          { trigger: 'blur', validator: validatePass }
        ],
        name: [
          { required: true, trigger: 'blur', validator: validateName }
        ]
      }
    }
  },
  created() {

  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handelSaveUserInfo() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          saveSelfDetailApi(ObjectMap(this.ruleForm)).then(response => {
            this.layer_showUserInfo = false
            this.$store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogClose() {
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
    line-height: 58px;
    height: 50px;
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
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 5px;
    }
    .screenfull {
      height: 40px;
      padding: 4px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      vertical-align: 1px;
    }
    .theme-switch {
      vertical-align: 16px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
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
