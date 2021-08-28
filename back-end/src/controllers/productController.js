const { Product } = require('../models/products')

module.exports = {
  // list all product
  async listAllProductsAsync(req, res, next) {
    const { page, limit } = req.query

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    var queries = req.body

    const { minPrice, maxPrice } = req.body

    delete queries.minPrice
    delete queries.maxPrice

    if (minPrice !== undefined || maxPrice !== undefined) {
      queries.price = { $gte: minPrice, $lte: maxPrice }
    }

    Product.find(queries, (err, foundProducts) => {
      if (err) {
        res.send({
          message: 'error occurred while fetching products',
        })
      }
      if (foundProducts) {
        if (page && limit) {
          res.status(200).send(foundProducts.slice(startIndex, endIndex))
        } else {
          res.status(200).send(foundProducts)
        }
      } else {
        res.send({ message: 'no products found' })
      }
    })
      .sort({ createdAt: -1 })
      .exec()
  },
  // get product by Id
  async getProductAsync(req, res) {
    const productId = req.params.id

    try {
      const foundProduct = await Product.findById(productId)

      res.status(200).send(foundProduct)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
  // create a new product
  async createProductAsync(req, res) {
    const productObject = req.body

    try {
      await Product.create(productObject)
      res.status(201).send('Successfully created a new product')
    } catch (error) {
      console.log(error.message)
      res.status(400).send({ message: error.message })
    }
  },
  // update product
  async updateProductAsync(req, res, next) {
    const productId = req.params.id
    const propsToUpdate = Object.keys(req.body)
    try {
      const product = await Product.findById(productId)
      propsToUpdate.forEach((prop) => {
        product[prop] = req.body[prop]
      })
      await product.save()

      res.status(200).send('successfully updated product')
    } catch (error) {
      res.send({
        message: error.message,
      })
    }
  },
  async deleteProductAsync(req, res) {
    const productId = req.params.id
    try {
      const product = await Product.findById(productId)
      await product.remove()

      res.status(200).send({ message: 'Product removed' })
    } catch (err) {
      res.send({ message: err.message })
    }
  },
}
