<template>
  <div class="dictionary-content">
    <el-card>
      <el-form :inline="true">
        <el-form-item>
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
            style="margin-bottom:10px;"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            icon="el-icon-plus"
            style="margin-bottom:10px"
            @click="append(null,{code:''})"
          >添加根节点</el-button>
        </el-form-item>
      </el-form>
      <el-tree
        ref="tree"
        :data="data"
        :props="props"
        :load="loadNode"
        :filter-node-method="filterNode"
        lazy
      >
        <span slot-scope="scope" class="custom-tree-node">
          <span>{{ scope.data.name }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(scope.node,scope.data)"
            >
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => edit(scope.node,scope.data)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(scope.node, scope.data)"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
    <el-dialog v-if="dialogFormVisible" :visible.sync="dialogFormVisible">
      <category-form :data="formData" @callback="onCallback" @cancel="dialogFormVisible=false" />
    </el-dialog>
  </div>
</template>

<script>
import * as DictionaryModel from '@/api/dictionary'
import CategoryForm from '../components/category-form.vue'

export default {
  name: 'CategoryAll',
  components: { CategoryForm },
  data() {
    return {
      data: [],
      filterText: '',
      loading: false,
      dialogFormVisible: false,
      formData: {},
      props: {
        label: 'name',
        children: 'children',
        isLeaf: (data, node) => data.childSize < 1
      },
      // 当前操作父节点
      currentParentNode: {}
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getRoot()
  },
  methods: {
    getRoot() {
      const loading =
      this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      DictionaryModel.fetchCategoryRoot({ deleted: false }).then(response => {
        this.data = response.data
        this.loading = false
        loading.close()
      })
    },
    loadNode(node, resolve) {
      if (node.data.childSize < 1) return resolve([])
      DictionaryModel.fetchCategoryChildren(node.data.code, { deleted: false }).then(response => {
        this.$set(node.data, 'children', response.data)
        resolve(response.data)
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    append(node, data) {
      // 添加节点为当前节点
      this.currentParentNode = node
      this.formData = {
        parentCode: data.code
      }
      this.dialogFormVisible = true
    },
    edit(node, data) {
      this.currentParentNode = node.parent
      this.formData = Object.assign({}, data)
      this.dialogFormVisible = true
    },
    remove(node, data) {
      this.currentParentNode = node.parent
      this.$confirm('是否删除节点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DictionaryModel.removeCategory(data.code, true).then(response => {
          this.onCallback()
        })
      })
    },
    onCallback() {
      this.dialogFormVisible = false
      // 是否有父节点
      const parentNode = this.currentParentNode
      if (parentNode && parentNode.level > 0) {
        DictionaryModel.fetchCategoryChildren(parentNode.data.code, { deleted: false }).then(response => {
          parentNode.childNodes = []
          this.$set(parentNode.data, 'children', response.data)
        })
      } else {
        this.getRoot()
      }
    }
  }
}
</script>
<style scoped>
  .dictionary-content{
    padding: 20px;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
