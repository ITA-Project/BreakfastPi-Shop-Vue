import {
  get, post, put, del
} from '@/common/util/http.util'

const getAll = async () => {
  const getAllUrl = '/product'
  const result = await get(getAllUrl)
  return result.data
}

const create = async (param) => {
  const url = '/product'
  const result = await post(url, param)
  return result.data
}

const update = async (param) => {
  const url = '/product'
  const result = await put(url, param)
  return result.data
}

const deleteById = async (productId) => {
  const url = `/product/${productId}`
  const result = await del(url)
  return result
}

const uploadAttachment = async (params) => {
  const result = await post('/image', params)
  return result.data
}

const checkImage = async (params) => {
  const result = await post('/image/check', params)
  return result.data
}

export default {
  getAll,
  create,
  update,
  deleteById,
  uploadAttachment,
  checkImage
}
