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
import options from './cityData'
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
    type: {
      type: String,
      default: 'keyValue'
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
      options,
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
      this.selectedOptions = this.value.map(key => key * 1)
    }

    if (this.level === 0) {
      this.options = deepClone(options).map(item => {
        return {
          value: item.value,
          parentvalue: item.parentvalue,
          label: item.label,
          children: [
            ...item.children.map(child => {
              return {
                ...child,
                children: null
              }
            })
          ]
        }
      })
    }
  },
  methods: {
    handleChange (selected) {
      this.$emit('onChanged', selected)
    }
  }
}
</script>
