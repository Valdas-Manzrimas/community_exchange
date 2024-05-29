const productController = require('../controllers/product.controller');
const {
  verifyToken,
  isMemberInCommunity,
  isProductOwner,
  isAdmin,
  isModerator,
} = require('../middlewares/authJwt');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // limit is 5MB
  },
});

module.exports = function (app) {
  // GET
  app.get('/api/product/all', productController.getAllProducts);
  app.get('/api/product/owned', verifyToken, productController.getMyProducts);
  app.get(
    '/api/product/:productId',
    verifyToken,
    isMemberInCommunity,
    productController.getProductById
  );
  app.get(
    '/api/community/products/:communityId',
    verifyToken,
    isMemberInCommunity,
    productController.getProductsByCommunity
  );

  // POST
  app.post(
    '/api/product/uploadImage',
    upload.array('images'),
    productController.uploadImage
  );
  app.post('/api/product/create', verifyToken, productController.createProduct);

  // PUT
  app.put(
    '/api/product/update/:productId',
    verifyToken || isAdmin,
    productController.updateProduct
  );

  // DELETE
  app.delete(
    '/api/product/deleteImage/:imageName',
    productController.deleteUploadedImage
  );
  app.delete(
    '/api/product/delete/:productId',
    verifyToken,
    isProductOwner,
    productController.deleteProduct
  );
};
