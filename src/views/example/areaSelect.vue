<template>
  <div class="components-container">
    <div style="width: 300px;">
      <area-select
        ref="areaSelect"
        v-model="areaCode"
        :level="1"
        :type="`keyValue`"
        @onChanged="onChanged"/>
    </div>
  </div>
</template>

<script>
import areaSelect from '@/components/AreaSelect'

export default {
  name: 'ExampleAreaSelect',
  components: {
    areaSelect
  },
  data () {
    return {
      areaCode: null
    }
  },
  methods: {
    onChanged (data) {
      console.log(data)
    }
  }
}
</script>
