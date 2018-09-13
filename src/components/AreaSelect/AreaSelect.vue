/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:46:41
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-13 11:23:58
 */
<template>
  <div>
    <el-cascader
      :placeholder="placeholder"
      :disabled="disabled"
      :options="options"
      :size="size"
      :clearable="clearable"
      :filterable="filterable"
      v-model="selectedOptions"
      style="width:100%"
      @change="handleChange"/>
  </div>
</template>
<script>
import areaData from './cityData'
export default {
  name: 'Areaselect',
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
      default: 0, // 0->二联 1->三联
      validator: (val) => [0, 1].indexOf(val) > -1
    },
    size: {
      type: String,
      default: 'small'
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
  },
  methods: {
    handleChange (selected) {
      this.$emit('input', selected)
    }
  }
}
</script>
