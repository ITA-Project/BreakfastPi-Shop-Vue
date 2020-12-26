import {
  get, put
} from '@/common/util/http.util'

const getShopOrdersByStatus = async (shopId, param) => {
  const url = `/orders/shops/${shopId}`
  const result = await get(url, param)
  return result.data
}

const updateOrder = async (orderId, order) => {
  const url = `/orders/status/${orderId}`
  const result = await put(url, order)
  return result.data
}

export default {
  getShopOrdersByStatus,
  updateOrder
}
