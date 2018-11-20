<template>
  <div class="components-container">
    <el-button
      type="primary"
      @click="dialogTableVisible = true">弹一下吧</el-button>
    <el-dialog
      v-drag-dialog
      :visible.sync="dialogTableVisible"
      title="拖拽弹窗试试吧"
      @dragDialog="handleDrag">
      请在header区域进行拖拽哦~
    </el-dialog>
  </div>
</template>

<script>
import dragDialog from '@/directive/dragDialog'

export default {
  name: 'ExampleDragDialog',
  directives: {
    dragDialog
  },
  data () {
    return {
      dialogTableVisible: false
    }
  },
  methods: {
    handleDrag () {
      console.log('柏林爸爸')
    }
  }
}
</script>
