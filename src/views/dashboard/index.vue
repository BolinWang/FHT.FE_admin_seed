<template>
  <div class="dashboard-container">
    <p style="margin-top: 0;">{{roles | rolesFilter}}{{name}}</p>
    <div class="img-banner"></div>
    <div style="padding: 20px 0;">
      <label class="el-button el-button--primary el-button--small" for="uploadImages">上传图片</label>
      <input type="file" id="uploadImages"
        :accept="accept" multiple
        @change="uploadImg($event)"
      >
    </div>
    <!-- 图片预览排序 -->
    <div style="padding: 20px 0; width: 500px;">
      <Preview
        :pic-list="cropperData"
        :delete-icon="`delete`"
        :showImageName=true
        :itemSize="{width: 122, height: 122}"
        @emitDelete="emitDelete">
      </Preview>
    </div>
    <!-- 图片裁剪 -->
    <ImageCropper
      :cropperList="cropperList"
      @emitCropperList="emitCropperList"
      @emitCropperData="emitCropperData">
    </ImageCropper>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import bannerPic from '@/assets/banner1.jpg'
import Preview from '@/components/Preview'
import ImageCropper from '@/components/ImageCropper'
export default {
  name: 'dashboard',
  components: {
    Preview,
    ImageCropper
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
      layer_cropper: false,
      bannerPic: bannerPic,
      accept: 'image/png, image/jpeg, image/jpg',
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
    /* $emit */
    // 删除图片
    emitDelete(val) {
      this.cropperData = val
    },
    // 上传的图片列表
    emitCropperList(list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData(list = []) {
      this.cropperData = list
    },
    /* 选择图片 */
    async uploadImg(e) {
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
          let imageName = ''
          if (!file.name) {
            imageName = ''
          }else {
            imageName = file.name.split('.')[0].length <= 30
              ? file.name.split('.')[0]
              : file.name.split('.')[0].substr(0, 30)
          }
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
        if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(files[i].type) == -1) {
          this.$message.error('请上传jpg/png的图片')
          e.target.value = null
          return false
        }
        uploadList.push(await readFileAsync(files[i]))
      }

      this.cropperList = uploadList.map((item, kindex) => {
        return {
          img: item.img,
          imageName: item.imageName
        }
      })
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

input[type='file']{
  position:absolute;
  clip:rect(0 0 0 0);
}
</style>
