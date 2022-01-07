/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const usersRouter = {
  path: '/company',
  component: Layout,
  redirect: '/company',
  name: '公司',
  meta: {
    title: '公司',
    icon: 'company'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/company/index'),
      name: 'Company',
      meta: { title: '公司' }
    }
  ]
}

export default usersRouter
