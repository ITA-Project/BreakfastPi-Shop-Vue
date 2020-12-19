const columnSlots = ['sequence', 'name', 'status', 'createTime', 'updateTime', 'action']
const innerColumnSlots = ['inner-name', 'inner-description', 'inner-image', 'inner-price', 'inner-stock',
  'inner-sales', 'inner-status', 'inner-createTime', 'inner-updateTime', 'inner-action']

const columns = [
  {title: 'Sequence', dataIndex: 'sequence', key: 'sequence', scopedSlots: {customRender: 'sequence'}},
  {title: 'Name', dataIndex: 'name', key: 'name', scopedSlots: {customRender: 'name'}},
  {title: 'Status', dataIndex: 'status', key: 'status', scopedSlots: {customRender: 'status'}},
  {title: 'Created Time', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'createTime'}},
  {title: 'Updated Time', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'updateTime'}},
  {title: 'Action', key: 'action', scopedSlots: {customRender: 'action'}}
]

const innerColumns = [
  {title: 'Name', dataIndex: 'name', key: 'name', scopedSlots: {customRender: 'inner-name'}},
  {title: 'Description', dataIndex: 'description', key: 'description', scopedSlots: {customRender: 'inner-descirption'}},
  {title: 'Image', dataIndex: 'image', key: 'image', scopedSlots: {customRender: 'inner-image'}},
  {title: 'Price', dataIndex: 'price', key: 'price', scopedSlots: {customRender: 'inner-price'}},
  {title: 'Stock', dataIndex: 'stock', key: 'stock', scopedSlots: {customRender: 'inner-stock'}},
  {title: 'Sales', dataIndex: 'sales', key: 'sales', scopedSlots: {customRender: 'inner-sales'}},
  {title: 'Status', dataIndex: 'status', key: 'states', scopedSlots: {customRender: 'inner-status'}},
  {title: 'Created Time', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'inner-createTime'}},
  {title: 'Updated Time', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'inner-updateTime'}},
  {title: 'Action', key: 'action', scopedSlots: {customRender: 'inner-action'}
  }
]

const data = [
  {
    id: 1,
    sequence: 1,
    name: 'Screem',
    status: 1,
    createTime: '2014-12-24 23:12:00',
    updateTime: '2014-12-24 23:12:00',
    products: [
      {
        id: 1,
        name: 'name' + 1,
        description: 'description' + 1,
        image: 'image' + 1,
        price: 'price' + 1,
        stock: 'stock' + 1,
        sales: 'sales' + 1,
        status: 1,
        createTime: '2014-12-24 23:12:00',
        updateTime: '2020-12-24 23:12:00'
      },
      {
        id: 2,
        name: 'name' + 2,
        description: 'description' + 2,
        image: 'image' + 2,
        price: 'price' + 2,
        stock: 'stock' + 2,
        sales: 'sales' + 2,
        status: 1,
        createTime: '2014-12-24 23:12:00',
        updateTime: '2020-12-24 23:12:00'
      },
      {
        id: 3,
        name: 'name' + 3,
        description: 'description' + 3,
        image: 'image' + 3,
        price: 'price' + 3,
        stock: 'stock' + 3,
        sales: 'sales' + 3,
        status: 1,
        createTime: '2014-12-24 23:12:00',
        updateTime: '2020-12-24 23:12:00'
      }
    ]
  },
  {
    id: 2,
    sequence: 2,
    name: 'Screem',
    status: 1,
    createTime: '2014-12-24 23:12:00',
    updateTime: '2014-12-24 23:12:00',
    products: [
      {
        id: 4,
        name: 'name' + 4,
        description: 'description' + 4,
        image: 'image' + 4,
        price: 'price' + 4,
        stock: 'stock' + 4,
        sales: 'sales' + 4,
        status: 1,
        createTime: '2014-12-24 23:12:00',
        updateTime: '2020-12-24 23:12:00'
      },
      {
        id: 5,
        name: 'name' + 5,
        description: 'description' + 5,
        image: 'image' + 5,
        price: 'price' + 5,
        stock: 'stock' + 5,
        sales: 'sales' + 5,
        status: 0,
        createTime: '2014-12-24 23:12:00',
        updateTime: '2020-12-24 23:12:00'
      }
    ]
  },
  {
    id: 3,
    sequence: 3,
    name: 'Screem',
    status: 0,
    createTime: '2014-12-24 23:12:00',
    updateTime: '2014-12-24 23:12:00',
    products: [
      {
        id: 6,
        name: 'name' + 6,
        description: 'description' + 6,
        image: 'image' + 6,
        price: 'price' + 6,
        stock: 'stock' + 6,
        sales: 'sales' + 6,
        status: 0,
        createTime: '2014-12-24 23:12:00',
        updateTime: '2020-12-24 23:12:00'
      }
    ]
  }
]

export default {
  name: 'columns',
  data () {
    return {
      data,
      columns,
      innerColumns,
      columnSlots,
      innerColumnSlots
    }
  }
}
