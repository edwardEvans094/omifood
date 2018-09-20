
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  spiderumUserName: { type: String, unique: true },
  email: String,
  address: String,
  findUsBy: String,
  productIds: [mongoose.Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
