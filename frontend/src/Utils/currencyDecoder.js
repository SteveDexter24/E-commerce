// Paypal currency decoder
export const currencyDecoder = (currency) => {
  switch (currency) {
    case 'hkd':
      return 'HKD'
    case 'jpn':
      return 'JPY'
    default:
      return 'HKD'
  }
}

export const stripeCurrencyDecoder = (currency) => {
  switch (currency) {
    case 'hkd':
      return 'hkd'
    case 'jpn':
      return 'jpy'
    default:
      return 'hkd'
  }
}
