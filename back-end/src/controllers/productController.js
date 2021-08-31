const { search } = require('../db/cloudinary')
const { Product } = require('../models/products')

module.exports = {
  // list all product
  async listAllProductsAsync(req, res) {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const searchArray = [
      { 'productName.en': { $regex: req.query.keyword, $options: 'i' } },
      { 'style.en': { $regex: req.query.keyword, $options: 'i' } },
      { 'category.en': { $regex: req.query.keyword, $options: 'i' } },
      { gender: { $regex: req.query.keyword, $options: 'i' } },
    ]

    try {
      const count = await Product.countDocuments({ $or: searchArray })
      const products = await Product.find({ $or: searchArray })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({
          createdAt: -1,
        })
        .select('-size -description -feature')

      res.status(200).send({
        products,
        page,
        pages: Math.ceil(count / pageSize),
      })
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
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

  async getMenProduct(req, res) {
    const {
      priceFrom,
      priceTo,
      sortBy,
      category,
      color,
      pageNumber,
    } = req.query

    // price_from >= price <= price_to
    const searchArr = [
      {
        $and: [
          { 'price.hkd': { $gte: priceFrom } },
          { 'price.hkd': { $lte: priceTo } },
          { 'category.en': { $regex: category, $options: 'i' } },
        ],
      },
      { $or: [{ gender: 'men' }] },
    ]

    try {
      const menProduct = await Product.find({ $and: searchArr }).sort({
        createdAt: -1,
      })
      res.status(200).send(menProduct)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
  async getWomenProduct(req, res) {
    try {
      const womenProduct = await Product.find({ gender: 'women' }).sort({
        createdAt: -1,
      })
      res.status(200).send(womenProduct)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
  async getKidsProduct(req, res) {
    try {
      const kidsProduct = await Product.find({
        'category.en': 'kids',
      }).sort({
        createdAt: -1,
      })
      res.status(200).send(kidsProduct)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
  async getNewArrivalsProduct(req, res) {
    try {
      const newArrivals = await Product.find({})
        .sort({ createdAt: -1 })
        .limit(3)
      res.status(200).send(newArrivals)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
}
