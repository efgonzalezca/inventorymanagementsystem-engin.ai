import { BookService } from '../../services/book.service.mjs';

const bookService = new BookService();

export const getBooks = (req, res, next) => {
  try {
    const { page, limit } = req.query;
    let booksResponse = bookService.findAllPaginated(page, limit);
    console.info('Read books');
    return res
      .status(200)
      .json(booksResponse)
  } catch(err) {
    return next(err);
  }
}

export const createBook = (req, res, next) => {
  try {
    const { title, author, price, stockQuantity } = req.body;
    bookService.create({
      title: title,
      author: author,
      price: price,
      stockQuantity: stockQuantity
    });
    console.info('Book created');
    return res
      .status(201)
      .json({
        message: `Book created successfully`
      })
  } catch(err) {
    return next(err);
  }
}

export const updateBook = (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, author, price, stockQuantity } = req.body;
    const bookToUpdate = bookService.findById(id);
    if(!bookToUpdate) {
      return res
      .status(404)
      .json({
        message: `Book ${id} not found`
      })
    }
    bookService.update(id, {
      title: title,
      author: author,
      price: price,
      stockQuantity: stockQuantity
    });
    console.info(`Book ${id} updated successfully`);
    return res
      .status(201)
      .json({
        message: `Book ${id} updated successfully`
      })
  } catch(err) {
    return next(err);
  }
}

export const deleteBook = (req, res, next) => {
  try {
    const id = req.params.id;
    const bookToDelete = bookService.findById(id);
    if(!bookToDelete) {
      return res
      .status(404)
      .json({
        message: `Book ${id} not found`
      })
    }
    bookService.delete(id);
    console.info(`Delete book ${id}`);
    return res
      .status(200)
      .json({
        message: `Book ${id} deleted successfully`
      })
  } catch(err) {
    return next(err);
  }
}