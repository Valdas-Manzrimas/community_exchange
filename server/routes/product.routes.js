const productController = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/authJwt');
const multer = require('multer');

// const multerStorage = multer.memoryStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'multer/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit is 5MB
  },
});

// Routes for product controller functions

module.exports = function (app) {
  app.get('/api/product/all', productController.getAllProducts);
  app.get('/api/product/owned', verifyToken, productController.getMyProducts);

  app.post(
    '/api/product/uploadImage',
    upload.single('images'),
    productController.uploadImage
  );
  app.post('/api/product/create', verifyToken, productController.createProduct);

  app.get('/api/product/:productId', productController.getProductById);
  app.put('/api/product/update/:productId', productController.updateProduct);
  app.delete('/api/product/delete/:productId', productController.deleteProduct);
};
