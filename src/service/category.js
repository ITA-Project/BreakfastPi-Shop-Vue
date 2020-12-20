import {
  post, del, put
} from '@/common/util/http.util'

const createByShopId = async (shopId, obj) => {
  const url = `/categories/${shopId}`
  const param = obj
  const result = await post(url, param)
  return result.data
}

const update = async (obj) => {
  const url = 'categories'
  const param = obj
  const result = await put(url, param)
  return result.data
}

const deleteById = async (categoryId) => {
  const url = `/categories/${categoryId}`
  const result = await del(url)
  return result.data
}

export default {
  createByShopId,
  update,
  deleteById
}
