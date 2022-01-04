/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dictionaryRouter = {
  path: '/dictionary',
  component: Layout,
  redirect: '/dictionary/all',
  name: '数据字典',
  meta: {
    title: '数据字典',
    icon: 'dictionary'
  },
  children: [
    {
      path: 'all',
      component: () => import('@/views/dictionary/all/index'),
      name: 'DictionaryAll',
      meta: { title: '全部' }
    },
    {
      path: 'region',
      component: () => import('@/views/dictionary/region/index'),
      name: 'RegionAll',
      meta: { title: '地区' }},
    {
      path: 'category',
      component: () => import('@/views/dictionary/category/index'),
      name: 'CategoryAll',
      meta: { title: '分类' }},
    {
      path: 'size',
      component: () => import('@/views/dictionary/size/index'),
      name: 'SizeAll',
      meta: { title: '尺码' }},
    {
      path: 'color',
      component: () => import('@/views/dictionary/color/index'),
      name: 'ColorAll',
      meta: { title: '颜色' }}
  ]
}

export default dictionaryRouter
