/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:50:08
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-01 14:25:26
 */

<template>
  <draggable v-model="list" element="ul" class="list-group"
    :options="dragOptions"
    @start="startDrag"
    @end="endDrag">
    <transition-group type="transition" :name="'flip-list'">
      <li class="preview-item clearfix" v-for="(item, index) in list"
        :key="item.key || item.sortNum"
        :style="itemStyle">
        <img class="preview-img img-center" v-lazy="item.src">
        <span class="preview-tags" v-if="item.picTag">{{item.picTag}}</span>
        <span class="preview-item-actions">
          <span class="preview-item__item-preview" @click="handlePreview(index)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="deleteFlag == 'delete' && !item.isnoPic && item.type == 1" class="preview-item__item-delete"
            @click="handleDelete(index,item)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </li>
    </transition-group>
  </draggable>
</template>
<script>
import { deepClone } from '@/utils'
import draggable from 'vuedraggable'

/* 阻止原生dragale打开新页面 */
document.body.ondrop = function(event) {
  event.preventDefault()
  event.stopPropagation()
}

export default {
  name: 'fht-preview',
  components: {
    draggable
  },
  props: {
    picList: {
      type: Array,
      default: function() {
        return []
      }
    },
    deleteIcon: {
      type: String,
      default: ''
    },
    itemSize: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: String,
      default: 'disabled'
    }
  },
  computed: {
    itemStyle() {
      return {
        width: this.itemSize.width + 'px',
        height: this.itemSize.height + 'px'
      }
    },
    dragOptions() {
      return {
        animation: 150,
        group: 'description',
        ghostClass: 'ghost',
        disabled: this.disabled
      }
    }
  },
  data() {
    return {
      list: [],
      deleteFlag: '',
      isDragging: false,
      delayedDragging: false
    }
  },
  mounted() {
    this.deleteFlag = this.deleteIcon
  },
  methods: {
    async handlePreview(index) {
      if (this.list.length === 1 && this.list[0].isnoPic) {
        this.$message.warning('友情提示：暂无图片')
        return false
      }
      const imgloadAsync = item => new Promise(resolve => {
        let _img = new Image()
        _img.src = item.src
        _img.onload = e => {
          item.w = _img.width || 800
          item.h = _img.height || 600
          resolve(item)
        }
      })
      const previewList = []
      for (let i = 0; i < this.list.length; i++) {
        previewList.push(await imgloadAsync(this.list[i]))
      }
      this.$preview.open(index, previewList)
    },
    handleDelete(index, item) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.handleEmit()
      }).catch(() => {

      })
    },
    handleEmit() {
      this.$emit('emitDelete', this.list)
    },
    startDrag() {
      this.isDragging = true
    },
    endDrag(e) {
      this.isDragging = false
      this.handleEmit()
    }
  },
  watch: {
    picList: {
      immediate: true,
      handler: function (val) {
        this.list = (val || []).slice()
        this.list.map((item, index) => {
          // item.sortNum = item.sortNum !== undefined ? item.sortNum : Math.random().toFixed(5)
          item.sortNum = index
          item.type = item.type || 1
          item.title = item.picTag || ''
        })
      }
    },
    deleteIcon(val) {
      this.deleteFlag = val
    },
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
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

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}

.previewItems {
  margin: 0;
  vertical-align: top;
  display: inline-block;
  .list-group {
    display: initial;
    min-height: 0;
  }
  .preview-item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    display: inline-block;
    width: 122px;
    height: 92px;
    margin: 0 8px 8px 0;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    position: relative;
    &.ghost {
      opacity: .5;
    }
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
      height: 100%;
    }
    .preview-tags {
      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      height: 30px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 12px;
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
    &:hover {
      .preview-item-actions {
        opacity: 1;
      }
    }
  }
}

</style>
