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
                :fixed="item.fixed" :fixedNumber="item.fixedNumber"
              ></vueCropper>
            </div>
            <div class="cropper-btn--group clearfix">
              <el-input class="cropper-input--imageName"
                v-model="item.imageName" placeholder="请输入图片名称" size="small"
              ></el-input>
              <el-button-group class="btn-group right">
                <label class="el-button el-button--primary el-button--small" :for="`changeImage${index}`">
                  <i class="el-icon-upload"></i>
                </label>
                <input type="file" :id="`changeImage${index}`"
                  :accept="accept"
                  @change="uploadImg($event, `changeImage`, index)"
                >
                <el-button type="primary" @click="changeScale(1, index)" size="small" icon="el-icon-zoom-in"></el-button>
                <el-button type="primary" @click="changeScale(-1, index)" size="small" icon="el-icon-zoom-out"></el-button>
                <el-button type="primary" @click="rotateLeft(index)" size="small" icon="el-icon-caret-left"></el-button>
                <el-button type="primary" @click="rotateRight(index)" size="small" icon="el-icon-caret-right"></el-button>
              </el-button-group>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_cropper = false" size="small">取 消</el-button>
          <el-button type="primary" @click="layer_cropper = false" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import bannerPic from '@/assets/banner1.jpg'
import VueCropper from 'vue-cropper'
export default {
  name: 'dashboard',
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
      cropperList: []
    }
  },
  components: {
    VueCropper
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    cropperClose() {
      this.cropperList = [];
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
    uploadImg(e, type, index) {
      // 上传图片
      let files = e.target.files
      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        if (!/image\/\w+/.test(file.type)) {
          alert('请上传图片')
          return false
        }
        let reader = new FileReader()
        reader.onerror = function(e) {
          console.log('读取异常....')
        }
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (type == 'changeImage') {
            this.cropperList[index].img = data;
            this.$set(this.cropperList[index], 'img', data);
            this.$set(this.cropperList[index], 'imageName', file.name.split('.')[0])
          } else {
            this.cropperList.push({
              imageName: file.name.split('.')[0],
              img: data,
              info: true,
              size: 1,
              outputType: 'jpeg',
              canScale: false,
              autoCrop: true,
              // 只有自动截图开启 宽度高度才生效
              autoCropWidth: 320,
              autoCropHeight: 240,
              // 开启宽度和高度比例
              fixed: true,
              fixedNumber: [4, 3]
            })
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      }
      this.layer_cropper = true
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
