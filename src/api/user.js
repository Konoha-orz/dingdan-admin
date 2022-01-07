import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/current/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// 获取OSS签名
export function getOssSignature() {
  return request({
    url: '/admin/oss/sign',
    method: 'get'
  })
}

// 用户列表
export function fetchList(data) {
  return request({
    url: '/admin/user/search',
    method: 'post',
    data
  })
}
