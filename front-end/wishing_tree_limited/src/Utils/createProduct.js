export const productObject = (
  nameObj,
  categoryObj,
  gender,
  images,
  featureObj,
  descriptionObj,
  styleObj,
  priceObj,
  material,
  washing_care,
  discount,
  sizes,
) => {
  let colors = []

  for (let i = 0; i < sizes.length; i++) {
    for (let j = 0; j < sizes[i].colors.length; j++) {
      if (!colors.includes(sizes[i].colors[j].color.en)) {
        colors.push(sizes[i].colors[j].color.en)
      }
    }
  }

  discount.hkd = Number(discount.hkd)
  discount.jpn = Number(discount.jpn)
  return {
    productName: nameObj,
    category: categoryObj,
    gender: gender,
    image: images,
    feature: featureObj,
    description: descriptionObj,
    style: styleObj,
    price: priceObj,
    material: material,
    washing_care: washing_care,
    discount: discount,
    size: sizes,
    colors: colors,
  }
}
