const { Product } = require("../models/products");

module.exports = {
    // list all product
    async listAllProductsAsync(req, res, next) {
        const { page, limit } = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        var queries = req.body;

        const { minPrice, maxPrice } = req.body;

        delete queries.minPrice;
        delete queries.maxPrice;

        if (minPrice !== undefined || maxPrice !== undefined) {
            queries.price = { $gte: minPrice, $lte: maxPrice };
        }

        Product.find(queries, (err, foundProducts) => {
            if (err) {
                res.send({
                    error: "error occurred while fetching products",
                });
            }
            if (foundProducts) {
                res.status(200).send(foundProducts.slice(startIndex, endIndex));
            } else {
                res.send({ error: "no products found" });
            }
        })
            .sort({ createdAt: -1 })
            .exec();
    },
    // get product by Id
    async getProductAsync(req, res, next) {
        const productId = req.params.id;
        Product.findById(productId, (err, foundProduct) => {
            if (err) {
                res.send({
                    error: `error found while looking for product with ID ${productId}`,
                });
            }
            if (foundProduct) {
                res.status(200).send(foundProduct);
            } else {
                res.send({
                    error: `Could not find product with Id: ${productId}`,
                });
            }
        });
    },
    // create a new product
    async createProductAsync(req, res, next) {
        const productObject = req.body;

        Product.create(productObject, (err, newProduct) => {
            if (err) {
                res.send({ error: "problem creating new product" });
            }

            if (newProduct) {
                res.status(201).send({
                    newProduct,
                    message: "successfully created product",
                });
            }
        });
    },
};
