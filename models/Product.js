
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  isBunbdle: Boolean,
  price: mongoose.Schema.Types.Decimal128,
  attributes: {
    size: { type: String },
    gender: { type: String, enum: ['M', 'F'] }
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: []
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
