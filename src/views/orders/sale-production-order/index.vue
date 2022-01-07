<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.params.keyword" placeholder="编号、标题、公司..." style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        class="filter-item"
        style="margin-left:10px;margin-right:10px"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        @change="onDateRangeChange"
      />
      <el-select v-model="listQuery.params.states" multiple placeholder="状态" clearable class="filter-item">
        <el-option v-for="item in states" :key="item.code" :label="item.name" :value="item.code" />
      </el-select>
      <el-button v-waves class="filter-item" style="margin-left:10px" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')" width="100px" />
      <el-table-column label="编号" prop="code" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="甲方" align="center" prop="sourceCstmrName" />
      <el-table-column label="乙方" align="center" prop="targetCstmrName" />
      <el-table-column label="创建时间" align="center" prop="creationTime" />
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.state |enumTranslate('SaleOrderState') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center" min-width="0">
        <template slot-scope="{row}">
          <el-tag :type="row.online?'success':''">{{ row.online?'线上':'线下' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="220px">
        <template slot-scope="{row,$index}">
          <el-button size="mini" @click="onDetail(row.code)">
            查看
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :visible.sync="detailDialogVisible" title="订单详情" width="80%">
      <sale-production-order-detail v-if="detailDialogVisible" :code="detailOrderCode" />
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/sale-production-order'
import { getEnumValues } from '@/filters/enums'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import SaleProductionOrderDetail from './detail.vue' // secondary package based on el-pagination

export default {
  name: 'SaleProductionOrder',
  components: { Pagination, SaleProductionOrderDetail },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      dateRange: '',
      states: getEnumValues('SaleOrderState'),
      listQuery: {
        page: 1,
        limit: 20,
        'orders': [
          { 'column': 'id', 'asc': false }
        ],
        params: {
          keyword: '',
          states: [],
          creationTime: {
            from: '',
            to: ''
          }
        }
      },
      showReviewer: false,
      dialogFormVisible: false,
      dialogStatus: '',
      detailDialogVisible: false,
      downloadLoading: false,
      // 新增
      detailOrderCode: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.records
        this.total = response.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    onDetail(code) {
      this.detailOrderCode = code
      this.detailDialogVisible = true
      // this.$router.push(`${this.$route.path}/${code}`)
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    onDateRangeChange(values) {
      if (values != null) {
        this.listQuery.params.creationTime = {
          from: values[0],
          to: values[1]
        }
      } else {
        this.listQuery.params.creationTime = {
          from: '',
          to: ''
        }
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.detailDialogVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
