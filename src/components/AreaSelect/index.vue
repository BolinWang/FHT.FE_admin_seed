<template>
  <div>
    <el-cascader
      :placeholder="placeholder"
      :disabled="disabled"
      :options="options"
      :size="size"
      :clearable="clearable"
      :filterable="filterable"
      :show-all-levels="showAllLevels"
      v-model="selectedOptions"
      style="width:100%"
      @change="handleChange" />
  </div>
</template>
<script>
import areaData from './cityData'
import { deepClone } from '@/utils'
export default {
  name: 'AreaSelect',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 1, // 0->二联 1->三联
      validator: (val) => [0, 1].indexOf(val) > -1
    },
    size: {
      type: String,
      default: 'small'
    },
    showAllLevels: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      options: areaData,
      selectedOptions: []
    }
  },
  watch: {
    value (val) {
      this.selectedOptions = val
    }
  },
  created () {
    if (Array.isArray(this.value)) {
      this.selectedOptions = this.value.map(key => { return parseInt(key) })
    }

    if (this.level === 0) {
      let data = deepClone(areaData)
      data.forEach((item, index) => {
        item.children.forEach((v, i) => {
          delete v.children
        })
      })
      this.options = data
    }
  },
  methods: {
    handleChange (selected) {
      this.$emit('input', selected)
    }
  }
}
</script>
