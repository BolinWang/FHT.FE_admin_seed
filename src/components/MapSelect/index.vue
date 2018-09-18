<template>
  <div>
    <el-tooltip
      :disabled="!specificAddress"
      :content="specificAddress"
      class="item"
      effect="dark"
      placement="top-start">
      <el-select
        v-model="specificAddress"
        :clearable="true"
        :remote-method="fetchAddressList"
        :loading="loading"
        :popper-append-to-body="false"
        class="map-address-select"
        filterable
        remote
        placeholder="请输入关键词"
        @focus="checkAddressSelect"
        @clear="clearAddress">
        <el-option
          v-for="(item, index) in addressList"
          :key="index"
          :value="item.formatName"
          @click.native="setAddress(item)"
          v-html="item.displayText"/>
      </el-select>
    </el-tooltip>
    <el-dialog
      :visible.sync="mapModelVisible"
      :append-to-body="true"
      title="地图选择小区"
      width="700px">
      <el-card
        :body-style="{padding: '10px'}"
        class="map-selected-tips">
        <p>1. 如果搜索的内容在右侧列表中小区名称不对（例如：天天超市），点击后可以自定义小区名称、具体位置、所在区域。</p>
        <p>2. 如果搜索的内容在右侧列表中查询不到，请通过鼠标手动定位房源位置，自定义小区名称、具体位置、所在区域。</p>
      </el-card>
      <div class="map-selected-container">
        <div
          ref="bmContainer"
          class="bm-container">
          <div
            id="bm-view"
            class="bm-view"/>
          <el-input
            v-model="searchKeywords"
            class="search-input"
            placeholder="请输入公寓地址"
            clearable
            size="small"
            @keyup.native="searchPositionByKeywords"/>
          <el-popover
            ref="popover"
            popper-class="selected-house-position"
            placement="bottom"
            width="360"
            trigger="manual">
            <el-form
              ref="mapSelectForm"
              :model="mapSelectForm"
              :rules="mapSelectFormRules"
              label-position="right"
              label-width="80px"
              size="mini">
              <i
                class="el-icon-close close-icon"
                @click="$refs.popover.doClose()"/>
              <el-form-item class="form-item">
                <div
                  slot="label"
                  class="city-label">当前城市</div>
                <p class="city-name">{{ mapSelectForm.city }}</p>
              </el-form-item>
              <el-form-item
                class="form-item"
                label="所在区域"
                prop="region">
                <el-select
                  v-model="mapSelectForm.region"
                  style="width: 100%">
                  <el-option
                    v-for="item in regionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item
                class="form-item"
                label="小区名称"
                prop="name">
                <el-input v-model="mapSelectForm.name"/>
              </el-form-item>
              <el-form-item
                class="form-item"
                label="具体地址"
                prop="address">
                <el-input v-model="mapSelectForm.address"/>
              </el-form-item>
            </el-form>
            <div
              slot="reference"
              class="selected-point"/>
          </el-popover>
        </div>
        <el-card
          :body-style="{padding: '10px 0'}"
          class="search-list">
          <a
            v-for="(o, i) in searchResult"
            :key="i"
            class="search-list-item"
            @click="setMapPosition(o.point, o)">
            <p class="title">{{ o.title }}</p>
            <p class="address">{{ o.address }}</p>
          </a>
        </el-card>
      </div>
      <div slot="footer">
        <el-button
          size="small"
          @click="closeMapModel">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="closeMapModel('save')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { estateAddressByKeywordsApi, estateNewSubdistrictApi } from '@/api/houseManage'
import cityData from '@/components/AreaSelect/cityData'
import { deepClone } from '@/utils'
export default {
  name: 'MapSelect',
  props: {
    areaCode: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      specificAddress: '',
      loading: false,
      addressList: [],
      mapModelVisible: false,
      searchKeywords: '',
      searchResult: [],
      map: null,
      local: null,
      mapSelectForm: {},
      mapSelectFormRules: {
        region: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入小区名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入具体地址', trigger: 'blur' }
        ]
      },
      tempAreaCode: [],
      tempMapData: {},
      regionOptions: []
    }
  },
  watch: {
    mapModelVisible (val) {
      if (val) {
        this.$nextTick(() => {
          this.tempAreaCode = deepClone(this.areaCode)
          this.initBMap()
        })
      } else {
        this.$set(this, 'mapSelectForm', {})
        this.searchKeywords = ''
        this.searchResult = []
        this.$refs.popover.doClose()
      }
    },
    value: {
      immediate: true,
      handler: function (val) {
        this.specificAddress = val
      }
    },
    'mapSelectForm.region': function (val, oldVal) {
      if (val !== oldVal && val) {
        this.tempAreaCode[2] = val
      }
    }
  },
  methods: {
    fetchAddressList (query) { // 模糊查询公寓/小区列表
      if (query !== '') {
        this.loading = true
        estateAddressByKeywordsApi({
          cityId: Number(this.areaCode[1]) || 330100,
          keyword: query
        }).then((res) => {
          this.loading = false
          this.addressList = []
          if (res.code === '0' && res.data.list) {
            res.data.list.forEach((item, index) => {
              item.formatName = item.name.replace(/<span(.*?)>/g, '').replace(/<\/span>/g, '') + ' - ' + item.address
              item.displayText = item.name + ' - ' + item.address
            })
            this.addressList = res.data.list
          }
          this.addressList.push({
            formatName: '',
            cityId: '-1',
            displayText: '<span style="color: red">找不到小区？点击这里添加小区</span>'
          })
        })
      } else {
        this.addressList = []
      }
    },
    checkAddressSelect (e) {
      if (!this.areaCode[2]) {
        this.$message.error('请先选择所在地区')
        e.target.blur()
      }
    },
    setAddress (item) { // 选中公寓/小区，没有的话打开地图选择小区模态框
      if (item) {
        if (item.cityId === '-1') {
          this.specificAddress = ''
          this.mapModelVisible = true
          this.$set(this, 'mapSelectForm', {
            city: '',
            name: '',
            region: '',
            address: ''
          })
        } else {
          if (item.areaId !== this.areaCode[2]) {
            this.$emit('addressChange', {
              zoneId: '',
              areaCode: [item.provinceId, item.cityId, item.areaId],
              address: item.formatName,
              regionAddressId: item.regionAddressId || ''
            })
          } else {
            this.$emit('addressChange', {
              address: item.formatName,
              regionAddressId: item.regionAddressId || ''
            })
          }
        }
        this.addressList = []
      }
    },
    initBMap () { // 初始化百度地图
      let self = this
      let selectAddr = ''
      let cityArr = cityData.filter((n) => n.value === this.tempAreaCode[0])
      if (cityArr[0] && cityArr[0].children) {
        selectAddr = cityArr[0].label
        this.mapSelectForm.city = selectAddr
        this.regionOptions = cityArr[0].children.filter((n) => n.value === this.tempAreaCode[1])[0].children
      }
      let selectRegion = this.regionOptions.filter((n) => n.value === this.tempAreaCode[2])
      if (selectRegion[0]) {
        selectAddr += selectRegion[0].label
      }
      /* global BMap */
      self.map = new BMap.Map('bm-view', { minZoom: 13, maxZoom: 19 }) // 创建地图实例
      self.map.centerAndZoom(selectAddr || '杭州市', 15)
      self.map.enableScrollWheelZoom(true)

      self.map.addEventListener('click', function (e) {
        self.setMapPosition(e.point)
      })
      let options = {
        onSearchComplete: function (results) {
          // 判断状态是否正确
          /* global BMAP_STATUS_SUCCESS */
          if (self.local.getStatus() === BMAP_STATUS_SUCCESS) {
            self.searchResult = []
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              self.searchResult.push(results.getPoi(i))
            }
          }
        }
      }
      self.local = new BMap.LocalSearch(self.map, options)
    },
    searchPositionByKeywords () { // 关键字搜索小区列表
      this.local.search(this.searchKeywords)
    },
    setMapPosition (position, o) { // 设置地图中心位置
      if (o) {
        this.$set(this, 'mapSelectForm', Object.assign(this.mapSelectForm, {
          baiduUid: o.uid,
          longitude: o.point.lng + '',
          latitude: o.point.lat + '',
          address: o.address
        }))
      }

      let point = new BMap.Point(position.lng, position.lat)
      let marker = new BMap.Marker(point)
      let geoc = new BMap.Geocoder()
      this.map.clearOverlays()
      this.map.addOverlay(marker)
      this.map.panTo(point)
      this.map.setZoom(15)
      geoc.getLocation(point, rs => {
        let addressInfo = rs.addressComponents
        if (addressInfo.city !== this.mapSelectForm.city) {
          this.mapSelectForm.city = addressInfo.city
          let provinceArr = cityData.filter((item) => item.label === addressInfo.province)
          if (provinceArr[0] && provinceArr[0].children) {
            this.tempAreaCode[0] = provinceArr[0].value
            let cityArr = provinceArr[0].children.filter((n) => n.label === addressInfo.city)

            if (cityArr[0] && cityArr[0].children) {
              this.tempAreaCode[1] = cityArr[0].value
              this.regionOptions = cityArr[0].children
            }
          }
        }

        if (o) {
          this.mapSelectForm.name = o.title
        } else {
          this.$set(this, 'mapSelectForm', Object.assign(this.mapSelectForm, {
            name: rs.surroundingPois[0] ? rs.surroundingPois[0].title : rs.address,
            address: rs.address,
            longitude: rs.point.lng + '',
            latitude: rs.point.lat + ''
          }))
        }
        this.regionOptions.forEach((item) => {
          if (item.label === addressInfo.district) {
            this.mapSelectForm.region = item.value
          }
        })
        this.tempMapData = deepClone(this.mapSelectForm)
      })
      this.$refs.popover.doShow()
    },
    closeMapModel (type) { // 关闭地图模态框
      if (type === 'save') {
        this.$refs.mapSelectForm.validate((status) => {
          if (status) {
            this.addEstateSubdistrict(0)
          } else {
            console.log(status)
            this.$message.error('您还有必填信息未填写完全，请全部填写好后再保存')
            return false
          }
        })
      } else {
        this.mapModelVisible = false
      }
    },
    addEstateSubdistrict (status) { // 新增小区
      status = status || 0
      let source = 1
      if (status === 0) {
        Object.keys(this.mapSelectForm).forEach((key) => {
          if (this.mapSelectForm[key] !== this.tempMapData[key]) {
            source = 5
          }
        })
      } else {
        source = 5
      }
      let formOptions = {
        provinceId: this.tempAreaCode[0],
        cityId: this.tempAreaCode[1],
        regionId: this.tempAreaCode[2],
        source: source,
        confirmStatus: status
      }
      estateNewSubdistrictApi({
        ...this.mapSelectForm,
        ...formOptions
      }).then((res) => {
        const data = res.data
        if (data.confirmStatus !== 1) {
          this.mapModelVisible = false
          if (this.tempAreaCode[2] !== this.areaCode[2]) {
            this.$emit('addressChange', {
              areaCode: this.tempAreaCode,
              address: this.mapSelectForm.name + ' - ' + this.mapSelectForm.address,
              regionAddressId: data.regionAddressId,
              zoneId: ''
            })
          } else {
            this.$emit('addressChange', {
              address: this.mapSelectForm.name + ' - ' + this.mapSelectForm.address,
              regionAddressId: data.regionAddressId
            })
          }
        } else {
          this.$confirm('新选择的小区名称、区域、具体地址和历史录入的一致，<span style="color:red">但经纬度坐标不一致</span>，是否使用新坐标并覆盖？', '再次确定', {
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
            confirmButtonText: '使用新地址',
            cancelButtonText: '使用原地址'
          }).then(() => {
            this.addEstateSubdistrict(2)
          }).catch((action) => {
            if (action === 'cancel') {
              this.addEstateSubdistrict(3)
            }
          })
        }
      })
    },
    clearAddress () {
      this.$emit('addressChange', {
        address: '',
        regionAddressId: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-address-select {
  width: 100%;
}
.map-selected-container {
  position: relative;
  width: 660px;
  height: 400px;
  display: flex;
  justify-content: space-between;
  .bm-container {
    width: 400px;
    height: 400px;
    .bm-view {
      width: 400px;
      height: 400px;
      background-color: #ff0000;
    }
    .search-input {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 340px;
    }
  }
  .search-list {
    width: 250px;
    height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
    .search-list-item {
      display: block;
      line-height: 1;
      padding: 8px 15px;
      &:hover {
        background-color: rgba(240, 240, 240, 0.8);
      }
    }
    .address {
      margin: 0;
      color: #999;
      font-size: 12px;
    }
    .title {
      margin: 0 0 5px;
      font-size: 14px;
      color: #333;
    }
  }
  .selected-point {
    position: absolute;
    top: 200px;
    left: 200px;
    width: 0;
    height: 0;
    visibility: hidden;
  }
}
.selected-house-position {
  .form-item {
    position: relative;
    margin-bottom: 10px;
    .city-label {
      &::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
    }
  }
  .city-name {
    margin: 0;
  }
  .close-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    cursor: pointer;
    font-size: 18px;
    transition: transform 0.3s;
    &:hover {
      transform: rotate(90deg);
    }
  }
}
.map-selected-tips {
  margin-top: -20px;
  margin-bottom: 10px;
  p {
    font-size: 12px;
    margin: 0;
    color: red;
  }
}
</style>
