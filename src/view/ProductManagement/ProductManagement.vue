<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="categories"
      :row-key="record => record.id"
      :pagination="false"
      class="components-table-demo-nested">

      <template slot="status" slot-scope="text">
        <span v-if="text === 1">
          <a-badge status="success"/>Active
        </span>
        <span v-else>
          <a-badge status="default"/>Inactive
        </span>
      </template>

      <template slot="action" slot-scope="text, record, index">
        <a>Edit</a>
        <a>Delete</a>
      </template>

      <a-table
        slot="expandedRowRender"
        slot-scope="text"
        :columns="innerColumns"
        :data-source="text.products"
        :pagination="false"
        :row-key="record => record.id"
      >

        <template slot="inner-status" slot-scope="text">
          <span v-if="text === 1">
            <a-badge status="success"/>Active
          </span>
          <span v-else>
            <a-badge status="default"/>Inactive
          </span>
        </template>

        <template slot="inner-action" slot-scope="text" class="table-operation">
          <a>Edit</a>
          <a>Delete</a>
        </template>

      </a-table>
    </a-table>
  </div>
</template>

<script>

import columnsConfig from './columns.config'
import shopService from '../../service/shop'

export default {
  name: 'ProductManagement',
  mixins: [columnsConfig],
  data () {
    return {
      categories: []
    }
  },
  mounted () {
    const shopId = 1
    this.loadCategoriesAndProducts(shopId)
  },
  methods: {
    loadCategoriesAndProducts (shopId) {
      const self = this
      shopService.getShopDetailsByShopId(shopId).then(resp => {
        self.categories = resp.categories
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
