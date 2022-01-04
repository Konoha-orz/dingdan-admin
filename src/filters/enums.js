export function enumTranslate(enumVal, enumType) {
  if (!ENUMS[enumType][enumVal]) {
    return 'UNKNOWN'
  }

  return ENUMS[enumType][enumVal].name
}

const ENUMS = {
  // 销售订单状态
  SaleOrderState: {
    TO_BE_SUBMITTED: {
      code: 'TO_BE_SUBMITTED',
      name: '待提交'
    },
    TO_BE_ACCEPTED: {
      code: 'TO_BE_ACCEPTED',
      name: '待接单'
    },
    AUDITING: {
      code: 'AUDITING',
      name: '审核中'
    },
    AUDIT_REJECTED: {
      code: 'AUDIT_REJECTED	',
      name: '审核驳回'
    },
    PRODUCTION: {
      code: 'PRODUCTION',
      name: '生产中'
    },
    CANCELED: {
      code: 'CANCELED',
      name: '已取消'
    },
    COMPLETED: {
      code: 'COMPLETED		',
      name: '已完成'
    },
    AUDIT_PASSED: {
      code: 'AUDIT_PASSED',
      name: '审核通过'
    },
    ORDER_REJECTED: {
      code: 'ORDER_REJECTED',
      name: '外发单拒单'
    }
  },
  // 销售订单行状态
  SaleOrderEntryState: {
    TO_BE_ALLOCATED: {
      code: 'TO_BE_ALLOCATED',
      name: '待分配'
    },
    TO_BE_PRODUCED: {
      code: 'TO_BE_PRODUCED',
      name: '待生产'
    },
    PRODUCING: {
      code: 'PRODUCING',
      name: '生产中'
    },
    TO_BE_DELIVERED: {
      code: 'TO_BE_DELIVERED',
      name: '待出库'
    },
    TO_BE_RECONCILED: {
      code: 'TO_BE_RECONCILED',
      name: '待对账'
    },
    COMPLETED: {
      code: 'COMPLETED',
      name: '已完成'
    },
    CANCELED: {
      code: 'CANCELED		',
      name: '已取消'
    }
  }
}
