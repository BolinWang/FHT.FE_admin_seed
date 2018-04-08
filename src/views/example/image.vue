<template>
  <div class="layout-container">
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
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
export default {
  name: 'example-image',
  components: {
    Preview,
    ImageCropper
  },
  filters: {

  },
  data() {
    return {
      layer_cropper: false,
      accept: 'image/png, image/jpeg, image/jpg',
      cropperList: [],
      cropperData: []
    }
  },
  computed: {

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
          } else {
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
        if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(files[i].type) === -1) {
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
input[type='file']{
  position:absolute;
  clip:rect(0 0 0 0);
}
</style>
