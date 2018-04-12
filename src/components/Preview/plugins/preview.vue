/*
 * @Author: FT.FE.Bolin 
 * @Date: 2018-04-11 16:50:01 
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-04-12 10:54:00
 */

<template>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item" ref="previewItem0"></div>
        <div class="pswp__item" ref="previewItem1"></div>
        <div class="pswp__item" ref="previewItem2"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="关闭 (Esc)"></button>
          <a v-if="pswpOptions.downloadEl" target="_self" class="fht__download el-icon-download" title="下载图片"
            :href="downloadImageUrl"
            :download="downloadImageName">
          </a>
          <span class="fht__download el-icon-caret-right" title="旋转图片" @click="transformRotate()"></span>
          <button class="pswp__button pswp__button--share" title="分享"></button>
          <button class="pswp__button pswp__button--fs" title="全屏展示"></button>
          <button class="pswp__button pswp__button--zoom" title="放大/缩小"></button>
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="上一张">
        </button>
        <button class="pswp__button pswp__button--arrow--right" title="下一张">
        </button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PhotoSwipe from 'photoswipe/dist/photoswipe'
  import UI from 'photoswipe/dist/photoswipe-ui-default'
  export default {
    data() {
      return {
        defaultOptions: {
          captionEl: true,
          bgOpacity: 0.8,
          fullscreenEl: true,
          history: false,
          shareEl: false,
          tapToClose: true,
          /* 下载按钮显示 */
          downloadEl: true
        },
        pswpOptions: {},
        /* 下载图片地址、名称 */
        downloadImageUrl: '',
        downloadImageName: '',
        // 当前图片旋转次数
        rotateCount: 0
      }
    },
    methods: {
      open(index, list, params = this.defaultOptions) {
        this.rotateCount = 0
        this.pswpOptions = Object.assign({
          index: index,
          getThumbBoundsFn(index) {
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = document.querySelectorAll('.preview-img')[index].getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }, params)
        this.photoswipe = new PhotoSwipe(this.$el, UI, list, this.pswpOptions)
        this.photoswipe.init()
        // 默认下载当前index图片
        this.downloadImageUrl = list[index].src
        this.downloadImageName = `麦滴管家_${list[index].title}`

        /* 监听图片变换，替换当前下载图片链接 */
        this.photoswipe.listen('afterChange', (e) => {
          this.rotateCount = 0
          this.downloadImageUrl = list[this.photoswipe.getCurrentIndex() || 0].src
          this.downloadImageName = `麦滴管家_${list[this.photoswipe.getCurrentIndex() || 0].title}`
        })
      },
      close() {
        this.rotateCount = 0
        this.photoswipe.close()
      },
      /**
       * 旋转图片
       * @ratateDeg: 旋转角度
       * @refIndex: 当前图片容器索引
       */
      transformRotate() {
        this.rotateCount = this.rotateCount > 3 ? 0 : this.rotateCount
        this.rotateCount++
        const ratateDeg = this.rotateCount * 90
        const refIndex = (this.photoswipe.getCurrentIndex() % 3 + 1) % 3
        this.$refs[`previewItem${refIndex}`].querySelector('img').style.transform = `rotateZ(${ratateDeg}deg)`
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '~photoswipe/dist/photoswipe.css';
  @import '~photoswipe/dist/default-skin/default-skin.css';
  .fht__download {
    text-align: center;
    width: 44px;
    height: 44px;
    line-height: 44px !important;
    font-size: 24px;
    position: relative;
    background: none;
    cursor: pointer;
    overflow: visible;
    -webkit-appearance: none;
    display: block;
    border: 0;
    padding: 0;
    margin: 0;
    float: right;
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #fff;
    opacity: 0.85;
    &:focus,
    &:hover{
      color: #fff;
      opacity: 1;
    }
  }
</style>
