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
          error: 'error occurred while fetching products',
        })
      }
      if (foundProducts) {
        if (page && limit) {
          res.status(200).send(foundProducts.slice(startIndex, endIndex))
        } else {
          res.status(200).send(foundProducts)
        }
      } else {
        res.send({ error: 'no products found' })
      }
    })
      .sort({ createdAt: -1 })
      .exec()
  },
  // get product by Id
  async getProductAsync(req, res, next) {
    const productId = req.params.id
    Product.findById(productId, (err, foundProduct) => {
      if (err) {
        res.send({
          error: `error found while looking for product with ID ${productId}`,
        })
      }
      if (foundProduct) {
        res.status(200).send(foundProduct)
      }
    })
  },
  // create a new product
  async createProductAsync(req, res, next) {
    const productObject = req.body

    Product.create(productObject, (err, newProduct) => {
      if (err) {
        res.send({
          error: err.message,
          message: 'problem creating new product',
        })
      }

      if (newProduct) {
        res.status(201).send({
          newProduct,
          message: 'successfully created product',
        })
      }
    })
  },
  async updateProductAsync(req, res, next) {
    const productId = req.params.id
    const propsToUpdate = Object.keys(req.body)
    try {
      const product = await Product.findById(productId)
      propsToUpdate.forEach((prop) => {
        product[prop] = req.body[prop]
      })
      const updatedProduct = await product.save()
      if (updatedProduct) {
        res.send({
          updated_product: updatedProduct,
          message: 'successfully updated product',
        })
      } else {
        res.send({ message: 'failed to update product' })
      }
    } catch (err) {
      res.send({
        error: err.message,
        message: 'failed to update product',
      })
    }
  },
}
