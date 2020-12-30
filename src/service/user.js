import {
  post
} from '@/common/util/http.util'

const login = async (param) => {
  const url = `/users/normal-login`
  const result = await post(url, param)
  return result
}

export default {
  login
}
