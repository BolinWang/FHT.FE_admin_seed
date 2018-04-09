<template>
  <div class="previewItems">
    <draggable v-model="list" element="ul" class="list-group"
      :options="dragOptions"
      @start="startDrag"
      @end="endDrag">
      <transition-group type="transition" :name="'flip-list'">
        <li class="preview-item clearfix" v-for="(item, index) in list"
          :key="item.sortNum"
          :style="itemStyle"
          @mouseenter.stop="handleMouseenter(index)"
          @mouseleave.stop="handleMouseleave(index)">
          <img class="preview-img img-center" v-lazy="item.src">
          <span class="preview-item-actions" :style="{opacity: item.opacityVal}">
            <span class="preview-item__item-preview" @click="handlePreview(index)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span v-if="deleteFlag == 'delete' && !item.isnoPic" class="preview-item__item-delete"
              @click="handleDelete(index,item)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
          <div v-if="showImageName" class="pic-imageName">{{item.title}}</div>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import { deepClone } from '@/utils'
import draggable from 'vuedraggable'

/* 阻止原生dragale打开新页面 */
document.body.ondrop = function(event) {
  event.preventDefault();
  event.stopPropagation();
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
    },
    dragOptions () {
      return  {
        animation: 150,
        group: 'description',
        ghostClass: 'ghost',
      }
    }
  },
  data() {
    return {
      list: [],
      deleteFlag: '',
      showOpacity: false,
      isDragging: false,
      delayedDragging: false
    }
  },
  mounted() {
    this.list = deepClone(this.picList)
    this.deleteFlag = this.deleteIcon
    this.list.map((item, index) => {
      item.opacityVal = 0
      item.sortNum = index
    })
  },
  methods: {
    handleMouseenter(index) {
      this.$set(this.list[index], 'opacityVal', 1)
    },
    handleMouseleave(index) {
      this.$set(this.list[index], 'opacityVal', 0)
    },
    async handlePreview(index) {
      if (this.list.length == 1 && this.list[0].isnoPic) {
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
      this.list[e.oldIndex].opacityVal = 0
      this.list[e.newIndex].opacityVal = 0
      this.$set(this.list[e.oldIndex], 'opacityVal', 0)
      this.$set(this.list[e.newIndex], 'opacityVal', 0)
      this.handleEmit()
    }
  },
  watch: {
    picList(val) {
      this.list = val || []
      this.list.map((item, index) => {
        item.sortNum = index
      })
    },
    isDragging (newValue) {
      if (newValue){
        this.delayedDragging= true
        return
      }
      this.$nextTick( () =>{
        this.delayedDragging =false
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
  .preview-item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    display: inline-block;
    width: 122px;
    margin: 0 8px 8px 0;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    position: relative;
    &.ghost {
      opacity: .5;
    }
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
