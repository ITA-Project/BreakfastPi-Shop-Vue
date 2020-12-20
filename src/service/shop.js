import {
  get, put
} from '@/common/util/http.util'

const getShopDetailsByShopId = async (shopId) => {
  const url = `/shops/details/${shopId}`
  const result = await get(url)
  return result.data
}

const getShopById = async (id) => {
  const url = `/shops/${id}`
  const result = await get(url)
  return result.data
}

const updateShopInfo = async (param) => {
  const url = `/shops`
  const result = await put(url, param)
  return result.data
}

export default {
  getShopDetailsByShopId,
  getShopById,
  updateShopInfo
}
