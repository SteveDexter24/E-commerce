const pagination = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        let result = {};

        if (endIndex < (await model.countDocuments().exec())) {
            result.next = {
                page: page + 1,
                limit: limit,
            };
        }
        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit,
            };
        }
        try {
            result.results = await model.find().limit(limit).skip(startIndex);
            res.paginatedResult = result;
            next();
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    };
};

module.exports = pagination;
