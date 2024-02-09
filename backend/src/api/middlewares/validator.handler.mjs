import { createAndUpdateBookDto, readBooksDto } from '../../dtos/book.dto.mjs';

const schemas = {
  readBooks: {schema: readBooksDto},
  createBook: {schema: createAndUpdateBookDto},
  updateBook: {schema: createAndUpdateBookDto}
}

export const validatorHandler = (schema, property) => {
  return (req, _res, next) => {
    const data = req[property];
    schemas[schema].schema.validateAsync(data, { abortEarly: false })
      .then((_value) => {
        next();
      })
      .catch((err) => {
        const errors = {};
        for (const detail of err.details) {
          const key = detail.path[0];
          const message = detail.message;
      
          if (!errors.hasOwnProperty(key)) {
            errors[key] = [];
          }
          errors[key].push(message);
        }
        return _res
        .status(400)
        .json({
          errors: errors
        })
      })
  }
}