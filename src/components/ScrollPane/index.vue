/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:51:47
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-13 14:58:11
 */

<template>
  <div
    ref="scrollContainer"
    class="scroll-container"
    @wheel.prevent="handleScroll">
    <div
      ref="scrollWrapper"
      :style="{left: left + 'px'}"
      class="scroll-wrapper">
      <slot/>
    </div>
  </div>
</template>

<script>
const padding = 15

export default {
  name: 'ScrollPane',
  data () {
    return {
      left: 0
    }
  },
  methods: {
    handleScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperWidth = $wrapper.offsetWidth

      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(
              this.left + eventDelta,
              $containerWidth - $wrapperWidth - padding
            )
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget ($target) {
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth

      if ($targetLeft < -this.left) {
        this.left = -$targetLeft + padding
      } else if (
        $targetLeft + padding > -this.left &&
        $targetLeft + $targetWidth < -this.left + $containerWidth - padding
      ) {
        console.log('bolin')
      } else {
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .scroll-wrapper {
    position: absolute;
    -moz-user-select:none;
    -webkit-user-select:none;
    user-select:none;
  }
}
</style>
