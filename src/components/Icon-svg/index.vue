/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:49:30
 * @Last Modified by:   FT.FE.Bolin
 * @Last Modified time: 2018-04-11 16:49:30
 */

<template>
  <svg
    :class="svgClass"
    aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>
<script>
export default {
  name: 'IconSvg',
  props: {
    className: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
