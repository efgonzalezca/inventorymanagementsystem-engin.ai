import { Router } from 'express';

import { router as booksRouter } from './books.route.mjs';

export const routerApi= (app) => {
  const router = Router();
  app.use('/api', router);
  router.use('/books', booksRouter);
}