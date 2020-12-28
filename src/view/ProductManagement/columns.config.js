const columnSlots = ['id', 'sequence', 'name', 'status', 'createTime', 'updateTime', 'action']
const innerColumnSlots = ['inner-id', 'inner-name', 'inner-description', 'inner-image', 'inner-price', 'inner-stock',
  'inner-sales', 'inner-status', 'inner-createTime', 'inner-updateTime', 'inner-action']

const columns = [
  {title: 'Id', dataIndex: 'id', key: 'id', scopedSlots: {customRender: 'id'}},
  {title: 'Sequence', dataIndex: 'sequence', key: 'sequence', scopedSlots: {customRender: 'sequence'}},
  {title: 'Name', dataIndex: 'name', key: 'name', scopedSlots: {customRender: 'name'}},
  {title: 'Status', dataIndex: 'status', key: 'status', scopedSlots: {customRender: 'status'}},
  {title: 'Created Time', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'createTime'}},
  {title: 'Updated Time', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'updateTime'}},
  {title: 'Action', key: 'action', scopedSlots: {customRender: 'action'}}
]

const innerColumns = [
  {title: 'Id', dataIndex: 'id', key: 'id', scopedSlots: {customRender: 'inner-id'}},
  {title: 'Name', dataIndex: 'name', key: 'name', scopedSlots: {customRender: 'inner-name'}},
  {title: 'Description', dataIndex: 'description', key: 'description', scopedSlots: {customRender: 'inner-descirption'}},
  {title: 'Image', dataIndex: 'imageUrl', key: 'image', scopedSlots: {customRender: 'inner-image'}},
  {title: 'Price', dataIndex: 'price', key: 'price', scopedSlots: {customRender: 'inner-price'}},
  {title: 'Stock', dataIndex: 'stock', key: 'stock', scopedSlots: {customRender: 'inner-stock'}},
  {title: 'Sales', dataIndex: 'sales', key: 'sales', scopedSlots: {customRender: 'inner-sales'}},
  {title: 'Status', dataIndex: 'status', key: 'states', scopedSlots: {customRender: 'inner-status'}},
  {title: 'Created Time', dataIndex: 'createTime', key: 'createTime', scopedSlots: {customRender: 'inner-createTime'}},
  {title: 'Updated Time', dataIndex: 'updateTime', key: 'updateTime', scopedSlots: {customRender: 'inner-updateTime'}},
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
