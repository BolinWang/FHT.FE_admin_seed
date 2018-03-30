<template>
  <ul class="previewItems">
    <li class="preview-item" v-for="(item, index) in list" :key="index"
      @mouseenter="handleMouseenter(item,index)"
      @mouseleave="handleMouseleave(item,index)">
      <img class="preview-img img-center" v-lazy="item.src">
      <span class="preview-item-actions" :style="{opacity: item.opacityVal}">
        <span class="preview-item__item-preview" @click="handlePreview(index)">
          <i class="el-icon-zoom-in"></i>
        </span>
      <span v-if="deleteFlag == 'delete' && !item.isnoPic" class="preview-item__item-delete" @click="handleDelete(index,item)">
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </li>
  </ul>
</template>
<script>
import { deepClone } from '@/utils'
export default {
  name: 'preview',
  components: {

  },
  props: {
    picList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    deleteIcon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      deleteFlag: '',
      showOpacity: false,
      /*options: {
        mainClass: 'pswp--minimal--dark',
        barsSize: {top: 0, bottom: 0},
        captionEl: false,
        fullscreenEl: true,
        shareEl: false,
        bgOpacity: 0.85,
        tapToClose: true,
        tapToToggleControls: false
      }*/
    }
  },
  mounted() {
    this.list = deepClone(this.picList);
    this.deleteFlag = this.deleteIcon;
    this.list.map((item) => {
      item.opacityVal = 0;
    });
  },
  methods: {
    handleMouseenter(item, index) {
      item.opacityVal = 1;
      this.$set(this.list, index, item)
    },
    handleMouseleave(item, index) {
      item.opacityVal = 0;
      this.$set(this.list, index, item)
    },
    handlePreview(index) {
      if (this.list.length == 1 && this.list[0].isnoPic) {
        this.$message.warning('友情提示：暂无图片');
        return false;
      }
      this.$preview.open(index, this.list)
    },
    handleDelete(index, item) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1);
        this.$emit('emitDelete', this.list, item.id)
      }).catch(() => {

      });
    }
  },
  watch: {
    picList(val) {
      this.list = val || [];
      this.list.map((item) => {
        let _img = new Image()
        _img.src = item.src
        _img.onload = function(){
            item.w = _img.width || 800
            item.h = _img.height || 600
        };
      });
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
.pswp__caption__center {
  text-align: center
}

.pswp {
  z-index: 9999999;
}

.pswp__img {
  background: #fff;
}

.previewItems {
  margin: 0;
  display: inline;
  vertical-align: top;
  .preview-item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 3px;
    box-sizing: border-box;
    width: 122px;
    height: 92px;
    margin: 0 8px 8px 0;
    display: inline-block;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .preview-item-actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      span {
        cursor: pointer;
        line-height: 92px;
        &+span {
          margin-left: 15px;
        }
      }
      .preview-item__item-delete {
        position: static;
        font-size: inherit;
        color: inherit;
      }
    }
  }
}

</style>
