import axios from 'axios'

export const http = axios.create({
  timeout: 120000,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache'
  },
  baseURL: 'api'
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
