/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:22:52
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-13 10:52:21
 */

<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      auto-complete="on"
      label-position="left"
      label-width="0px"
      class="card-box login-form">
      <h3 class="title">FT_admin-seed</h3>
      <el-form-item prop="mobile">
        <span class="svg-container">
          <icon-svg icon-class="peoples"/>
        </span>
        <el-input
          v-model="loginForm.mobile"
          name="mobile"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="password"/>
        </span>
        <el-input
          v-model="loginForm.password"
          name="password"
          type="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"/>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { validateMobile } from '@/utils/validate'

export default {
  name: 'Login',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!validateMobile(value.trim())) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '',
        password: ''
      },
      loginRules: {
        mobile: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.login-container {
  @include relative;
  height: 100vh;
  background-color: #2d3a4b;
  background-image: url(../../assets/banner.jpg);
  background-size: cover;
  background-position: center center;
  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px rgb(133, 133, 133) inset !important;
    -webkit-box-shadow: 0 0 0px 1000px rgb(133, 133, 133) inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #fff;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 289px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #fff;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #fff;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin-top: -220px;
    margin-left: -200px;
    background-color: rgba(45, 58, 75, 0.4);
    border-radius: 10px;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 30px;
  }
  .forget-pwd {
    color: #fff;
  }
  .el-form-item__error {
    color: #ff0;
    font-size: 13px;
    line-height: 24px;
  }
}

</style>
