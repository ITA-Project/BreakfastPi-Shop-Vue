import {
  get
} from '@/common/util/http.util'

const getShopDetailsByShopId = async (shopId) => {
  const url = `/shops/details/${shopId}`
  const result = await get(url)
  return result.data
}

export default {
  getShopDetailsByShopId
}
