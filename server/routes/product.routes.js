const productController = require('../controllers/product.controller');

const checkProductAuthorization = async (req, res, next) => {
  //   const { productId } = req.params;

  try {
    // const product = await Product.findById(productId).exec();

    // if (!product) {
    //   return res.status(404).send({ message: 'Product not found.' });
    // }

    const currentUser = await User.findById(req.userId).exec();
    console.log(currentUser);

    if (!currentUser) {
      return res.status(401).send({ message: 'Unauthorized.' });
    }
    if (
      currentUser.roles.includes('moderator')

      //   product.createdBy.equals(currentUser._id)
    ) {
      return next();
    }

    return res.status(403).send({ message: 'Forbidden.' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Routes for product controller functions

module.exports = function (app) {
  app.get('/api/product/all', productController.getAllProducts);

  app.post('/api/product/create', productController.createProduct);

  app.get('/api/product/:productId', productController.getProductById);
  app.put(
    '/api/product/:productId',
    checkProductAuthorization,
    productController.updateProduct
  );
  app.delete(
    '/api/product/:productId',
    checkProductAuthorization,
    productController.deleteProduct
  );
};
