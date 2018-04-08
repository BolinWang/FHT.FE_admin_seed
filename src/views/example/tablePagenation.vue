<template>
  <div class="layout-container">
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      :dataMethod="method"
      :height="tableHeight">
      <template slot="handle" slot-scope="scope">
        <el-button type="primary" icon="el-icon-view" size="small"
          @click="handleView(scope.$index)">
          再来一个表格吧
        </el-button>
      </template>
    </GridUnit>
    <div>
      <el-dialog title="你知道的  这是第二个表格" width="100%" :visible.sync="layer_show" style="text-align: center;">
        <GridUnit
          ref="refGridUnit_view"
          :columns="colModels_view"
          :url="url"
          :dataMethod="method"
          maxHeight="300">
        </GridUnit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
export default {
  name: 'example-grid',
  components: {
    GridUnit
  },
  filters: {

  },
  data() {
    return {
      layer_show: false,
      tableHeight: 300,
      colModels: [
        {
          prop: 'activityStatus',
          label: '状态',
          width: 80,
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '1': 'info',
                '2': 'success',
                '3': 'danger'
              }
              return statusMap[status] || 'success'
            },
            renderStatusValue(status) {
              const statusStrData = ['待上线', '已上线', '已下线']
              return statusStrData[status - 1] || '已上线'
            }
          }
        },
        {prop: 'title', label: '标题'},
        {prop: 'picUrl', label: '图片', width: 60, type: 'img'},
        {prop: 'linkUrl', label: '链接', type: 'link'},
        {prop: 'effectiveTime', label: '上线时间', width: 180, filter: 'parseTime', sortable: true},
        {prop: 'ineffectiveTime', label: '下线时间', width: 180, filter: 'parseTime'},
        {prop: 'introduction', label: '简介'},
        {label: '操作', slotName: 'handle', width: 160}
      ],
      colModels_view: [
        {prop: 'title', label: '标题'}
      ],
      url: '/market/activity',
      method: 'queryActivityListByPage'
    }
  },
  mounted() {
    /* 表格高度控制 */
    const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
    const pagenationH = 55
    const containerPadding = 20
    let temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
    this.tableHeight = temp_height > 300 ? temp_height : 300
    window.onresize = () => {
      return (() => {
        temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
        this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
      })()
    }
  },
  computed: {

  },
  methods: {
    handleView(index) {
      this.$message.success('柏林爸爸' + index)
      this.layer_show = true
    }

  }
}

</script>

<style rel="stylesheet/scss" lang="scss">

</style>
