import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getAllNotesSchema = {
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
    tag: Joi.string()
      // .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': "Tag doesn't exist",
      }),
    search: Joi.string().trim().allow('').messages({
      'string.base': 'Search must be a string',
    }),
  }),
};

//TODO: Validate all user recipes

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

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
      'any.required': 'Title is required',
    }),
    content: Joi.string().trim().allow('').messages({
      'string.base': 'content must be a string',
    }),
    tag: Joi.string()
      // .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': "Tag doesn't exist",
      }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
      'any.required': 'Title is required',
    }),
    content: Joi.string().trim().allow('').messages({
      'string.base': 'content must be a string',
    }),
    tag: Joi.string()
      // .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': "Tag doesn't exist",
      }),
  }).min(1),
};
