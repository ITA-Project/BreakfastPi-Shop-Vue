import {
  post, del
} from '@/common/util/http.util'

const createByShopId = async (shopId, obj) => {
  const url = `/categories/${shopId}`
  const param = obj
  const result = await post(url, param)
  return result.data
}

const deleteById = async (categoryId) => {
  const url = `/categories/${categoryId}`
  const result = await del(url)
  return result.data
}

export default {
  createByShopId,
  deleteById
}
