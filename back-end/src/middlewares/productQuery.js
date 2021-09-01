const productQuery = (req, res, next) => {
  // TODO: return a search array
  const { priceFrom, priceTo, sortBy, category, color, gender } = req.query
  console.log(req.query.gender)
  let sortArr = []

  if (sortBy === 'descending') {
    sortArr.push(['price.hkd', -1])
  } else if (sortBy === 'ascending') {
    sortArr.push(['price.hkd', 1])
  } else {
    sortArr.push(['createdAt', -1])
  }

  const searchArr = [
    {
      $and: [
        { 'price.hkd': { $gte: Number(priceFrom) } },
        { 'price.hkd': { $lte: Number(priceTo) } },
        {
          'category.en': {
            $regex: category === 'all' ? '' : category,
            $options: 'i',
          },
        },
        { colors: { $regex: color === 'all' ? '' : color, $options: 'i' } },
      ],
    },
    { $or: [{ gender: gender }] },
  ]

  req.query.searchArr = searchArr
  req.query.sortArr = sortArr
  next()
}

module.exports = productQuery
