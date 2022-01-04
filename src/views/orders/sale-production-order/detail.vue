<template>
  <div>
    <el-skeleton :loading="loading" animated>
      <el-row>
        <el-col
          :span="8"
        ><span>单号:{{ code }}</span></el-col>
      </el-row>
      <el-table
        :data="data.entries"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-card>
              <el-form label-position="left" inline class="sale-order-table-expand">
                <el-form-item label="编号">
                  <span>{{ props.row.code }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span>{{ props.row.state|enumTranslate('SaleOrderEntryState') }}</span>
                </el-form-item>
                <el-form-item label="联系人">
                  <span>{{ props.row.contactPerson }}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ props.row.contactPhone }}</span>
                </el-form-item>
                <el-form-item label="地址">
                  <span>{{ props.row.detailAddress }}</span>
                </el-form-item>
              </el-form>
              <color-size-table
                :data="props.row.colorSizeEntries"
              />
            </el-card>
          </template>
        </el-table-column>
        <el-table-column
          label="ID"
          prop="id"
          width="100px"
        />
        <el-table-column label="编号" prop="code" />
        <el-table-column label="产品名" prop="productName" />
        <el-table-column label="图片">
          <template slot-scope="{row}">
            <el-image
              style="width: 80px; height: 80px"
              :src="IMG_PREFIX+row.productImage+'?x-oss-process=image/resize,l_80'"
              fit="cover"
              :preview-src-list="images"
            />
          </template>
        </el-table-column>
        <el-table-column label="货号" prop="productSkuId" />
        <el-table-column label="价格" prop="unitPrice" />
        <el-table-column label="数量" prop="quantity" />
        <el-table-column label="总额" prop="totalAmount" />
        <el-table-column label="交期" prop="deliveryDate" />
      </el-table></el-skeleton>
  </div>
</template>

<script>
import { fetchDetail } from '@/api/sale-production-order'

import ColorSizeTable from './../components/color-size-table.vue'

export default {
  name: 'SaleProductionOrderDetail',
  components: { ColorSizeTable },
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      data: ''
    }
  },
  computed: {
    images() {
      return this.data.entries.map(i => this.IMG_PREFIX + i.productImage)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      fetchDetail(this.code).then((response) => {
        this.loading = false
        this.data = response.data
      })
    }
  }
}
</script>
<style>
  .sale-order-table-expand {
    font-size: 0;
  }
  .sale-order-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .sale-order-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
