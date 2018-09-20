const mongoose = require('mongoose');
const Checkit = require('checkit');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.addProduct = (req, res) => {
  const [err, params] = new Checkit({
    name: ['required', 'string'],
    isBunbdle: 'boolean',
    price: ['required', 'number'],
    size: 'string',
    productIds: 'array'
  }).validateSync(req.body);

  if (err) return res.send(err);

  Product.find({
    _id: params.productIds.map(id => mongoose.Types.ObjectId(id))
  }, (err, products) => {
    if (err || !products) return res.send('product not found!');

    const newProduct = new Product({
      name: params.name,
      isBunbdle: params.isBunbdle,
      price: params.price,
      size: params.size,
      productIds: params.productIds,
    });
    newProduct.save(err => res.send(err));
  });
};


exports.editProduct = (req, res) => {
  const [err, params] = new Checkit({
    productId: ['required', 'string'],
    name: ['required', 'string'],
    isBunbdle: 'boolean',
    price: ['required', 'number'],
    size: 'string',
    productIds: 'array'
  }).validateSync(req.body);

  if (err) return res.send(err);

  Product.findById(params.productIds, (err, product) => {
    if (err) return res.send(err);
    if (!product) return res.send('product not found!');

    product.name = params.name;
    product.isBunbdle = params.isBunbdle;
    product.price = params.price;
    product.size = params.size;
    product.productIds = params.productIds;

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
