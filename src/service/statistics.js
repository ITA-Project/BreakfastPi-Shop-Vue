import {
  get
} from '@/common/util/http.util'

const getStatisticsData = async (shopId, param) => {
  const url = `/chart/${shopId}`
  const result = await get(url, param)
  return result.data
}

export default {
  getStatisticsData
}
