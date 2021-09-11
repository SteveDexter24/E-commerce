export const SearchAllColors = (product) => {
  let colorHexArr = []
  let colorObjArr = []
  for (let i = 0; i < product.size.length; i++) {
    for (let j = 0; j < product.size[i].colors.length; j++) {
      if (!colorHexArr.includes(product.size[i].colors[j].colorHex)) {
        colorHexArr.push(product.size[i].colors[j].colorHex)
        colorObjArr.push(product.size[i].colors[j].color)
      }
    }
  }

  return { colorHexArr, colorObjArr }
}
