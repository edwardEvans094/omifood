const mongoose = require('mongoose');
const Boom = require('boom');
const Product = require('../models/Product');

exports.addProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: req.body.name,
      isBundle: req.body.isBundle,
      price: req.body.price,
      attributes: req.body.attributes
      // productIds: req.body.productIds,
    });

    if (req.body.isBundle && req.body.productIds) {
      const products = await Product.find({
        _id: req.body.productIds.map(id => mongoose.Types.ObjectId(id))
      }).exec();

      if (products.length !== req.body.productIds.length) {
        return Boom.badData('Sub-product not found');
      }

      product.productIds = req.body.productIds;
    }
    const savedProduct = await product.save();
    return res.json(savedProduct);
  } catch (err) {
    return next(err);
  }
};


exports.editProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body._id).exec();
    if (!product) {
      return Boom.badData(`Cannot update product ${req.body._id}`);
    }
    product.name = req.body.name;
    product.isBundle = req.body.isBundle;
    product.price = req.body.price;
    product.attributes = req.body.attributes;
    product.productIds = req.body.productIds;

    const savedProduct = await product.save();
    return res.json(savedProduct);
  } catch (err) {
    return next(err);
  }
};

exports.removeProduct = async (req, res, next) => {
  try {
    await Product.remove({ _id: req.body.productId }).exec();
    return res.json({ _id: req.body.productId });
  } catch (err) {
    return next(err);
  }
};

exports.listAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find({}).exec();
    res.json(products);
  } catch (err) {
    return next(err);
  }
};
