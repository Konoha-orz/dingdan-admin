import request from '@/utils/request'

// 用户列表
export function fetchList(data) {
  return request({
    url: '/admin/customer/search',
    method: 'post',
    data
  })
}
