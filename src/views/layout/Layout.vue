/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:22:41
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-18 14:06:36
 */

<template>
  <div
    :class="{hideSidebar:!sidebar.opened}"
    class="app-wrapper">
    <div class="sidebar-wrapper">
      <div class="sidebar_logo">
        <img src="../../assets/logo.png">
        FHT Admin
      </div>
      <sidebar class="sidebar-container"/>
    </div>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.hideSidebar {
    .sidebar-wrapper {
      transform: translate(-140px, 0);
      .sidebar_logo,
      .sidebar-container {
        transform: translate(140px, 0);
      }
      &:hover {
        transform: translate(0, 0);
        .sidebar_logo,
        .sidebar-container {
          transform: translate(0, 0);
        }
      }
    }
    .main-container {
      margin-left: 60px;
    }
  }
  .sidebar-wrapper {
    width: 200px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-x: hidden;
    overflow-y: auto;
    background: rgb(66, 60, 110);
    transition: all .28s ease-out;
    box-shadow: 2px 0 6px rgba(0, 0, 0, .35);
  }
  .sidebar-container {
    transition: all .28s ease-out;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .main-container {
    min-height: 100%;
    transition: all .28s ease-out;
    margin-left: 200px;
  }
  .sidebar_logo {
    width: 100%;
    height: 60px;
    background: rgb(66, 60, 110);
    display: flex;
    align-items: center;
    padding-left: 18px;
    font-size: 20px;
    color: #fff;
    img {
      height: 32px;
      margin-right: 20px;
    }
  }
}
</style>
