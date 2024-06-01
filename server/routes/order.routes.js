const orderController = require('../controllers/order.controller');
const { verifyToken } = require('../middlewares/authJwt');

module.exports = function (app) {
  app.post('/api/order/', verifyToken, orderController.createOrder);
  app.get('/api/order/', verifyToken, orderController.getAllOrders);
  app.get('/api/order/:id', verifyToken, orderController.getOrderById);
  app.put('/api/order/:id', verifyToken, orderController.updateOrderStatus);
  app.delete('/api/order/:id', verifyToken, orderController.deleteOrder);
};
