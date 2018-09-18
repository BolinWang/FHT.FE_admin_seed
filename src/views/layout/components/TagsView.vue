/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:22:33
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-17 19:37:47
 */

<template>
  <div class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper">
      <router-link
        v-for="tag in Array.from(visitedViews)"
        ref="tag"
        :class="isActive(tag)?'active--primary':''"
        :to="tag.path"
        :key="tag.path"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag, $event)">
        {{ tag.name }}
        <span
          class="el-icon-remove"
          @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu el-dropdown-menu">
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags">全部关闭</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'

export default {
  components: { ScrollPane },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    },
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
  watch: {
    $route () {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted () {
    this.addViewTags()
  },
  methods: {
    isActive (route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags () {
      if (!this.$route.name) {
        return false
      }
      this.$store.dispatch('addVisitedViews', this.$route)
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag (view) {
      const visitedViews = this.$store.state.tagsView.visitedViews
      if (view.name === '首页' && visitedViews.length === 1 && view.name === visitedViews[0].name) {
        return false
      }
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag.path)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags () {
      const visitedViews = this.$store.state.tagsView.visitedViews
      if (visitedViews.length === 1 && visitedViews[0].name === '首页') {
        return false
      }
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu (tag, e) {
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX - (this.sidebar.opened ? 180 : 40)
      this.top = e.clientY
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  width: calc(100% - 300px);
  height: 100%;
  .tags-view-wrapper {
    background: #fff;
    display: flex;
    align-items: center;
    height: 100%;
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 28px;
      line-height: 28px;
      border: 1px solid #d8dce5;
      color: #333;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      border-radius: 4px;
      &:first-child{
        margin-left: 0
      }
      &.active--primary {
        background-color: #409eff;
        color: #fff;
        border-color: #409eff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    z-index: 2;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    color: #333;
    li {
      margin: 0;
      padding: 7px 16px;
      line-height: 1.2;
      cursor: pointer;
      &:hover {
        background: #ecf5ff;
        color: #66b1ff;
      }
    }
  }
}
</style>
