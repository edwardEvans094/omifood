// load Joi module
const Joi = require('joi');

const enums = require('../enums/enums');

const productSchema = Joi.object().keys({
  _id: Joi.string(),
  name: Joi.string().required(),
  isBundle: Joi.boolean().required(),
  price: Joi.number().required(),
  // attributes: Joi.object().keys({
  //   size: Joi.string(),
  //   gender: Joi.string().valid(['M', 'F'])
  // }),
  productIds: Joi.when('isBundle', {
    is: true,
    then: Joi.array().min(2).required(),
    otherwise: Joi.array()
  }),
});

const orderSchema = Joi.object().keys({
  _id: Joi.string(),
  orderId: Joi.string().required(),
  spiderumUserName: Joi.string(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  address: Joi.string(),
  findUsBy: Joi.string(),
  products: Joi.array().items(Joi.object({
    productId: Joi.string(),
    attributes: Joi.object().keys({
      size: Joi.string(),
      gender: Joi.string().valid(['M', 'F'])
    }),
  })),
  shippingFee: Joi.number(),
  status: Joi.string().valid(enums.OrderStatusEnum),
});

// export the schemas
module.exports = {
  '/product': productSchema,
  '/order': orderSchema,
};
