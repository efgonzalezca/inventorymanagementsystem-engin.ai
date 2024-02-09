import Joi from 'joi';

const title = Joi.string().max(1000).messages({
  'string.base': 'title must be a string',
  'string.empty': 'title is not allowed to be empty',
  'string.max': 'title length must be less than or equal to 1000 characters long',
  'any.required': 'title field is requerid'
})
const author = Joi.string().max(1000).messages({
  'string.base': 'author must be a string',
  'string.empty': 'author is not allowed to be empty',
  'string.max': 'author length must be less than or equal to 1000 characters long',
  'any.required': 'author field is requerid'
})
const price = Joi.number().positive().greater(0).messages({
  'number.base': 'price must be a number',
  'number.greater': 'price must be greater than 0',
  'number.positive': 'price must be a positive number',
  'any.required': 'price field is requerid'
 })
 const stockQuantity = Joi.number().integer().min(0).messages({
  'number.base': 'stockQuantity must be a number',
  'number.integer': 'stockQuantity must be an integer',
  'number.min': 'Minimum value to stockQuantity allowed 0',
  'any.required': 'stockQuantity field is requerid'
 })
const page = Joi.number().integer().positive().min(1).messages({
  'number.base': 'page must be a number',
  'number.integer': 'page must be an integer',
  'number.positive': 'page must be a positive number',
  'number.min': 'Minimum value to page allowed 1',
  'any.required': 'page field is requerid'
 })
 const limit = Joi.number().integer().positive().max(9).messages({
  'number.base': 'limit must be a number',
  'number.integer': 'limit must be an integer',
  'number.positive': 'limit must be a positive number',
  'number.max': 'Maximum value to limit allowed 9',
  'any.required': 'limit field is requerid'
 })
 
export const readBooksDto = Joi.object({
  page: page.required(),
  limit: limit.required()
})

export const createAndUpdateBookDto = Joi.object({
  title: title.required(),
  author: author.required(),
  price: price.required(),
  stockQuantity: stockQuantity.required()
})