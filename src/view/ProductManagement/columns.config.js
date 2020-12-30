const columnSlots = ['sequence', 'name', 'status', 'createTime', 'updateTime', 'action']
const innerColumnSlots = ['inner-name', 'inner-description', 'inner-image', 'inner-price', 'inner-stock',
  'inner-sales', 'inner-status', 'inner-createTime', 'inner-updateTime', 'inner-action']

const columns = [
  {title: 'Sequence', dataIndex: 'sequence', key: 'sequence', scopedSlots: {customRender: 'sequence'}},
  {title: 'Name', dataIndex: 'name', key: 'name', scopedSlots: {customRender: 'name'}},
  {title: 'Status', dataIndex: 'status', key: 'status', scopedSlots: {customRender: 'status'}},
  {title: 'Created Time', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Updated Time', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Action', key: 'action', scopedSlots: {customRender: 'action'}}
]

const innerColumns = [
  {title: 'Name', dataIndex: 'name', key: 'name', scopedSlots: {customRender: 'inner-name'}},
  {title: 'Description', dataIndex: 'description', key: 'description', scopedSlots: {customRender: 'inner-descirption'}},
  {title: 'Price', dataIndex: 'price', key: 'price', scopedSlots: {customRender: 'inner-price'}},
  {title: 'Stock', dataIndex: 'stock', key: 'stock', scopedSlots: {customRender: 'inner-stock'}},
  {title: 'Sales', dataIndex: 'sales', key: 'sales', scopedSlots: {customRender: 'inner-sales'}},
  {title: 'Status', dataIndex: 'status', key: 'states', scopedSlots: {customRender: 'inner-status'}},
  {title: 'Created Time', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Updated Time', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Action', key: 'action', scopedSlots: {customRender: 'inner-action'}
  }
]

export default {
  name: 'columns',
  data () {
    return {
      columns,
      innerColumns,
      columnSlots,
      innerColumnSlots
    }
  }
}
