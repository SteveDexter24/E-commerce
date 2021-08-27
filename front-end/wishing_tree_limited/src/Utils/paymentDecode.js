export const paymentDecode = (payment) => {
  switch (payment) {
    case 'Apple Pay':
      return 'Apple Pay'
    case 'Google Pay':
      return 'Google Pay'
    case 'Alipay':
      return 'alipay'
    case 'Credit Card':
      return 'card'
    case 'WeChat Pay':
      return 'wechat_pay'
    case 'bank transfer':
      return 'eps'
    default:
      return 'card'
  }
}
