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
  sizeArr,
) => {
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
    size: sizeArr,
  }
}

export const size = (sizeType, colorHex, colorObj, count) => {
  return {
    sizeType: sizeType,
    colors: [
      {
        colorHex: colorHex,
        color: colorObj,
        count: count,
        image: colors,
      },
    ],
  }
}
