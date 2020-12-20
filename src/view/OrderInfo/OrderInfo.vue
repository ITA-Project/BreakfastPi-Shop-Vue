<template>
  <a-tabs default-active-key="2">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="apple" />
       Outstanding Orders
      </span>
      <a-table
        :columns="columns"
        :data-source="outstandingOrders"
        :row-key="record => record.id"
        :pagination="false"
        class="components-table-demo-nested">

        <template slot="status" slot-scope="text">
        <span v-if="text">
          <a-badge status="success"/>Active
        </span>
          <span v-else>
          <a-badge status="default"/>Inactive
        </span>
        </template>
        <template slot="amount" slot-scope="text">
        <span>
          {{'￥' + text}}
        </span>
        </template>
        <template slot="action" slot-scope="text, record, index">
          <a>接单</a>
          <a>取消</a>
          <a>完成</a>
        </template>
        <a-table
          slot="expandedRowRender"
          slot-scope="text"
          :columns="innerColumns"
          :data-source="text.orderItems"
          :pagination="false"
          :row-key="record => record.id"
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
        <a-icon type="android" />
       All Orders
      </span>
      Tab 2
    </a-tab-pane>
  </a-tabs>
</template>
<script>

import columnsConfig from './columns.config'

export default {
  name: 'OrderInfo',
  mixins: [columnsConfig],
  data () {
    return {
      shopId: 1,
      outstandingOrders: [{
        orderNumber: '70991033190685197',
        status: 1,
        amount: 17.5,
        orderItems: [{
          name: '包子',
          description: '酸菜肉包',
          price: 1.5,
          quantity: 5
        }, {
          name: '豆浆',
          description: '黑豆豆浆',
          price: 2,
          quantity: 3
        }, {
          name: '玉米',
          description: '玉米',
          price: 4,
          quantity: 1
        }]
      }, {
        orderNumber: '70991033190689197',
        status: 1,
        amount: 17.5,
        orderItems: [{
          name: '包子',
          description: '酸菜肉包',
          price: 1.5,
          quantity: 5
        }, {
          name: '豆浆',
          description: '黑豆豆浆',
          price: 2,
          quantity: 3
        }, {
          name: '玉米',
          description: '玉米',
          price: 4,
          quantity: 1
        }]
      }]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
