const columnSlots = ['sequence', 'name', 'status', 'createTime', 'updateTime', 'action']
const innerColumnSlots = ['inner-name', 'inner-description', 'inner-image', 'inner-price', 'inner-stock',
  'inner-sales', 'inner-status', 'inner-createTime', 'inner-updateTime', 'inner-action']

const columns = [
  {title: 'Sequence', width: '10%', dataIndex: 'sequence', key: 'sequence', scopedSlots: {customRender: 'sequence'}},
  {title: 'Name', width: '20%', ellipsis: 'true', dataIndex: 'name', key: 'name', scopedSlots: {customRender: 'name'}},
  {title: 'Status', width: '10%', ellipsis: 'true', dataIndex: 'status', key: 'status', scopedSlots: {customRender: 'status'}},
  {title: 'Created Time', width: '20%', ellipsis: 'true', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Updated Time', width: '20%', ellipsis: 'true', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Action', width: '20%', key: 'action', scopedSlots: {customRender: 'action'}}
]

const innerColumns = [
  {title: 'Name', width: '10%', ellipsis: 'true', dataIndex: 'name', key: 'name', scopedSlots: {customRender: 'inner-name'}},
  {title: 'Description', width: '20%', ellipsis: 'true', dataIndex: 'description', key: 'description', scopedSlots: {customRender: 'inner-descirption'}},
  {title: 'Price', width: '7%', ellipsis: 'true', dataIndex: 'price', key: 'price', scopedSlots: {customRender: 'inner-price'}},
  {title: 'Stock', width: '7%', ellipsis: 'true', dataIndex: 'stock', key: 'stock', scopedSlots: {customRender: 'inner-stock'}},
  {title: 'Sales', width: '7%', ellipsis: 'true', dataIndex: 'sales', key: 'sales', scopedSlots: {customRender: 'inner-sales'}},
  {title: 'Status', width: '9%', ellipsis: 'true', dataIndex: 'status', key: 'states', scopedSlots: {customRender: 'inner-status'}},
  {title: 'Created Time', width: '15%', ellipsis: 'true', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Updated Time', width: '15%', ellipsis: 'true', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Action', width: '10%', key: 'action', scopedSlots: {customRender: 'inner-action'}
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
