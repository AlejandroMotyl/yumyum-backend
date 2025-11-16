import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().max(16).required(),
    email: Joi.string().trim().email().max(128).required(),
    password: Joi.string().trim().pattern(/^\S+$/).min(8).max(128).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().trim().email().max(128).required(),
    password: Joi.string().trim().pattern(/^\S+$/).max(128).required(),
  }),
};
