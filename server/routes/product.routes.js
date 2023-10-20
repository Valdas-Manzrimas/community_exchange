const productController = require('../controllers/product.controller');

// Routes for product controller functions

module.exports = function (app) {
  app.get('/api/product/all', productController.getAllProducts);

  app.post('/api/product/create', productController.createProduct);

  app.get('/api/product/:productId', productController.getProductById);
  app.put('/api/product/update/:productId', productController.updateProduct);
  app.delete('/api/product/delete/:productId', productController.deleteProduct);
};
