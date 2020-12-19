<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :row-key="record => record.id"
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

export default {
  name: 'ProductManagement',
  mixins: [columnsConfig],
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
