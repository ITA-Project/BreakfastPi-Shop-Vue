const columnSlots = ['orderNumber', 'status', 'amount', 'createTime', 'updateTime', 'action']
const innerColumnSlots = ['inner-name', 'inner-description', 'inner-price', 'inner-quantity']

const outstandingColumns = [
  {title: 'Order Number', dataIndex: 'orderNumber', key: 'orderNumber', scopedSlots: {customRender: 'orderNumber'}},
  {title: 'Status', dataIndex: 'status', key: 'status', scopedSlots: {customRender: 'status'}},
  {title: 'Amount', dataIndex: 'amount', key: 'amount', scopedSlots: {customRender: 'amount'}},
  {title: 'Created Time', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Updated Time', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Action', key: 'action', scopedSlots: {customRender: 'action'}}
]

const allColumns = [
  {title: 'Order Number', dataIndex: 'orderNumber', key: 'orderNumber', scopedSlots: {customRender: 'orderNumber'}},
  {title: 'Status', dataIndex: 'status', key: 'status', scopedSlots: {customRender: 'status'}},
  {title: 'Amount', dataIndex: 'amount', key: 'amount', scopedSlots: {customRender: 'amount'}},
  {title: 'Created Time', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Cancel Time', dataIndex: 'cancelTime', key: 'cancelTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Deliver Time', dataIndex: 'deliverTime', key: 'deliverTime', scopedSlots: {customRender: 'dateTime'}},
  {title: 'Completed Time', dataIndex: 'completedTime', key: 'completedTime', scopedSlots: {customRender: 'dateTime'}}
]

const innerColumns = [
  {title: 'Name', dataIndex: 'product.name', key: 'name', scopedSlots: {customRender: 'inner-name'}},
  {title: 'Description', dataIndex: 'product.description', key: 'description', scopedSlots: {customRender: 'inner-descirption'}},
  {title: 'Price', dataIndex: 'product.price', key: 'price', scopedSlots: {customRender: 'inner-price'}},
  {title: 'Quantity', dataIndex: 'quantity', key: 'quantity', scopedSlots: {customRender: 'inner-quantity'}}
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
