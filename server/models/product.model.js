const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // community: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Community',
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    condition: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    wantedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
