<template>
  <ul class="previewItems">
    <draggable v-model="list" :options="dragOptions" class="dragItems" @end="handleEmit">
      <transition-group>
        <li class="preview-item" v-for="(item, index) in list" :key="index"
          :style="itemStyle"
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
          <div v-if="showImageName" class="pic-imageName">{{item.title}}</div>
        </li>
      </transition-group>
    </draggable>
  </ul>
</template>
<script>
import { deepClone } from '@/utils'
import draggable from 'vuedraggable'
export default {
  name: 'preview',
  components: {
    draggable
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
    },
    showImageName: {
      type: Boolean,
      default() {
        return false
      }
    },
    itemSize: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    itemStyle() {
      return {
        width: this.itemSize.width + 'px',
        height: this.itemSize.height + 'px'
      }
    }
  },
  data() {
    return {
      list: [],
      deleteFlag: '',
      showOpacity: false,
      dragOptions: {
        animation: 500,
        group: 'description',
        ghostClass: 'ghost'
      }
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
        handleEmit(item.id)
      }).catch(() => {

      });
    },
    handleEmit(param) {
      this.list.map((item) => {
        item.opacityVal = 0
      })
      this.$emit('emitDelete', this.list, param)
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
    border-radius: 6px;
    box-sizing: border-box;
    width: 122px;
    margin: 0 8px 8px 0;
    display: inline-block;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    position: relative;
   /* &:first-child::before{
      content: "首图";
      position: absolute;
      right: -22px;
      top: -4px;
      width: 65px;
      height: 30px;
      background: #409eff;
      text-align: center;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      -webkit-box-shadow: 0 1px 1px #13ce66;
      box-shadow: 0 1px 1px #13ce66;
      font-size: 12px;
      line-height: 36px;
      color: #fff;
      z-index: 1;
    }*/
    .pic-imageName {
      font-size: 12px;
      line-height: 24px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 5px;
    }
    img {
      width: 100%;
    }
    .preview-item-actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: move;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        cursor: pointer;
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
