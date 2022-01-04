<template>
  <div>
    <el-form ref="form" v-loading="loading" :rules="rules" :model="data" label-position="left" label-width="70px" class="dictionary-form">
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
      <el-form-item label="类型">
        <el-input v-model="data.type" placeholder="请输入类型" class="form-input" />
      </el-form-item>
      <el-form-item label="排序值">
        <el-input-number v-model="data.sortNum" :min="1" label="排序值" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { save } from '@/api/dictionary'

export default {
  name: 'DictionaryForm',
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          id: '',
          code: '',
          parentCode: '',
          name: '',
          sortNum: 999,
          type: ''
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
      save(this.data).then(response => {
        this.loading = false
        if (response.success) {
          this.$emit('callback')
        } else {
          this.$message.error('保存失败' + response.msg)
        }
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
