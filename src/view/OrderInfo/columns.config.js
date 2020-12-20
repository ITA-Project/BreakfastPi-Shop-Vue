const columnSlots = ['orderNumber', 'status', 'amount', 'createTime', 'updateTime', 'action']
const innerColumnSlots = ['inner-name', 'inner-description', 'inner-price', 'inner-quantity']

const columns = [
  {title: 'Order Number', dataIndex: 'orderNumber', key: 'orderNumber', scopedSlots: {customRender: 'orderNumber'}},
  {title: 'Status', dataIndex: 'status', key: 'status', scopedSlots: {customRender: 'status'}},
  {title: 'Amount', dataIndex: 'amount', key: 'amount', scopedSlots: {customRender: 'amount'}},
  {title: 'Created Time', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'createTime'}},
  {title: 'Updated Time', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'updateTime'}},
  {title: 'Action', key: 'action', scopedSlots: {customRender: 'action'}}
]

const innerColumns = [
  {title: 'Name', dataIndex: 'name', key: 'name', scopedSlots: {customRender: 'inner-name'}},
  {title: 'Description', dataIndex: 'description', key: 'description', scopedSlots: {customRender: 'inner-descirption'}},
  {title: 'Price', dataIndex: 'price', key: 'price', scopedSlots: {customRender: 'inner-price'}},
  {title: 'Quantity', dataIndex: 'quantity', key: 'quantity', scopedSlots: {customRender: 'inner-quantity'}}
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
