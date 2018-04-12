/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:49:14
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-04-12 10:38:46
 */

let props = {
  // Element UI table配置
  height: [String, Number],
  maxHeight: [String, Number],
  stripe: {
    type: Boolean,
    default: true
  },
  border: Boolean,
  size: {
    type: String,
    default: 'small'
  },
  fit: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  highlightCurrentRow: {
    type: Boolean,
    default: true
  },
  currentRowKey: [String, Number],
  rowClassName: [String, Function],
  rowStyle: [String, Function],
  rowKey: [String, Function],
  emptyText: String,
  defaultExpandAll: Boolean,
  expandRowKeys: Array,
  defaultSort: Object,
  tooltipEffect: String,
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  // 自定义配置

  // axios url
  url: {
    type: String
  },

  // axios method  一般post
  method: {
    type: String,
    default: 'post',
    validator: value => {
      const methodTypes = ['get', 'post', 'put', 'delete']
      return methodTypes.indexOf(value.toLowerCase()) !== -1
    }
  },

  // axios dataMethod
  dataMethod: {
    type: String
  },

  // axios headers  一般不需要
  headers: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // showRowIndex
  showRowIndex: {
    type: Boolean,
    default: true
  },
  // showSelection
  showSelection: {
    type: Boolean,
    default: false
  },
  // showExpand
  showExpand: {
    type: Boolean,
    default: false
  },
  // 获取列表数据  需要与后台约定数据格式
  listField: {
    type: String,
    default: 'data.content'
  },
  // 列表数据总数
  totalField: {
    type: String,
    default: 'data.totalElements'
  },
  /* 传参  基本上使用formOptions就好啦 */
  params: {
    type: Object,
    default: () => {
      return {}
    }
  },
  formOptions: {
    type: Object,
    default: () => {
      return {}
    }
  },
  /* 自动加载数据 */
  autoLoad: {
    type: Boolean,
    default: true
  },

  /* 接口数据排列，后续可以增加本地数据操作 */
  type: {
    type: String,
    default: 'remote',
    validator(value) {
      const types = ['remote', 'local']
      const validType = types.indexOf(value) !== -1
      if (!validType) {
        this.$message.error(`不支持'${value}', 请设置remote或local（local我是不支持的，不要问我为什么，有需要找我来呀）.`)
        return false
      }
      return validType
    }
  },
  data: {
    type: Array
  },
  dataHandler: {
    type: Function
  },
  columns: {
    type: Array,
    required: true,
    /*
      Element UI table-column配置
      供参考，需要一下配置时在cloum中添加对应参数配置
    */

    columnKey: String,
    label: {
      type: String,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    minWidth: {
      type: Number,
      default: 100
    },
    fixed: [Boolean, String],
    renderHeader: Function,
    sortable: [Boolean, String],
    sortMethod: Function,
    resizable: Boolean,
    formatter: Function,
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'left'
    },
    headerAlign: String,
    className: {
      type: String,
      default: ''
    },
    labelClassName: {
      type: String,
      default: ''
    },
    selectable: Function,
    reserveSelection: Boolean,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    filterMethod: Function,
    filteredValue: Array,
    // table-column attribute
    filter: {
      type: String
    },
    render: {
      type: Function
    },
    slotName: {
      type: String
    }
  },

  // expand展开行列表数据
  expandColums: {
    type: Array,
    default: () => {
      return []
    }
  },

  // pageNation配置
  showPagination: {
    type: Boolean,
    default: true
  },
  pagenationBg: {
    type: Boolean,
    default: true
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [20, 30, 50]
    }
  },
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  pageNoKey: {
    type: String,
    default: 'pageNo'
  },
  pageSizeKey: {
    type: String,
    default: 'pageSize'
  }
}

export default props
