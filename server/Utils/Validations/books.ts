import Joi from 'joi';

const createBookValidation = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    date: Joi.string().required(),
    edition: Joi.number().required(),
    author_id: Joi.number().required(),
});
const updateBookValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    date: Joi.string().required(),
    edition: Joi.string().required(),
    author_id: Joi.string().required(),
});

export { createBookValidation, updateBookValidation };