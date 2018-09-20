const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.saveOrder = (req, res) => res.send('order save successfull and will be processed!');


exports.addOrder = (req, res) => {
  const spiderumName = req.body.spiderumName;
  const email = req.body.email;
  const address = req.body.address;
  const findUsBy = req.body.findUsBy;
  const productIds = req.body.productIds;

  Product.find({
    _id: productIds.map(id => mongoose.Types.ObjectId(id))
  }, (err, products) => {
    if (err || !products) return res.send('product not found!');

    const newOrder = new Order({
      spiderumUserName: spiderumName,
      email,
      address,
      findUsBy,
      productIds,
    });
    newOrder.save(err => res.send(err));
  });
};


exports.editOrder = (req, res) => {
  const orderID = req.body.orderId;
  const spiderumName = req.body.spiderumName;
  const email = req.body.email;
  const address = req.body.address;
  const findUsBy = req.body.findUsBy;
  const productIds = req.body.productIds;

  Order.findById(orderID, (err, order) => {
    if (err || !order) return res.send('order not found!');

    Product.find({
      _id: productIds.map(id => mongoose.Types.ObjectId(id))
    }, (err, products) => {
      if (err || !products) return res.send('product not found!');

      order.spiderumName = spiderumName || '';
      order.email = email || '';
      order.address = address || '';
      order.findUsBy = findUsBy || '';
      order.productIds = productIds || '';

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
