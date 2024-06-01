const Community = require('../models/community.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const cloudService = require('../services/cloudService');
const { paginate } = require('../utils/productUtils');

exports.createProduct = async (productDetails) => {
  const { community } = productDetails;

  const product = new Product({
    ...productDetails,
    community,
    images: cloudService.getImageUrls(),
  });

  const currentUser = await User.findById(productDetails.owner).exec();
  if (!currentUser) {
    throw new Error('Bad request. User not found.');
  }

  await Community.findByIdAndUpdate(
    community,
    { $push: { products: product._id } },
    { new: true }
  );

  const newProduct = await product.save();
  cloudService.resetImageUrls();

  return newProduct;
};

exports.updateProduct = async (productId, productDetails) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error(`Product with id ${productId} does not exist`);
  }

  // Update product details
  if (productDetails.name) {
    product.name = productDetails.name;
  }
  if (productDetails.community) {
    product.community = productDetails.community;
  }
  if (productDetails.description) {
    product.description = productDetails.description;
  }
  if (productDetails.category) {
    product.category = productDetails.category;
  }
  if (productDetails.owner) {
    product.owner = productDetails.owner;
  }
  if (productDetails.images) {
    product.images = productDetails.images;
  }
  if (productDetails.tags) {
    product.tags = productDetails.tags;
  }
  if (productDetails.condition) {
    product.condition = productDetails.condition;
  }
  if (productDetails.location) {
    product.location = productDetails.location;
  }
  if (productDetails.isAvailable) {
    product.isAvailable = productDetails.isAvailable;
  }
  if (productDetails.wantedProducts) {
    product.wantedProducts = productDetails.wantedProducts;
  }

  await product.save();
  return product;
};
