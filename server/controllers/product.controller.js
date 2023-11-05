const Product = require('../models/product.model');
const User = require('../models/user.model');

exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    owner: req.body.owner,
    images: req.body.images,
    tags: req.body.tags,
    condition: req.body.condition,
    location: req.body.location,
    isAvailable: req.body.isAvailable,
    wantedProducts: req.body.wantedProducts,
  });
  const currentUser = await User.findById(req.userId).exec();
  try {
    // if (!currentUser && !currentUser.roles.includes('moderator')) {
    //   return res.status(401).send({ message: 'Unauthorized.' });
    // }

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.owner = req.body.owner || product.owner;
    product.images = req.body.images || product.images;
    product.tags = req.body.tags || product.tags;
    product.condition = req.body.condition || product.condition;
    product.location = req.body.location || product.location;
    product.isAvailable = req.body.isAvailable || product.isAvailable;
    product.wantedProducts = req.body.wantedProducts || product.wantedProducts;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.deleteOne({ _id: req.params.productId });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const offset = (page - 1) * limit;

  try {
    const products = await Product.find().skip(offset)?.limit(limit).exec();

    const count = await Product.countDocuments().exec();

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  try {
    const products = await Product.find({ owner: req.userId })
      .skip(offset)
      ?.limit(limit)
      .exec();

    const count = await Product.countDocuments({ owner: req.userId }).exec();

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
