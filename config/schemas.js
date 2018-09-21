// load Joi module
const Joi = require('joi');

const productSchema = Joi.object().keys({
  _id: Joi.string(),
  name: Joi.string().required(),
  isBundle: Joi.boolean().required(),
  price: Joi.number().required(),
  attributes: Joi.object().keys({
    size: Joi.string(),
    gender: Joi.string().valid(['M', 'F'])
  }),
  productIds: Joi.when('isBundle', {
    is: true,
    then: Joi.array().min(2).required(),
    otherwise: Joi.array()
  }),
});

// export the schemas
module.exports = {
  '/product': productSchema,
};
