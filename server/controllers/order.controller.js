const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

exports.createOrder = async (req, res) => {
  try {
    const { buyer, seller } = req.body;
    const buyerProductId = buyer.product.id;
    const buyerUserId = buyer.id;
    const sellerProductId = seller.product.id;
    const sellerUserId = seller.id;

    const buyerProduct = await Product.findById(buyerProductId);
    const buyerUser = await User.findById(buyerUserId);
    const sellerProduct = await Product.findById(sellerProductId);
    const sellerUser = await User.findById(sellerUserId);

    if (!buyerProduct || !buyerUser || !sellerProduct || !sellerUser) {
      return res.status(404).json({ message: 'Product or user not found' });
    }

    const order = new Order({
      buyer: { id: buyerUserId, product: { id: buyerProductId, quantity: 1 } },
      seller: {
        id: sellerUserId,
        product: { id: sellerProductId, quantity: 1 },
      },
    });

    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('buyer.id', 'username')
      .populate('buyer.product.id', 'name')
      .populate('seller.id', 'username')
      .populate('seller.product.id', 'name')
      .exec();
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('buyer.id', 'username')
      .populate('buyer.product.id', 'name')
      .populate('seller.id', 'username')
      .populate('seller.product.id', 'name')
      .exec();

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    await order.remove();
    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
