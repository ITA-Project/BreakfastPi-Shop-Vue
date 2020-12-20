import {
  get
} from '@/common/util/http.util'

const getAll = async () => {
  const getAllUrl = '/product'
  const result = await get(getAllUrl)
  return result.data
}

export default {
  getAll
}