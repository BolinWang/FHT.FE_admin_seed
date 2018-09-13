/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:11:02
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-13 11:12:06
 */

<template>
  <div class="dashboard-container">
    <p style="margin-top: 0;">{{ roles | rolesFilter }}{{ name }}</p>
    <div class="img-banner"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import bannerPic from '@/assets/banner1.jpg'
export default {
  name: 'Dashboard',
  filters: {
    rolesFilter (value) {
      const valueMap = {
        'admin': '【超级管理员】',
        'global': '【普通用户】',
        'service': '【服务用户】'
      }
      return valueMap[value] || '【普通用户】'
    }
  },
  data () {
    return {
      bannerPic: bannerPic
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {

  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    padding: 20px;
    .img-banner {
      height: 50vh;
      border-radius: 10px;
      background-color: #2d3a4b;
      background-image: url(../../assets/banner1.jpg);
      background-size: cover;
      background-position: center center;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
