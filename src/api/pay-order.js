import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/admin/cmt/pay/order/search',
    method: 'post',
    data
  })
}
