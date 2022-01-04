<template>
  <div class="app-container">
    <el-button
      type="success"
      icon="el-icon-plus"
      style="margin-bottom:10px"
      @click="handleAdd"
    >添加</el-button>
    <el-table
      v-loading="loading"
      :data="data"
      stripe
      border
    >
      <el-table-column label="ID" prop="id" sortable />
      <el-table-column label="编码" prop="code" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="排序" prop="sortNum" sortable />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="220px">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible">
      <dictionary-form v-if="dialogFormVisible" :data="formData" @callback="onCallback" @cancel="dialogFormVisible=false" />
    </el-dialog>
  </div>
</template>
<script>
import DictionaryForm from '../components/dictionary-form.vue'

import * as DictionaryModel from '@/api/dictionary'

export default {
  name: 'SizeAll',
  components: { DictionaryForm },
  data() {
    return {
      data: [],
      loading: false,
      dialogFormVisible: false,
      formData: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      DictionaryModel.fetchByParentCode('size', { deleted: false }).then(response => {
        this.data = response.data
        this.loading = false
      })
    },
    handleAdd() {
      this.formData = { parentCode: 'size' }
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.formData = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    handleDelete(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DictionaryModel.remove(id, true).then(response => {
          this.getData()
        })
      })
    },
    onCallback() {
      this.dialogFormVisible = false
      this.getData()
    }
  }
}
</script>
