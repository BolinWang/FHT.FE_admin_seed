/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:11:19
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-18 10:35:40
 */

<template>
  <div>
    <div class="layout_pageHeader">
      <el-form
        :inline="true"
        :model="formOptions"
        size="small">
        <el-form-item label="审批人">
          <el-input
            v-model="formOptions.user"
            placeholder="审批人"/>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select
            v-model="formOptions.region"
            placeholder="活动区域">
            <el-option
              label="区域一"
              value="上海"/>
            <el-option
              label="区域二"
              value="北京"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="layout-container">
      <GridUnit
        ref="refGridUnit"
        :columns="colModels"
        :url="url"
        :data-method="method"
        :is-mock="isMock"
        :form-options="formOptions"
        :show-expand="true"
        :expand-colums="expandColums">
        <template
          slot="handle"
          slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-view"
            size="small"
            @click="handleView(scope.$index)">
            再来一个表格吧
          </el-button>
        </template>
      </GridUnit>
    </div>
    <div class="dialog_example">
      <el-dialog
        :visible.sync="layer_show"
        title="你知道的  这是第二个表格"
        width="100%"
        style="text-align: center;">
        <GridUnit
          ref="refGridUnit_view"
          :columns="colModels_view"
          :url="url"
          :data-method="method"
          :is-mock="isMock"
          height="300px" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { exampleApi } from '@/api/example'
export default {
  name: 'ExampleGrid',
  components: {
    GridUnit
  },
  filters: {

  },
  data () {
    return {
      layer_show: false,
      tableHeight: 300,
      formOptions: {
        user: '',
        region: ''
      },
      colModels: [
        {
          prop: 'activityStatus',
          label: '状态',
          width: 80,
          type: 'status',
          unitFilters: {
            renderStatusType (status) {
              const statusMap = {
                '1': 'info',
                '2': 'success',
                '3': 'danger'
              }
              return statusMap[status] || 'success'
            },
            renderStatusValue (status) {
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
      expandColums: [
        {prop: 'title', label: '标题'},
        {prop: 'introduction', label: '简介'}
      ],
      url: exampleApi.requestPath,
      method: exampleApi.queryMethod,
      isMock: exampleApi.isMock
    }
  },
  computed: {

  },
  mounted () {
    /* 表格高度控制 */
    this.$nextTick(() => {
      // const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
      // const pagenationH = 55
      // const containerPadding = 20
      // let temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
      // this.tableHeight = temp_height > 300 ? temp_height : 300
      // window.onresize = () => {
      //   return (() => {
      //     temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
      //     this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
      //   })()
      // }
    })
  },
  methods: {
    handleView (index) {
      this.$message.success('柏林爸爸' + index)
      this.layer_show = true
    },
    handleSearch () {
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
