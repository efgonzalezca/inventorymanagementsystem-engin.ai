import { Router } from 'express';

import { validatorHandler } from '../middlewares/validator.handler.mjs';
import { createBook, deleteBook, getBooks, updateBook } from '../controllers/books.controller.mjs';

export const router = Router();

router.get(
  '/',
  validatorHandler('readBooks', 'query'),
  getBooks
)

router.post(
  '/',
  validatorHandler('createBook', 'body'),
  createBook
)

router.put(
  '/:id',
  validatorHandler('updateBook', 'body'),
  updateBook
)

router.delete(
  '/:id',
  deleteBook
)