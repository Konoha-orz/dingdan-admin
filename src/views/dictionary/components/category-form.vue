<template>
  <div>
    <el-form ref="form" v-loading="loading" :rules="rules" :model="data" label-position="left" label-width="70px" class="dictionary-form">
      <el-form-item label="图片">
        <single-image-upload :value.sync="data.imgUrl" />
      </el-form-item>
      <el-form-item label="ID">
        <span>{{ data.id }}</span>
      </el-form-item>
      <el-form-item label="编号">
        <span>{{ data.code }}</span>
      </el-form-item>
      <el-form-item label="父节点">
        <span>{{ data.parentCode }}</span>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="data.name" placeholder="请输入名称" class="form-input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { saveCategory } from '@/api/dictionary'
import SingleImageUpload from '@/components/Upload/SingleImage'

export default {
  name: 'CategoryForm',
  components: {
    SingleImageUpload
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          id: '',
          code: '',
          parentCode: '',
          name: '',
          imgUrl: ''
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this._onSave()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _onSave() {
      this.loading = true
      saveCategory(this.data).then(response => {
        this.loading = false
        if (response.success) {
          this.$emit('callback')
        } else {
          this.$message.error('保存失败' + response.msg)
        }
      }).catch(e => {
        this.loading = false
      })
    },
    onCancel() {
      this.$emit('cancel')
    }
  }

}
</script>
<style>
.dictionary-form{
  padding-left:50px;
}

.dictionary-form .form-input{
  width: 300px;
}
</style>
