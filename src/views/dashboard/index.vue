<template>
  <div class="dashboard-container">
    <p style="margin-top: 0;">{{roles | rolesFilter}}{{name}}</p>
    <!-- <div class="img-banner"></div> -->
    <div class="test-upload">
      <label class="el-button el-button--primary el-button--small" for="uploadImages">上传图片</label>
      <input type="file" id="uploadImages"
        :accept="accept" multiple
        @change="uploadImg($event, `uploadImages`)"
      >
    </div>
    <!-- 图片预览 -->
    <div style="padding: 20px 0; width: 500px;">
      <Preview :pic-list="cropperData" :delete-icon="`delete`" @emitDelete="emitDelete"></Preview>
    </div>
    <!-- 图片裁剪 -->
    <div class="dialog-cropper">
      <el-dialog title="图片裁剪" :visible.sync="layer_cropper" width="920px" @close="cropperClose">
        <div class="cropper-wrapper">
          <div class="cropper-item" v-for="(item,index) in cropperList" :key="index">
            <div class="cropper-component">
              <vueCropper :ref="`refCropper${index}`"
                :img="item.img" :outputSize="item.size"
                :outputType="item.outputType" :info="item.info"
                :canScale="item.canScale" :autoCrop="item.autoCrop"
                :autoCropWidth="item.autoCropWidth" :autoCropHeight="item.autoCropHeight"
                :full="item.full"
                :fixed="item.fixed" :fixedNumber="item.fixedNumber"
              ></vueCropper>
            </div>
            <div class="cropper-btn--group clearfix">
              <el-input class="cropper-input--imageName"
                v-model="item.imageName" placeholder="请输入图片名称" size="small"
              ></el-input>
              <el-button-group class="btn-group right">
                <el-tooltip class="item" effect="dark" content="替换图片" placement="top-start">
                  <label class="el-button el-button--primary el-button--small" :for="`changeImage${index}`">
                    <i class="el-icon-upload"></i>
                  </label>
                </el-tooltip>
                <input type="file" :id="`changeImage${index}`"
                  :accept="accept"
                  @change="uploadImg($event, `changeImage`, index)"
                >
                <el-tooltip class="item" effect="dark" content="放大图片" placement="top-start">
                  <el-button type="primary" @click="changeScale(1, index)" size="small" icon="el-icon-zoom-in">
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="缩小图片" placement="top-start">
                  <el-button type="primary" @click="changeScale(-1, index)" size="small" icon="el-icon-zoom-out">
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="逆时针旋转90°" placement="top-start">
                  <el-button type="primary" @click="rotateLeft(index)" size="small" icon="el-icon-caret-left">
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="顺时针旋转90°" placement="top-start">
                  <el-button type="primary" @click="rotateRight(index)" size="small" icon="el-icon-caret-right">
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_cropper = false" size="small">取 消</el-button>
          <el-button type="primary" @click="getCropData" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import bannerPic from '@/assets/banner1.jpg'
import VueCropper from 'vue-cropper'
import Preview from '@/components/Preview'
export default {
  name: 'dashboard',
  components: {
    VueCropper,
    Preview
  },
  filters: {
    rolesFilter(value) {
      const valueMap = {
        'admin': '【超级管理员】',
        'global': '【普通用户】',
        'service': '【服务用户】'
      }
      return valueMap[value] || '【普通用户】'
    }
  },
  data() {
    return {
      bannerPic: bannerPic,
      layer_cropper: false,
      accept: 'image/png, image/jpeg, image/gif, image/jpg',
      defaultCropperOptions: {
        imageName: '',
        img: '',
        info: false,
        size: 1,
        outputType: 'jpeg',
        canScale: true,
        autoCrop: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [4, 3],
        // 输出原图比例的截图，不至于大图裁剪出来的图太小啦
        full: true
      },
      cropperList: [],
      cropperData: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    cropperClose() {
      this.cropperList = []
    },
    // 缩放图片
    changeScale(num, index) {
      this.$refs['refCropper' + index][0].changeScale(num)
    },
    // 旋转
    rotateLeft(index) {
      this.$refs['refCropper' + index][0].rotateLeft()
    },
    rotateRight(index) {
      this.$refs['refCropper' + index][0].rotateRight()
    },
    // 裁剪完成
    getCropData() {
      this.cropperList.forEach((item, index) => {
        this.$refs['refCropper' + index][0].getCropData((data) => {
          this.cropperData.push({
            src: data,
            title: item.imageName
          })
        })
      })
      this.layer_cropper = false
    },
    // 删除图片$emit
    emitDelete(val) {
      this.cropperData = val
    },
    /* 选择图片 */
    async uploadImg(e, type, index) {
      if (!e.target.value) {
        console.log('取消上传...')
        return false
      }
      const uploadList = []
      const readFileAsync = file => new Promise(resolve => {
        let reader = new FileReader()
        reader.onerror = function(e) {
          console.log('读取异常....')
        }
        reader.onload = e => {
          const img = (typeof e.target.result === 'object')
            // 把Array Buffer转化为blob 如果是base64不需要
            ? window.URL.createObjectURL(new Blob([e.target.result]))
            : e.target.result
          const imageName = file.name ? file.name.split('.')[0] : ''
          resolve({
            img,
            imageName
          })
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      })

      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        if (!/image\/\w+/.test(files[i].type)) {
          this.$message.error('请上传图片')
          e.target.value = null
          return false
        }
        uploadList.push(await readFileAsync(files[i]))
      }
      if (type === 'changeImage') {
        this.cropperList[index].img = uploadList[0].img
        this.$set(this.cropperList[index], 'img', uploadList[0].img)
        this.$set(this.cropperList[index], 'imageName', uploadList[0].imageName)
      } else {
        this.cropperList = uploadList.map((item, kindex) => {
          return {
            ...this.defaultCropperOptions,
            img: item.img,
            imageName: item.imageName
          }
        })
      }
      this.layer_cropper = true
      e.target.value = null
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    padding: 20px;
    .img-banner {
      height: 50vh;
      border-radius: 10px;
      background-color: #2d3a4b;
      background-image: url(../../assets/banner1.jpg);
      background-size: cover;
      background-position: center center;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.cropper-wrapper{
  display: flex;
  flex-wrap: wrap;
  .cropper-item{
    width: 400px;
    margin: 0 20px;
    .cropper-component{
      height: 300px;
    }
    .cropper-btn--group{
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      .cropper-input--imageName{
        flex: 1;
      }
      .btn-group{
        margin-left: 10px;
      }
    }
  }
}

input[type='file']{
  position:absolute;
  clip:rect(0 0 0 0);
}
</style>
