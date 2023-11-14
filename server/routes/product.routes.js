const productController = require('../controllers/product.controller');
const { verifyToken, isAdmin, isModerator } = require('../middlewares/authJwt');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit is 5MB
  },
});

module.exports = function (app) {
  app.get('/api/product/all', productController.getAllProducts);
  app.get('/api/product/owned', verifyToken, productController.getMyProducts);

  app.post(
    '/api/product/uploadImage',
    upload.array('images'),
    productController.uploadImage
  );
  app.delete(
    '/api/product/deleteImage/:imageName',
    productController.deleteUploadedImage
  );

  app.post('/api/product/create', verifyToken, productController.createProduct);

  app.get('/api/product/:productId', productController.getProductById);
  app.put('/api/product/update/:productId', productController.updateProduct);
  app.delete(
    '/api/product/delete/:productId',
    verifyToken,
    productController.deleteProduct
  );
};
