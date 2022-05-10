const express = require('express');
const router = express.Router();
const fileUploader = require('../../utils/cloudinary')
const { cloudinary } = require('../../utils/cloudinary')

router.post('/cloudinary', fileUploader.single('img'), (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    // console.log(req.file)
    // console.log(req.file)
    res.json({ secure_url: req.file.path, fileName: req.file.filename.split('/')[1] + '.' + req.file.originalname.split('.')[1] });
});
// router.post('/cloudinary', async (req, res) => {
//     try {
//         const data = {
//             image: req.body.image,
//         }

//         // upload image here
//         cloudinary.uploader.upload(req.body.image)
//             .then((result) => {
//                 res.status(200).send({
//                     message: "success",
//                     result,
//                 });
//             })
//             .catch((error) => {
//                 response.status(500).send({
//                     message: "failure",
//                     error,
//                 });
//             });
//         // const fileStr = req.body.image;
//         // const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//         //     upload_preset: 'samples'
//         // })
//         // console.log(fileStr);
//         // res.send({ message: 'Success!' })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Something went wrong' })
//     }
// })

module.exports = router;