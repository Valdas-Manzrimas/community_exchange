const Product = require('../models/product.model');
const User = require('../models/user.model');
const cloudService = require('../services/cloudService');
const { paginate } = require('../utils/productUtils');

exports.createProduct = async (productDetails) => {
  const { communityId } = productDetails;

  const product = new Product({
    ...productDetails,
    community: communityId,
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

exports.getMyProducts = async (user, page, limit, populateFields) => {
  const query = Product.find({ owner: user })
    .skip((page - 1) * limit)
    .limit(limit)
    .select(populateFields.join('name', '_id'));

  const products = await query.exec();
  return products;
};

exports.getProductsByCommunity = async (communityId, query) => {
  const { results, totalPages } = await paginate(Product, query, {
    community: communityId,
  });
  const products = await Product.populate(results, {
    path: 'owner',
    select: 'firstName lastName',
  });
  return { products, totalPages };
};
