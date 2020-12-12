<template>
  <a-table :columns="columns" :data-source="list" :row-key="record => record.id">
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
  </a-table>
</template>
<script>
import productService from '@/service/product'
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'imageUrl',
    dataIndex: 'imageUrl',
    key: 'imageUrl'
  },
  {
    title: 'price',
    key: 'price',
    dataIndex: 'price'
  },
  {
    title: 'stock',
    key: 'stock'
  },
  {
    title: 'sales',
    key: 'sales'
  }
]

export default {
  data () {
    return {
      list: [],
      columns
    }
  },
  mounted () {
    productService.getAll().then((response) => {
      this.list = response
    })
  }
}
</script>
