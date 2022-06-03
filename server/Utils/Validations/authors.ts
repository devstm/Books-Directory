import Joi from 'joi';

const idValidation = Joi.object({
  id: Joi.number().positive().required(),
});
const queryValidation = Joi.object({
  page: Joi.number().positive(),
  name: Joi.string(),
});
const createValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});
const updateValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export {
  idValidation,
  queryValidation,
  createValidation,
  updateValidation,
};
