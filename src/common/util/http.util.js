import axios from 'axios'
import router from '@/router'

export const http = axios.create({
  timeout: 120000,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache'
  },
  baseURL: 'api'
})

http.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

http.interceptors.response.use(response => {
  const error = response.data.data
  if (error && error.errCode === 40001) {
    router.push({name: 'login'})
  }
  return response
})

export const get = async (url, params) => http.get(url, {
  params: {
    ...params
  }
})

export const post = async (url, params) => http.request({
  url,
  method: 'POST',
  data: params
})

export const del = async (url, params) => http.delete(url, {
  params: {
    ...params
  }
})

export const put = async (url, data) => http.request({
  url,
  method: 'PUT',
  data
})

export const patch = async (url, params) => http.request({
  url,
  method: 'PATCH',
  params: {
    ...params
  }
})

export const download = async (url, params) => http.get(url, {
  responseType: 'blob',
  params: {
    ...params
  }
})

export const upload = async (url, params) => http.request({
  url,
  method: 'POST',
  data: params,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
