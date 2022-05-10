const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer'), path = require("path");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new CloudinaryStorage({
    cloudinary,
    // destination: (_req, _file, done) => {
    //     done(null, "./samples/");
    // },
    params: {
        folder: "h2tstore",
        allowedFormats: ['jpg', 'png'],
        upload_preset: 'samples',
        // use_filename: true,
        // unique_filename: false,

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    // destination: '/v1651304838/h2tstore/'
});
// https://res.cloudinary.com/dbfjceflf/image/upload/v1651137857/samples/stk5parocdcub9knugrr.jpg
// https://res.cloudinary.com/dbfjceflf/image/upload/v1651304838/h2tstore/stripesblue1447_2.png
const uploadCloud = multer({ storage });

module.exports = uploadCloud;
// module.exports = { cloudinary }