<template>
  <a-tabs default-active-key="1" @change="getOrders">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="account-book" />
       Outstanding Orders
      </span>
      <a-table
        :columns="outstandingColumns"
        :data-source="outstandingOrders"
        :row-key="record => record.id"
        :pagination="false"
        class="components-table-demo-nested"
        size="small"
        :defaultExpandAllRows="true"
      >

        <template slot="status" slot-scope="text">
          <a-tag
            :color="text === 1 ? 'pink' : text === 2? 'green': text === 6? 'grey': 'purple'"
          >
            {{ statusDesc[text].toUpperCase() }}
          </a-tag>
        </template>
        <template slot="amount" slot-scope="text">
        <span>
          {{'￥' + text}}
        </span>
        </template>
        <template slot="dateTime" slot-scope="text">
        <span>
          {{text | dateTime}}
        </span>
        </template>
        <template slot="action" slot-scope="text, record, index">
          <a @click="updateOrder(record.id, 2)" :disabled = "record.status === 2">接单</a>
          <a :disabled = "record.status === 2" @click="updateOrder(record.id, 6)">取消</a>
          <a v-if = "record.status === 2" @click="updateOrder(record.id, 3)">完成</a>
        </template>
        <a-table
          slot="expandedRowRender"
          slot-scope="text"
          :columns="innerColumns"
          :data-source="text.orderItems"
          :pagination="false"
          :row-key="record => record.id"
          size="small"
          :scroll="{ x: 1500, y: 200 }"
        >
          <template slot="inner-price" slot-scope="text">
        <span>
          {{'￥' + text}}
        </span>
          </template>
        </a-table>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        <a-icon type="smile" />
       All Orders
      </span>
      <a-table
        :columns="allColumns"
        :data-source="allOrders"
        :loading = "loading"
        :row-key="record => record.id"
        class="components-table-demo-nested"
        size="small"
        :pagination="pagination"
      >

        <template slot="status" slot-scope="text">
          <a-tag
            :color="text === 0 ? 'grey' : text === 1 ? 'pink' : text === 2? 'green': text ===3? 'orange': text ===4? 'cyan': text === 5? 'purple': 'grey'"
          >
            {{ statusDesc[text].toUpperCase() }}
          </a-tag>
        </template>
        <template slot="amount" slot-scope="text">
        <span>
          {{'￥' + text}}
        </span>
        </template>
        <template slot="dateTime" slot-scope="text">
        <span>
          {{text | dateTime}}
        </span>
        </template>
        <a-table
          slot="expandedRowRender"
          slot-scope="text"
          :columns="innerColumns"
          :data-source="text.orderItems"
          :pagination="false"
          :row-key="record => record.id"
          size="small"
        >
          <template slot="inner-price" slot-scope="text">
        <span>
          {{'￥' + text}}
        </span>
          </template>
        </a-table>
      </a-table>
    </a-tab-pane>
  </a-tabs>
</template>
<script>

import columnsConfig from './columns.config'
import orderService from '../../service/order'

export default {
  name: 'OrderInfo',
  mixins: [columnsConfig],
  data () {
    return {
      shopId: 2,
      outstandingOrders: [],
      allOrders: [],
      paginationCurrent: 1,
      pagination: {
        size: 'normal',
        current: 1,
        total: 1,
        pageSize: 15,
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange,
        onChange: this.pageChange,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      statusDesc: ['未支付', '已支付', '已接单', '已发货', '已送达', '已完成', '已取消'],
      loading: false
    }
  },
  created () {
    this.getOutstandingOrders()
  },
  methods: {
    getOrders (value) {
      if (value === 1) {
        this.getOutstandingOrders()
      } else {
        this.getAllOrders(0, 15)
      }
    },
    getOutstandingOrders () {
      const param = {
        page: 0,
        pageSize: 100,
        status: decodeURIComponent([1, 2])
      }
      orderService.getShopOrdersByStatus(this.shopId, param).then((response) => {
        this.outstandingOrders = [...response.list]
      })
    },
    getAllOrders (page, pageSize) {
      this.loading = true
      const param = {page, pageSize, status: decodeURIComponent([0, 1, 2, 3, 4, 5, 6])}
      orderService.getShopOrdersByStatus(this.shopId, param).then((response) => {
        this.allOrders = [...response.list]
        this.loading = false
      })
    },
    onShowSizeChange (page, pageSize) {
      this.pageChange(1, pageSize)
      this.pagination.current = 1
      this.pagination.pageSize = pageSize
    },
    pageChange (page, pageSize) {
      this.getAllOrders(page - 1, pageSize)
    },
    updateOrder (orderId, status) {
      const param = {status: status}
      orderService.updateOrder(orderId, param).then((response) => {
        if (response === 1) {
          this.$message.success('Update Successfully!')
          this.getOutstandingOrders()
        }
        if (response.status === 'fail') {
          this.$message.error(response.data.errMsg)
          this.getOutstandingOrders()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
