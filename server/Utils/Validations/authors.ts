import Joi from 'joi';

const idValidation = Joi.object({
  id: Joi.number().positive().required(),
});
const queryValidation = Joi.object({
    page: Joi.number().positive(),
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
const nameValidation = Joi.object({
    name: Joi.string().required(),
});

export { idValidation, queryValidation, createValidation, updateValidation, nameValidation };