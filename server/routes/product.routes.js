const productController = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/authJwt');

// Routes for product controller functions

module.exports = function (app) {
  app.get('/api/product/all', productController.getAllProducts);
  app.get('/api/product/owned', verifyToken, productController.getMyProducts);

  app.post('/api/product/create', productController.createProduct);

  app.get('/api/product/:productId', productController.getProductById);
  app.put('/api/product/update/:productId', productController.updateProduct);
  app.delete('/api/product/delete/:productId', productController.deleteProduct);
};
