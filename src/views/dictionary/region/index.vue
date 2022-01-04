<template>
  <div class="dictionary-content">
    <el-card>
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
        style="margin-bottom:10px;"
      />
      <el-tree
        ref="tree"
        :data="data"
        :props="props"
        :load="loadNode"
        :filter-node-method="filterNode"
        lazy
      />
    </el-card>
  </div>
</template>

<script>
import * as DictionaryModel from '@/api/dictionary'

export default {
  name: 'RegionAll',
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
      currentNode: {}
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
      DictionaryModel.fetchRegionChildren('CN').then(response => {
        this.data = response.data
        this.loading = false
        loading.close()
      })
    },
    loadNode(node, resolve) {
      if (node.data.childSize < 1) return resolve([])
      DictionaryModel.fetchRegionChildren(node.data.isoCode).then(response => {
        this.$set(node.data, 'children', response.data)
        resolve(response.data)
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
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
