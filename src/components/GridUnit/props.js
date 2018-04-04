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
      const methodTypes = ['get', 'post', 'put', 'delete'];
      return methodTypes.indexOf(value.toLowerCase()) !== -1;
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
  listField: {
    type: String,
    default: 'data.content'
  },
  totalField: {
    type: String,
    default: 'data.totalElements'
  },
  params: {
    type: Object,
    default: () => {
      return {}
    }
  },
  formOptions: {
    type: Object
  },
  autoLoad: {
    type: Boolean,
    default: true
  },
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
    // Element UI table-column配置
    columnKey: String,
    label: {
      type: String,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    width: Number,
    minWidth: Number,
    fixed: [Boolean, String],
    renderHeader: Function,
    sortable: [Boolean, String],
    sortMethod: Function,
    resizable: {
      type: Boolean,
      default: true
    },
    formatter: Function,
    showOverflowTooltip: Boolean,
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
    default: 'total, prev, pager, next, jumper, sizes'
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
