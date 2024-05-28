const productService = require('../services/productService');
const cloudService = require('../services/cloudService');
const communityService = require('../services/communityService');
const { parsePopulateFields, paginate } = require('../utils/productUtils');
const { productSchema } = require('../middlewares/yupVerification');
const yup = require('yup');
const { filterProducts } = require('../utils/filter');
const Community = require('../models/community.model');
const Product = require('../models/product.model');
const { mongoose } = require('../models');

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
    // Validate the request body using the Yup schema
    await productSchema.validate(req.body, { abortEarly: false });

    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
    console.log('Product created successfully');
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Handle Yup validation errors
      const validationErrors = error.inner.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      res.status(400).json({ errors: validationErrors });
    } else {
      // Handle other errors
      next(error);
    }
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
  const populateFields = parsePopulateFields(req);

  try {
    const productsData = await productService.getMyProducts(
      req.user,
      page,
      limit,
      populateFields
    );
    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCommunity = async (req, res) => {
  const { communityId } = req.params;
  const communityObjectId = new mongoose.Types.ObjectId(communityId);

  try {
    const community = await Community.findById(communityObjectId);
    if (!community) {
      return res.status(404).send({ message: 'Community not found' });
    }

    const userId = req.user._id;
    if (!community.users.some((user) => user.equals(userId))) {
      return res
        .status(403)
        .send({ message: 'You are not a member of this community' });
    }

    const products = await filterProducts(req, Product);

    const paginatedProducts = await paginate(products, req.query, {});
    console.log(`Number of products: ${paginatedProducts.totalItems}`);

    res.send(paginatedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
