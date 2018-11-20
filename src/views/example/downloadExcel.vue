<template>
  <div class="components-container">
    <el-button
      :loading="downloadLoading"
      type="primary"
      size="small"
      icon="el-icon-download"
      @click="exportExcel">下载Excel</el-button>
  </div>
</template>

<script>
import { exampleApi } from '@/api/example'

export default {
  name: 'ExamoleDownloadExcel',
  data () {
    return {
      downloadLoading: false,
      colModels: [
        {prop: 'title', label: '标题'},
        {prop: 'introduction', label: '简介'},
        {prop: 'bolin', label: '不导出', noExport: true}
      ]
    }
  },
  methods: {
    // 下载Excel
    exportExcel () {
      this.downloadLoading = true
      exampleApi.list({
        pageNo: 1,
        pageSize: 999999
      }).then(response => {
        const resData = (response.data.content || []).slice()
        resData.map((item, index) => {
          item.index = index * 1 + 1
          item.status = item.statusStr
        })
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const filterCols = this.colModels.filter((item) => {
            return !item.noExport
          })
          const tHeader = ['序号', ...(filterCols.map((item) => item.label))]
          const filterVal = ['index', ...(filterCols.map((item) => item.prop))]
          console.log(tHeader, filterVal)
          const data = this.formatJson(filterVal, resData)
          export_json_to_excel(tHeader, data, '下载的Excel名', '下载的sheet名')
          this.downloadLoading = false
        })
      }).catch((err) => {
        console.log(err)
        this.downloadLoading = false
      })
    },
    // 数据JSON处理
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>
