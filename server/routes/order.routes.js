const orderController = require('../controllers/order.controller');

module.exports = function (app) {
  app.post('/api/order/', orderController.createOrder);
  app.get('/api/order/', orderController.getAllOrders);
  app.get('/api/order/:id', orderController.getOrderById);
  app.put('/api/order/:id', orderController.updateOrderStatus);
  app.delete('/api/order/:id', orderController.deleteOrder);
};
