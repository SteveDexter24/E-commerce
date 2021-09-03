const productQuery = (req, res, next) => {
    // TODO: return a search array
    const {
        priceFrom,
        priceTo,
        sortBy,
        category,
        color,
        gender,
        discount,
        currency,
    } = req.query;
    console.log(req.query.discount);
    let sortArr = [];
    let OrArr = discount
        ? [{ "discount.hkd": { $gt: 0 } }]
        : [{ gender: gender }];

    if (sortBy === "descending") {
        sortArr.push(["price.hkd", -1]);
    } else if (sortBy === "ascending") {
        sortArr.push(["price.hkd", 1]);
    } else {
        sortArr.push(["createdAt", -1]);
    }

    let searchArr;

    if (currency === "hkd") {
        OrArr.push();
        searchArr = [
            {
                $and: [
                    { "price.hkd": { $gte: Number(priceFrom) } },
                    { "price.hkd": { $lte: Number(priceTo) } },
                    {
                        $or: [
                            { "discount.hkd": { $gte: Number(priceFrom) } },
                            { "discount.hkd": { $lte: Number(priceTo) } },
                        ],
                    },
                    {
                        "category.en": {
                            $regex: category === "all" ? "" : category,
                            $options: "i",
                        },
                    },
                    {
                        colors: {
                            $regex: color === "all" ? "" : color,
                            $options: "i",
                        },
                    },
                ],
            },
            { $or: OrArr },
        ];
    } else {
        searchArr = [
            {
                $and: [
                    { "price.jpn": { $gte: Number(priceFrom) } },
                    { "price.jpn": { $lte: Number(priceTo) } },
                    {
                        $or: [
                            { "discount.jpn": { $gte: Number(priceFrom) } },
                            { "discount.jpn": { $lte: Number(priceTo) } },
                        ],
                    },
                    {
                        "category.en": {
                            $regex: category === "all" ? "" : category,
                            $options: "i",
                        },
                    },
                    {
                        colors: {
                            $regex: color === "all" ? "" : color,
                            $options: "i",
                        },
                    },
                ],
            },
            { $or: OrArr },
        ];
    }

    req.query.searchArr = searchArr;
    req.query.sortArr = sortArr;
    next();
};

const productsYouMayLike = (req, res, next) => {
    const { price, gender, currency, id } = req.query;

    let searchArr;

    if (currency === "hkd") {
        searchArr = [
            {
                $and: [
                    { "price.hkd": { $gte: Number(price - 400) } },
                    { "price.hkd": { $lte: Number(price + 400) } },
                    { _id: { $ne: id } },
                ],
            },
            { $or: [{ gender: gender }] },
        ];
    } else {
        searchArr = [
            {
                $and: [
                    { "price.jpn": { $gte: Number(price - 400) } },
                    { "price.jpn": { $lte: Number(price + 400) } },
                    { _id: { $ne: id } },
                ],
            },
            { $or: [{ gender: gender }] },
        ];
    }

    req.query.searchArr = searchArr;

    next();
};

module.exports = { productQuery, productsYouMayLike };
