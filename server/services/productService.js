const Product = require('../models/product.model');
const User = require('../models/user.model');
const cloudService = require('../services/cloudService');

exports.createProduct = async (productDetails) => {
  const product = new Product({
    ...productDetails,
    images: cloudService.getImageUrls(),
  });

  const currentUser = await User.findById(productDetails.owner).exec();

  if (!currentUser) {
    throw new Error('Bad request. User not found.');
  }

  const newProduct = await product.save();
  cloudService.resetImageUrls();

  return newProduct;
};

exports.getProductById = async (productId) => {
  const product = await Product.findById(productId).exec();
  if (!product) {
    throw new Error(`Product with id ${productId} does not exist`);
  }
  return product;
};

exports.updateProduct = async (productId, productDetails) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error(`Product with id ${productId} does not exist`);
  }

  // Update product details
  product.title = productDetails.title || product.title;
  product.description = productDetails.description || product.description;
  product.price = productDetails.price || product.price;
  product.images = productDetails.images || product.images;

  await product.save();
  return product;
};

exports.deleteProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error(`Product with id ${productId} does not exist`);
  }

  await product.remove();
  return product;
};

exports.getAllProducts = async (page, limit) => {
  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  return products;
};

exports.getMyProducts = async (userId, page, limit) => {
  const products = await Product.find({ owner: userId })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  return products;
};

exports.getProductsByCommunity = async (communityId, page, limit) => {
  const products = await Product.find({ community: communityId })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  return products;
};
