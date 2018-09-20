const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');


exports.addProduct = (req, res) => {
  const name = req.body.name;
  const isBunbdle = req.body.isBunbdle;
  const price = req.body.price;
  const size = req.body.size;
  const productIds = req.body.productIds;

  Product.find({
    _id: productIds.map(id => mongoose.Types.ObjectId(id))
  }, (err, products) => {
    if (err || !products) return res.send('product not found!');

    const newProduct = new Product({
      name,
      isBunbdle,
      price,
      size,
      productIds,
    });
    newProduct.save(err => res.send(err));
  });
};


exports.editProduct = (req, res) => {
  const productId = req.body.productId;
  const name = req.body.name;
  const isBunbdle = req.body.isBunbdle;
  const price = req.body.price;
  const size = req.body.size;
  const productIds = req.body.productIds;


  Product.findById(productId, (err, product) => {
    if (err) return res.send(err);
    if (!product) return res.send('product not found!');

    product.name = name;
    product.isBunbdle = isBunbdle;
    product.price = price;
    product.size = size;
    product.productIds = productIds;

    product.save(err => res.send(err));
  });
};

exports.removeProduct = (req, res) => {
  Product.remove({ _id: req.body.productId }, err => res.send(err));
};

exports.listAllProduct = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.send(err);
    return res.send(products);
  });
};
