const mongoose = require('mongoose');
const Boom = require('boom');
const Order = require('../models/Order');
const Product = require('../models/Product');
const utils = require('../utils/utils');

// const upload = multer({
//   dest: TMP_DIR,
//   // limits: { fileSize: 2 * 1024 * 1024 } /* limit 2Mb size */
// });
// var cpUpload = upload.single('linkupload');

exports.saveOrder = (req, res) => res.send('order save successfull and will be processed!');

exports.addOrder = async (req, res, next) => {
  try {
    const products = await Product.find({
      _id: req.body.products.map(p => mongoose.Types.ObjectId(p._id))
    }).exec();
    if (!products) {
      return Boom.badData('Sub-product not found');
    }
    let orderId = utils.randomAlphanumeric(15);
    const foundOrder = await Order.find({ orderId }).exec();
    if (foundOrder) {
      orderId = utils.randomAlphanumeric(15);
    }
    const order = new Order({
      orderId,
      spiderumUserName: req.body.spiderumUserName,
      email: req.body.email,
      address: req.body.address,
      findUsBy: req.body.findUsBy,
      products: req.body.products,
      shippingFee: req.body.shippingFee,
      status: Order.OrderStatusEnum.WAITING_FOR_PAYMENT,
    });
    const newOrder = await order.save();
    return res.json(newOrder);
  } catch (err) {
    return next(err);
  }
};


exports.editOrder = async (req, res, next) => {
  try {
    const products = await Product.find({
      _id: req.body.products.map(p => mongoose.Types.ObjectId(p._id))
    }).exec();
    if (!products) {
      return Boom.badData('Sub-product not found');
    }

    const order = await Order.findByIdAndUpdate(req.body._id, req.body).exec();
    if (!order) {
      return Boom.badData(`Order ${req.body.orderId} not found`);
    }

    // order.spiderumUserName = req.body.spiderumUserName;
    // order.email = req.body.email || null;
    // order.address = req.body.address || null;
    // order.findUsBy = req.body.findUsBy || null;
    // order.products = req.body.products || [];

    // order.shippingFee = req.body.shippingFee || 0;

    // const savedOrder = await order.save();
    // return res.json(savedOrder);
    return res.json(order);
  } catch (err) {
    return next(err);
  }
};

exports.removeOrder = async (req, res, next) => {
  try {
    await Order.remove({ orderId: req.body.orderId });
    return res.json({ orderId: req.body.orderId });
  } catch (err) {
    return next(err);
  }
};

exports.listAllOrder = async (req, res, next) => {
  try {
    const orders = Order.find({}).sort({ createdAt: -1 }).exec();
    return res.json(orders);
  } catch (err) {
    return next(err);
  }
};

// exports.getFileUpload = (req, res) => {
//   res.render('api/upload', {
//     title: 'File Upload'
//   });
// };

// exports.postFileUpload = (req, res) => {
//   req.flash('success', { msg: 'File was uploaded successfully.' });
//   res.redirect('/api/upload');
// };

exports.addToCart = async (req, res, next) => {
  try {
    const newCart = req.body;
    const currentCarts = req.session.carts;
    const allCarts = currentCarts && currentCarts.length ? [...newCart.cart, ...currentCarts] : newCart.cart;
    req.session.carts = allCarts;
    return res.json({ carts: allCarts });
  } catch (error) {
    return next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const cartId = req.body.cardId;
    const allCarts = req.session.carts;
    allCarts.splice(cartId, 1);
    req.session.carts = allCarts;
    return res.json({ carts: allCarts });
  } catch (error) {
    return next(error);
  }
};
