const Boom = require('boom');

const Order = require('../models/Order');

const updateOrderStatus = (orderId, orderStatus) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({ orderId }).exec();
      if (!order) {
        throw Boom.badData(`Order ${orderId} not found`);
      }
      order.orderStatus = orderStatus;
      const savedOrder = await order.save();
      return resolve(savedOrder);
    } catch (err) {
      return reject(err);
    }
  });

exports.updateOrderStatus = updateOrderStatus;
