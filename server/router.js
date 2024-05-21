const express = require('express');
const multer = require('multer');

const router = express();
const upload = multer({ dest: 'uploads/' }); 

const imageController = require('./controller/imageController');

// router.use( async(req, res, next) => {
//     next()
//   })

router.get('/getDocuments', imageController.getImages);
router.post('/uploadDocument', upload.single('image'), imageController.uploadImage);

module.exports = router