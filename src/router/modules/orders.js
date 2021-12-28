/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const ordersRouter = {
  path: '/orders',
  component: Layout,
  redirect: '/orders/sale-production-order',
  name: '订单管理',
  meta: {
    title: '订单管理',
    icon: 'table'
  },
  children: [
    {
      path: 'sale-production-order',
      component: () => import('@/views/orders/sale-production-order/index'),
      name: 'SaleProductionOrder',
      meta: { title: '订单' }
    }
  ]
}

export default ordersRouter
