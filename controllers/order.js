const mongoose = require('mongoose');
const Checkit = require('checkit');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.saveOrder = (req, res) => res.send('order save successfull and will be processed!');

exports.addOrder = (req, res) => {
  const [err, params] = new Checkit({
    spiderumName: ['required', 'string'],
    email: 'string',
    address: ['required', 'string'],
    findUsBy: 'string',
    productIds: 'array'
  }).validateSync(req.body);

  if (err) return res.send(err);


  Product.find({
    _id: params.productIds.map(id => mongoose.Types.ObjectId(id))
  }, (err, products) => {
    if (err || !products) return res.send('product not found!');

    const newOrder = new Order({
      spiderumUserName: params.spiderumName,
      email: params.email,
      address: params.address,
      findUsBy: params.findUsBy,
      productIds: params.productIds,
    });
    newOrder.save(err => res.send(err));
  });
};


exports.editOrder = (req, res) => {
  const [err, params] = new Checkit({
    orderID: ['required', 'string'],
    spiderumName: ['required', 'string'],
    email: 'string',
    address: ['required', 'string'],
    findUsBy: 'string',
    productIds: 'array'
  }).validateSync(req.body);

  if (err) return res.send(err);

  Order.findById(params.orderID, (err, order) => {
    if (err || !order) return res.send('order not found!');

    Product.find({
      _id: params.productIds.map(id => mongoose.Types.ObjectId(id))
    }, (err, products) => {
      if (err || !products) return res.send('product not found!');

      order.spiderumName = params.spiderumName || null;
      order.email = params.email || null;
      order.address = params.address || null;
      order.findUsBy = params.findUsBy || null;
      order.productIds = params.productIds || null;

      order.save(err => res.send(err));
    });
  });
};

exports.removeOrder = (req, res) => {
  const orderID = req.body.orderId;
  Order.remove({ _id: orderID }, err => res.send(err));
};

exports.listAllOrder = (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) return res.send(err);
    return res.send(orders);
  });
};
