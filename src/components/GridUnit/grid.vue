/*
 * @Author: FT.FE.Bolin 
 * @Date: 2018-04-11 16:47:22 
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-04-12 17:09:07
 */
<template>
  <div class="model-table-pagenation">
    <div class="model-table">
      <el-table v-loading.lock="loading"
        ref="gridUnit"
        :data="tableData"
        :border="border"
        :stripe="stripe"
        :height="height"
        :max-height="maxHeight"
        :fit="fit"
        :size="size"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :row-ket="rowKey"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        style="width: 100%;"
        @select="(selection, row) => emitEventHandler('select', selection, row)"
        @select-all="selection => emitEventHandler('select-all', selection)"
        @selection-change="selection => emitEventHandler('selection-change', selection)"
        @cell-mouse-enter="(row, column, cell, event) => emitEventHandler('cell-mouse-enter', row, column, cell, event)"
        @cell-mouse-leave="(row, column, cell, event) => emitEventHandler('cell-mouse-leave', row, column, cell, event)"
        @cell-click="(row, column, cell, event) => emitEventHandler('cell-click', row, column, cell, event)"
        @cell-dblclick="(row, column, cell, event) => emitEventHandler('cell-dblclick', row, column, cell, event)"
        @row-click="(row, event, column) => emitEventHandler('row-click', row, event, column)"
        @row-dblclick="(row, event) => emitEventHandler('row-dblclick', row, event)"
        @row-contextmenu="(row, event) => emitEventHandler('row-contextmenu', row, event)"
        @header-click="(column, event) => emitEventHandler('header-click', column, event)"
        @sort-change="args => emitEventHandler('sort-change', args)"
        @filter-change="filters => emitEventHandler('filter-change', filters)"
        @current-change="(currentRow, oldCurrentRow) => emitEventHandler('current-change', currentRow, oldCurrentRow)"
        @header-dragend="(newWidth, oldWidth, column, event) => emitEventHandler('header-dragend', newWidth, oldWidth, column, event)"
        @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)" >
        <el-table-column v-if="showRowIndex" type="index" width="40" align="center"></el-table-column>
        <el-table-column v-if="showExpand" type="expand" width="40">
          <template slot-scope="scope">
            <el-form label-position="left" size="small" inline class="table-expand">
              <el-form-item v-for="(item, index) in expandColums" :label="item.label" :key="index">
                <span>{{ scope.row[item.prop] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-if="showSelection" type="selection" width="40"></el-table-column>
        <el-table-column
          v-for="(column, columnIndex) in columns" :key="columnIndex"
          :column-key="column.columnKey"
          :prop="column.prop"
          :label="column.label"
          :width="column.minWidth ? '-' : (column.width || `auto`)"
          :minWidth="column.minWidth || column.width || 100"
          :fixed="column.fixed"
          :render-header="column.renderHeader"
          :sortable="column.sortable"
          :sort-method="column.method"
          :resizable="column.resizable"
          :formatter="column.formatter"
          :show-overflow-tooltip="column.showOverflowTooltip || true"
          :align="column.align || `left`"
          :header-align="column.headerAlign || column.align"
          :class-name="column.className"
          :label-class-name="column.labelClassName"
          :selectable="column.selectable"
          :reserve-selection="column.reserveSelection"
          :filters="column.filters"
          :filter-placement="column.filterPlacement"
          :filter-multiple="column.filterMultiple"
          :filter-method="column.filterMethod"
          :filtered-value="column.filteredValue">
          <template slot-scope="scope">
            <!-- 全局过滤器 -->
            <span v-if="column.filter">
              <i v-if="column.filter === 'parseTime'
                && scope.row[column.prop]
                && scope.row[column.prop] != ''" class="el-icon-time">
              </i>
              {{ Vue.filter(column['filter'])(scope.row[column.prop]) }}
            </span>
            <!-- 图片 -->
            <div v-else-if="column.type === 'img'" style="display: flex;">
              <img v-lazy="scope.row[column.prop]"
                width="40" height="40" class="image preview-img image-center"
                @click="previewImage(scope.row[column.prop])" />
            </div>
            <!-- 链接 -->
            <a v-else-if="column.type === 'link'" :href="scope.row[column.prop]" target="_blank" style="color:#409eff">
              {{scope.row[column.prop]}}
            </a>
            <!-- tags渲染
              * renderStatusType： 渲染tag type
              * renderStatusValue： 渲染tag 内容
            -->
            <el-tag v-else-if="column.type === 'status' && column.unitFilters"
              :type="column.unitFilters.renderStatusType(scope.row[column.prop])">
              {{column.unitFilters.renderStatusValue(scope.row[column.prop])}}
            </el-tag>
            <!-- slot插槽 基本上是适配操作列的 -->
            <span v-else-if="column.slotName">
              <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
            </span>
            <span v-else>
              {{ column.render ? column.render(scope.row) : scope.row[column.prop] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="showPagination" class="model-pagenation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :background="pagenationBg"
        :current-page="pagination.pageNo"
        :page-sizes="pageSizes"
        :page-size="pagination.pageSize"
        :layout="paginationLayout"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import props from './props'
  import { fetch } from '@/utils/fetch'
  import { ObjectMap, deepClone } from '@/utils'
  export default {
    name: 'fht-table-pagination',
    components: {},
    props,
    data() {
      return {
        Vue,
        pagination: {
          pageNo: 1,
          pageSize: 20
        },
        total: 0,
        loading: false,
        tableData: [],
        searchParams: {}
      }
    },
    computed: {

    },
    methods: {
      /* 查看图片 */
      previewImage(imageUrl) {
        if (!imageUrl) {
          return false
        }
        let previewObj = {src: imageUrl}
        let _img = new Image()
        _img.src = imageUrl
        _img.onload = function() {
          previewObj.w = _img.width || 800
          previewObj.h = _img.height || 600
          Vue.$preview.open(0, [previewObj])
        }
      },
      /* changeSize */
      handleSizeChange(size) {
        this.pagination.pageSize = size
        this.fetchHandler()
      },
      /* change pageNo */
      handleCurrentChange(pageNo) {
        this.pagination.pageNo = pageNo
        this.fetchHandler()
      },
      searchHandler() {
        this.pagination.pageNo = 1
        this.fetchHandler()
      },
      fetchHandler() {
        this.loading = true
        let params
        const {
          url, dataMethod,
          listField, pageNoKey, pageSizeKey,
          totalField, showPagination, pagination
        } = this
        params = ObjectMap(deepClone(this.searchParams))
        if (showPagination) {
          params = Object.assign(params, {
            [pageNoKey]: pagination.pageNo,
            [pageSizeKey]: pagination.pageSize
          })
        }
        if (!fetch) {
          this.$message.error(`请联系柏林如何在Grid组件中使用axios请求`)
          this.loading = false
          return false
        }
        fetch(url, {
          method: dataMethod,
          params
        }).then(response => {
          let result = response
          if (response && !(response instanceof Array)) {
            if (listField && listField.indexOf('.') !== -1) {
              listField.split('.').forEach(vv => {
                result = result[vv]
              })
            } else {
              result = response[listField]
            }
          }
          if (!result || !(result instanceof Array)) {
            this.$message.error(`${listField}必须是Array哦. 后端童鞋注意下`)
            this.loading = false
            return false
          }
          if (this.dataHandler) {
            this.tableData = result.map(this.dataHandler)
          } else {
            this.tableData = result
          }
          let totalValue = response
          if (Object.prototype.toString.call(response) === '[object Array]') {
            totalValue = response.length
          } else if (typeof response === 'object') {
            if (totalField && totalField.indexOf('.') !== -1) {
              totalField.split('.').forEach(vv => {
                totalValue = totalValue[vv]
              })
            } else {
              totalValue = response[totalField]
            }
          } else {
            totalValue = 0
          }
          this.total = totalValue
          this.loading = false
        }).catch(error => {
          console.log(error)
          this.loading = false
        })
      },
      emitEventHandler(event) {
        this.$emit(event, ...Array.from(arguments).slice(1))
      }
    },
    mounted() {
      this.$refs['gridUnit'].$on('expand-change', (row, expanded) => this.emitEventHandler('expand-change', row, expanded))
      const { type, autoLoad, formOptions, params } = this
      if (type === 'remote' && autoLoad) {
        this.searchParams = formOptions ? Object.assign(formOptions, params) : params
        this.fetchHandler()
      } else {
        this.$message.error('请联系柏林Grid组件使用姿势')
      }
    },
    watch: {
      formOptions: {
        handler(val) {
          this.searchParams = Object.assign(val, this.params)
        },
        deep: true
      },
      params: {
        handler(val) {
          this.searchParams = Object.assign(val, this.params)
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .model-table {
    border: 1px solid #e6ebf5;
  }

  .model-pagenation {
    padding: 10px 0;
    text-align: right;
  }

  .table-expand {
    font-size: 0;
    .el-form-item__content {
      font-size: 12px;
    }
    .el-form-item__label {
      font-size: 12px;
    }
  }

  .table-expand label {
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>
