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
  }
}
