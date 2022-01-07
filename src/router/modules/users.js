/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users',
  name: '用户管理',
  meta: {
    title: '用户管理',
    icon: 'peoples'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/users/index'),
      name: 'Users',
      meta: { title: '用户' }
    }
  ]
}

export default usersRouter
