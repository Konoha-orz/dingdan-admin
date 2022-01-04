import request from '@/utils/request'

// 获取根节点
export function fetchRoot(params) {
  return request({
    url: '/admin/root/dict',
    method: 'get',
    params
  })
}

// 根据父节点获取子节点
export function fetchByParentCode(code, params) {
  return request({
    url: `/admin/get/all/by/parentCode/${code}`,
    method: 'get',
    params
  })
}

// 添加/修改数据字典节点
export function save(data) {
  return request({
    url: '/admin/save/dict',
    method: 'post',
    data
  })
}

// 删除数据字典节点
export function remove(id, deleted) {
  return request({
    url: `/admin/update/dict/delete/state/${id}/${deleted}`,
    method: 'put'
  })
}

// 地区-获取所有子节点
export function fetchRegionChildren(code) {
  return request({
    url: `/admin/region/children/${code}`,
    method: 'get'
  })
}

// 分类-获取根节点
export function fetchCategoryRoot(params) {
  return request({
    url: '/admin/category/root/node',
    method: 'get',
    params
  })
}

// 分类-获取所有子节点
export function fetchCategoryChildren(code, params) {
  return request({
    url: `/admin/category/child/node/${code}`,
    method: 'get',
    params
  })
}

// 分类-添加/修改节点
export function saveCategory(data) {
  return request({
    url: '/admin/category/save',
    method: 'post',
    data
  })
}

// 分类-删除节点
export function removeCategory(code, deleted) {
  return request({
    url: `/admin/category/update/delete/state/${code}/${deleted}`,
    method: 'put'
  })
}

