export function enumTranslate(enumVal, enumType) {
  if (!ENUMS[enumType][enumVal]) {
    return ''
  }

  return ENUMS[enumType][enumVal].name
}

export const ENUMS = {
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
  },
  // 支付单状态
  PayOrderState: {
    WAIT_TO_PAY: {
      code: 'WAIT_TO_PAY',
      name: '待付款'
    },
    PAYING: {
      code: 'PAYING',
      name: '付款中'
    },
    PAID_PART: {
      code: 'PAID_PART',
      name: '部分付款'
    },
    PAID: {
      code: 'PAID',
      name: '已付款'
    },
    PAY_FAIL: {
      code: 'PAY_FAIL',
      name: '支付失败'
    },
    REFUNDING: {
      code: 'REFUNDING',
      name: '退款中'
    },
    REFUNDED: {
      code: 'REFUNDED		',
      name: '已退款'
    }
  },
  // 支付类型
  PayType: {
    E_BANK: {
      code: 'E_BANK',
      name: '网银'
    },
    CASH: {
      code: 'CASH',
      name: '现金'
    },
    ACCEPTANCE: {
      code: 'ACCEPTANCE',
      name: '承兑'
    },
    ALIPAY: {
      code: 'ALIPAY',
      name: '支付宝'
    },
    WECHAT_PAY: {
      code: 'WECHAT_PAY',
      name: '微信支付'
    },
    WECHAT_PAY_NATIVE: {
      code: 'WECHAT_PAY_NATIVE',
      name: '微信二维码支付'
    },
    WECHAT_PAY_APP: {
      code: 'WECHAT_PAY_APP		',
      name: '微信APP支付'
    },
    WECHAT_PAY_QRCODE: {
      code: 'WECHAT_PAY_QRCODE',
      name: '微信二维码支付'
    },
    WECHAT_PAY_MP: {
      code: 'WECHAT_PAY_MP		',
      name: '微信内部支付'
    }
  }
}

export function getEnumValues(type) {
  if (!ENUMS[type]) {
    return null
  }

  const values = []
  Object.values(ENUMS[type]).forEach((value, key) => {
    values.push(value)
  })
  return values
}
