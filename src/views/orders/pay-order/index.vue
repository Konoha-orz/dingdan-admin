<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.params.keyword" placeholder="名称、账号..." style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
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
      <el-table-column label="公司" prop="customerName" />
      <el-table-column label="订单金额" align="center" prop="orderAmount" />
      <el-table-column label="支付金额" align="center" prop="paidAmount" />
      <el-table-column label="支付用户" align="center" prop="payUserName" />
      <el-table-column label="来源" align="center" prop="originCode" />
      <el-table-column label="类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.payType |enumTranslate('PayType') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.state |enumTranslate('PayOrderState') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center" prop="paySuccessTime" />
      <el-table-column label="创建时间" align="center" prop="creationTime" />
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/pay-order'
import { getEnumValues } from '@/filters/enums'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'PayOrders',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      dateRange: '',
      states: getEnumValues('PayOrderState'),
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
      downloadLoading: false
      // 新增
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
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
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
