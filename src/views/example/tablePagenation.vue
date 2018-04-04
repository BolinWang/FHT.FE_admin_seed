<template>
  <div class="layout-container">
    <GridUnit
      :columns="colModels"
      :url="url"
      :dataMethod="method"
      :maxHeight="tableHeight"
    ></GridUnit>
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
      tableHeight: 300,
      colModels: [
        { prop: 'mobile', label: '手机号码', width: 150 },
        { prop: 'name', label: '姓名' },
        { prop: 'housePosion', label: '地区' },
        { prop: 'houseAmount', label: '房源数量', width: 100 },
        { prop: 'gmtCreate', label: '申请时间', width: 180 },
        { prop: 'requestStatus', label: '联系状态', width: 100, type: 'status' },
        { prop: 'operatorName', label: '操作人' },
        { prop: 'gmtModified', label: '操作时间', width: 180 }
      ],
      url: '/market/apply',
      method: 'queryUserRequestByPage'
    }
  },
  mounted() {
    /* 表格高度控制 */
    let temp_height = document.body.clientHeight - 200;
    this.tableHeight = temp_height > 300 ? temp_height : 300;
    window.onresize = () => {
      return (() => {
        temp_height = document.body.clientHeight - 200;
        this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300;
      })()
    }
  },
  computed: {

  },
  methods: {

  }
}

</script>

<style rel="stylesheet/scss" lang="scss">

</style>
