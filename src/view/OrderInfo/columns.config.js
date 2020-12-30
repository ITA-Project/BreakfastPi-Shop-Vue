const columnSlots = ['orderNumber', 'status', 'amount', 'createTime', 'updateTime', 'action']
const innerColumnSlots = ['inner-name', 'inner-description', 'inner-price', 'inner-quantity']

const outstandingColumns = [
  {title: 'Order Number', width: '20%', ellipsis: 'true', dataIndex: 'orderNumber', key: 'orderNumber', scopedSlots: {customRender: 'orderNumber'}},
  {title: 'Status', width: '15%', ellipsis: 'true', dataIndex: 'status', key: 'status', scopedSlots: {customRender: 'status'}},
  {title: 'Amount', width: '15%', ellipsis: 'true', dataIndex: 'amount', key: 'amount', scopedSlots: {customRender: 'amount'}},
  {title: 'Created Time', width: '15%', ellipsis: 'true', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Updated Time', width: '15%', ellipsis: 'true', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Action', width: '15%', key: 'action', scopedSlots: {customRender: 'action'}}
]

const allColumns = [
  {title: 'Order Number', width: '20%', ellipsis: 'true', dataIndex: 'orderNumber', key: 'orderNumber', scopedSlots: {customRender: 'orderNumber'}},
  {title: 'Status', width: '10%', ellipsis: 'true', dataIndex: 'status', key: 'status', scopedSlots: {customRender: 'status'}},
  {title: 'Amount', width: '10%', ellipsis: 'true', dataIndex: 'amount', key: 'amount', scopedSlots: {customRender: 'amount'}},
  {title: 'Created Time', width: '15%', ellipsis: 'true', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Cancel Time', width: '15%', ellipsis: 'true', dataIndex: 'cancelTime', key: 'cancelTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Deliver Time', width: '15%', ellipsis: 'true', dataIndex: 'deliverTime', key: 'deliverTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Completed Time', width: '15%', ellipsis: 'true', dataIndex: 'completedTime', key: 'completedTime', scopedSlots: {customRender: 'dateTime'}}
]

const innerColumns = [
  {title: 'Name', width: '25%', ellipsis: 'true', dataIndex: 'product.name', key: 'name', scopedSlots: {customRender: 'inner-name'}},
  {title: 'Description', width: '25%', ellipsis: 'true', dataIndex: 'product.description', key: 'description', scopedSlots: {customRender: 'inner-descirption'}},
  {title: 'Price', width: '25%', ellipsis: 'true', dataIndex: 'product.price', key: 'price', scopedSlots: {customRender: 'inner-price'}},
  {title: 'Quantity', width: '25%', ellipsis: 'true', dataIndex: 'quantity', key: 'quantity', scopedSlots: {customRender: 'inner-quantity'}}
]

export default {
  name: 'columns',
  data () {
    return {
      outstandingColumns,
      allColumns,
      innerColumns,
      columnSlots,
      innerColumnSlots
    }
  }
}
