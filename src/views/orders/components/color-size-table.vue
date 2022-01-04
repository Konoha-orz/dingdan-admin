<template>
  <!-- <table>
    <template v-for="color in colors">
      <tr :key="color">
        <template v-for="size in sizes">
          <td :key="size">{{ size }}</td>
        </template>
      </tr>
    </template>
  </table> -->

  <table cellspacing="2" width="100%" class="color-size-table">
    <tr class="color-size-table-th_row">
      <th style="width: 60px">颜色/尺码</th>
      <template v-for="size in sizes">
        <th :key="size">{{ size }}</th>
      </template>
      <th>合计</th>
    </tr>
    <template v-for="color in colors">
      <tr v-if="countColorsAmount(color)>0||!readOnly" :key="'tr'+color">
        <td>{{ color }}</td>
        <template v-for="size in sizes">
          <td :key="'td'+size">
            <template v-if="readOnly">
              {{ getEntryQuantity(color, size) }}
            </template>
            <template v-else>
              <el-input
                v-model="getEntryByColorSize(color, size).quantity"
                v-number-input.float="{ min: 0,decimal:0}"
                class="color-size-table-input"
                type="number"
                :min="0"
                :disabled="readOnly"
                @mousewheel.native.prevent
              />
            </template>
          </td>
        </template>
        <td style="width:100px">{{ countColorsAmount(color) }}</td>
      </tr>
    </template>
    <tr>
      <!-- <td :colspan="getColspanLength(sizes.length)">合计</td> -->
      <td>总计</td>
      <template v-for="size in sizes">
        <td :key="'sum'+size" :style="tdStyle">{{ countSizesAmount(size) }}</td>
      </template>
      <td>{{ countTotalAmount(data) }}</td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'ColorSizeTable',
  props: {
    data: {
      type: Array,
      default: null
    },
    readOnly: {
      type: Boolean,
      default: true
    },
    // 是否隐藏数量为0的颜色行
    hideEmptyColors: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      colors: [],
      sizes: []
    }
  },
  computed: {
    tdStyle: function() {
      if (!this.readOnly) {
        return {
          'padding-right': '15px'
        }
      } else {
        return {}
      }
    }
  },
  created() {
    const colorSet = new Set()
    const sizeSet = new Set()
    this.data.forEach((i) => {
      colorSet.add(i.colorCode)
      sizeSet.add(i.sizeCode)
    })
    this.colors = Array.from(colorSet)
    this.sizes = Array.from(sizeSet)
  },
  methods: {
    // 获取颜色尺码对应entry
    getEntryByColorSize(color, size) {
      const index = this.data.findIndex(entry => entry.colorCode === color && entry.sizeCode === size)
      if (index !== -1) {
        return this.data[index]
      }
    },
    getEntryQuantity(color, size) {
      const entry = this.getEntryByColorSize(color, size)
      if (entry && entry.quantity) {
        return entry.quantity
      } else {
        return 0
      }
    },
    countColorsAmount(color) {
      var amount = 0
      this.data.filter(entry => entry.colorCode === color).forEach(entry => {
        const num = parseFloat(entry.quantity)
        if (!Number.isNaN(num)) {
          amount += num
        }
      })
      return amount
    },
    countSizesAmount(size) {
      var amount = 0
      this.data.filter(entry => entry.sizeCode === size).forEach(entry => {
        const num = parseFloat(entry.quantity)
        if (!Number.isNaN(num)) {
          amount += num
        }
      })
      return amount
    },
    countTotalAmount(colorSizeEntries) {
      var amount = 0
      colorSizeEntries.forEach(entry => {
        const num = parseFloat(entry.quantity)
        if (!Number.isNaN(num)) {
          amount += num
        }
      })
      return amount
    },
    getColspanLength(size) {
      return size + 1
    }
  }
}
</script>
<style scoped>
  .color-size-table th{
    background-color: #f7f7f7;
  }

  .color-size-table {
    /* width: 600px;
    height: 600px; */
    border-collapse: collapse;
    margin-bottom: 20px;

    white-space: nowrap;
    overflow: hidden;
    overflow-x: scroll;
  }

  .color-size-table-input .el-input__inner {
    /* width: 60px; */
    border: 0px solid #fff;
    padding: 0px;
    text-align: center;
  }

  .color-size-table-btn {
    padding-left: 10px;
    width: 30px;
  }

  .color-size-table-info {
    font-size: 10px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    margin-left: 20px;
  }

  .color-size-table tr td,
  .color-size-table tr th {
    border: 1px solid rgba(0, 0, 0, 0.15);
    text-align: center;
    height: 30px;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.65);
  }
</style>
