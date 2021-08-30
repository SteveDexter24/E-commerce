const cloudinary = require("../db/cloudinary");

const uploadImageMiddleware = async (req, res, next) => {
    // the array of image from the frontend
    // let fileArr = [];
    // let isEditProduct = false;
    // if (req.body.newImage) {
    //     fileArr = req.body.newImage;
    //     isEditProduct = true;
    // } else {
    //     fileArr = req.body.image;
    // }

    let fileArr = req.body.image;

    var images = [];
    try {
        for (let i = 0; i < fileArr.length; i++) {
            const uploadResponse = await cloudinary.uploader.upload(
                fileArr[i],
                {
                    upload_preset: "Dev",
                }
            );

            images.push(uploadResponse.url);
        }

        req.body.image = images;

        next();
    } catch (error) {
        res.status(500).send({ message: "Failed to upload image(s)" });
    }
};

module.exports = uploadImageMiddleware;
