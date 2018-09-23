
const mongoose = require('mongoose');
const enums = require('../enums/enums');

const ItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId },
  attributes: {
    size: { type: String },
    gender: { type: String, enum: ['M', 'F'] }
  },
});

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  spiderumUserName: { type: String, unique: true },
  email: String,
  address: String,
  findUsBy: String,
  products: [ItemSchema],
  shippingFee: mongoose.Schema.Types.Decimal128,
  status: { type: String, enum: Object.values(enums.OrderStatusEnum) },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
