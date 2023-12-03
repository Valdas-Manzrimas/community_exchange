const Product = require('../models/product.model');
const User = require('../models/user.model');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'norse-bond-299713',
  keyFilename: './norse-bond-299713-7470e7a36420.json',
});

const bucketName = 'community_exchange';
const folderName = 'Product-Images';

let imageUrls = [];

exports.uploadImage = async (req, res, next) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      const blob = storage
        .bucket(bucketName)
        .file(`${folderName}/${file.originalname}`);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  });

  // Wait for all uploads to finish
  imageUrls = await Promise.all(uploadPromises);

  req.files = [];

  res.status(200).json({ imageUrls });
};

exports.deleteUploadedImage = async (req, res, next) => {
  const { imageName } = req.params;

  if (!imageName) {
    return res.status(400).json({ message: 'No image name provided.' });
  }

  const file = storage.bucket(bucketName).file(`${folderName}/${imageName}`);

  file
    .delete()
    .then(() => {
      res.status(200).json({ message: 'Image deleted successfully.' });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    owner: req.body.owner,
    images: imageUrls,
    tags: req.body.tags,
    condition: req.body.condition,
    location: req.body.location,
    isAvailable: req.body.isAvailable,
    wantedProducts: req.body.wantedProducts,
  });

  const currentUser = await User.findById(req.body.owner).exec();

  try {
    const newProduct = await product.save();

    if (!currentUser) {
      return res.status(400).json({ message: 'Bad request. User not found.' });
    }

    imageUrls = [];

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

    for (const imageUrl of product.images) {
      const imageName = imageUrl.split('/').pop();

      const file = storage
        .bucket(bucketName)
        .file(`${folderName}/${imageName}`);
      try {
        await file.delete();
      } catch (err) {
        console.error(`Failed to delete image ${imageName}: ${err.message}`);
      }
    }

    await Product.deleteOne({ _id: req.params.productId });
    res
      .status(200)
      .json({ message: 'Product and its images deleted successfully' });
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
