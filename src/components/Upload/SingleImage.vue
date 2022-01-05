<template>
  <el-upload
    class="avatar-uploader"
    :action="OSS_HOST"
    :show-file-list="false"
    :on-success="handleImageSuccess"
    :before-upload="beforeUpload"
    :data="data"
  >
    <img v-if="value" :src="IMG_PREFIX+value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
export default {
  name: 'SingleImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: null
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    handleImageSuccess(res, file) {
      this.$emit('update:value', '/' + this.data.key)
    },
    beforeUpload(file) {
      const _self = this

      // 不大于5M
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isLt5M) {
        _self.$message.error('上传头像图片大小不能超过 5MB!')
        return false
      }

      const date = new Date()
      // 文件名
      const key = date.getFullYear() + '-' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + file.uid + file.name

      // 校验OSS签名
      if (_self.data && _self.data.expireTime > (new Date().getTime())) {
        console.log('====')
        _self.data.key = key
        return true
      } else {
        console.log('====2')
        return new Promise((resolve, reject) => {
          _self.$store.dispatch('user/getOssInfo').then(response => {
            const data = {
              key,
              policy: response.policy,
              OSSAccessKeyId: response.accessId,
              signature: response.signature,
              expireTime: response.expireTime
            }
            _self.data = data
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      }
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;

  }
</style>
