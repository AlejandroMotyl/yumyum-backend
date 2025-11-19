import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const recipeIdSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getAllRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.min': 'Page must be at least {#limit}',
    }),
    perPage: Joi.number().min(5).max(20).default(10).messages({
      'number.base': 'perPage must be a number',
      'number.min': 'perPage must be at least {#limit}',
      'number.max': 'perPage must be at most {#limit}',
    }),
    category: Joi.string().trim().messages({
      'string.base': 'Category must be a string',
      'any.only': "Category doesn't exist",
    }),
    ingredient: Joi.string().hex().messages({
      'string.base': 'Ingredient must be a string',
      'string.hex': 'Ingredient must be a valid ObjectId',
    }),
    search: Joi.string().trim().allow('').messages({
      'string.base': 'Search must be a string',
    }),
  }),
};

export const getAllUserRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.min': 'Page must be at least {#limit}',
    }),
    perPage: Joi.number().min(1).max(50).default(12).messages({
      'number.base': 'perPage must be a number',
      'number.min': 'perPage must be at least {#limit}',
    }),
  }),
};

export const createRecipeSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().max(64).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
      'any.required': 'Title is required',
    }),
    category: Joi.string().required().messages({
      'string.base': 'Category must be a string',
      'any.required': 'Category is required',
    }),
    area: Joi.string().trim().allow('').messages({
      'string.base': 'Area must be a string',
    }),
    instructions: Joi.string().max(1200).required().messages({
      'string.base': 'Instructions must be a string',
      'any.required': 'Instructions are required',
    }),
    description: Joi.string().max(200).trim().allow('').messages({
      'string.base': 'Description must be a string',
    }),
    thumb: Joi.string().uri().max(2048).trim().allow('').messages({
      'string.uri': 'Thumb must be a valid URL',
    }),
    time: Joi.number().integer().min(1).max(360).required().messages({
      'string.base': 'Time must be a string',
      'any.required': 'Time is required',
    }),
    cals: Joi.number().integer().min(1).max(10000).optional().messages({
      'number.base': 'Calories must be a number',
      'number.min': 'Calories must be at least {#limit}',
      'number.max': 'Calories must not exceed {#limit}',
    }),
    ingredients: Joi.array()
      .items(
        Joi.object({
          id: Joi.string()
            .custom(objectIdValidator)
            .required()
            .messages({ 'any.required': 'Ingredient id is required' }),
          measure: Joi.string().trim().allow('').messages({
            'string.base': 'Measure must be a string',
          }),
        }),
      )
      .min(2)
      .max(16)
      .required()
      .messages({
        'array.min': 'At least two ingredients are required',
      }),
  }),
};

export const getFavoriteRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.min': 'Page must be at least {#limit}',
    }),
    perPage: Joi.number().min(5).max(20).default(12).messages({
      'number.base': 'perPage must be a number',
      'number.min': 'perPage must be at least {#limit}',
      'number.max': 'perPage must be at most {#limit}',
    }),
  }),
};
