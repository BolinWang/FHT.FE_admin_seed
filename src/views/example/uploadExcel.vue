<template>
  <div class="components-container">
    <upload-excel
      :on-success="handleSuccess"
      :before-upload="beforeUpload"/>
    <el-table
      :data="tableData"
      highlight-current-row
      style="width: 100%;margin-top:20px;">
      <el-table-column
        v-for="item of tableHeader"
        :prop="item"
        :label="item"
        :key="item"/>
    </el-table>
  </div>
</template>

<script>
import UploadExcel from '@/components/Upload/excel'

export default {
  name: 'ExampleUploadExcel',
  components: {
    UploadExcel
  },
  data () {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload (file) {
      const isLimit1M = file.size / 1024 / 1024 < 1
      if (!isLimit1M) {
        this.$message.warning('文件大小不能超过1M！')
        return false
      }
      return true
    },
    handleSuccess ({ results, header }) {
      this.$message.success('上传成功')
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
