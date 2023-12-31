const productService = require('../services/productService');
const cloudService = require('../services/cloudService');
const communityService = require('../services/communityService');

exports.uploadImage = async (req, res, next) => {
  const files = req.files;
  const communityId = req.body.communityId;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  try {
    const community = await communityService.getCommunityById(communityId);

    const communityName = community.name;
    const folderName = community.name;

    const imageUrls = await cloudService.uploadImage(
      files,
      communityName,
      folderName
    );
    res.status(200).json({ imageUrls });
  } catch (error) {
    next(error);
  }
};

exports.deleteUploadedImage = async (req, res, next) => {
  const { imageName } = req.params;

  if (!imageName) {
    return res.status(400).json({ message: 'No image name provided.' });
  }

  try {
    await cloudService.deleteUploadedImage(imageName);
    res.status(200).json({ message: 'Image deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.productId,
      req.body
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.productId);
    res
      .status(200)
      .json({ message: 'Product and its images deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;

  try {
    const productsData = await productService.getAllProducts(page, limit);
    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  try {
    const productsData = await productService.getMyProducts(
      req.userId,
      page,
      limit
    );
    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCommunity = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  try {
    const productsData = await productService.getProductsByCommunity(
      req.params.communityId,
      page,
      limit
    );
    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
