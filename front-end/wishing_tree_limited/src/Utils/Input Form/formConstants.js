export const formItems = (itemName) => {
  return [
    {
      title: 'English',
      placeholder: `${itemName} in English`,
      key: 'en',
    },
    {
      title: 'Chinese',
      placeholder: `${itemName} in Chinese`,
      key: 'cn',
    },
    {
      title: 'Japanese',
      placeholder: `${itemName} in Japanese`,
      key: 'jpn',
    },
  ]
}

export const priceItems = (discount) => {
  return [
    {
      title: 'Hong Kong Dollars $',
      placeholder: `${
        discount ? 'Discounted price' : 'Price'
      } in Hong Kong Dollars`,
      key: 'hkd',
    },
    {
      title: 'Japanese Yen ¥',
      placeholder: `${discount ? 'Discounted price' : 'Price'} in Japanese Yen`,
      key: 'jpn',
    },
  ]
}

export const colorItems = () => {
  return [
    {
      placeholder: 'english',
      key: 'en',
    },
    {
      placeholder: 'chinese',
      key: 'cn',
    },
    {
      placeholder: 'japanese',
      key: 'jpn',
    },
  ]
}
