import { v4 as uuid } from 'uuid';

export class BookService {
  constructor() {
    this.books = [];
    this.preloadBooks();
  }

  preloadBooks() {
    this.books = [
      {
        id: 'b8d8c3b3-1447-4e44-b55e-67b6e7d7d733',
        title: 'The Martian',
        author: 'Andy Weir',
        price: 12.6,
        stockQuantity: 4
      },
      {
        id: 'a0d8f1e1-6d8e-4b18-80e1-02430c7cbfd9',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 15.8,
        stockQuantity: 7
      },
      {
        id: 'c7e0f40b-393d-4b35-aa4f-f39e4fc65f38',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 9.99,
        stockQuantity: 10
      },
      {
        id: 'd68b12b0-7e61-4df4-8247-9e48dcf1f49d',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        price: 21.5,
        stockQuantity: 3
      },
      {
        id: '9e6177ac-fd06-48d0-ae68-1c756dcbff49',
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel García Márquez',
        price: 17.25,
        stockQuantity: 6
      },
      {
        id: 'f9ef907f-83de-4e36-9620-022aaedfb4d4',
        title: 'Circe',
        author: 'Madeline Miller',
        price: 11.75,
        stockQuantity: 8
      },
      {
        id: '06a29e5b-f7df-4091-81a1-d9b075c5cbad',
        title: 'El hombre de tiza',
        author: 'C.J. Tudor',
        price: 14.99,
        stockQuantity: 12
      },
      {
        id: 'a3e3ee8d-31d4-4530-a491-45d83eeb91e6',
        title: 'The Book Thief',
        author: 'Markus Zusak',
        price: 8.5,
        stockQuantity: 5
      },
      {
        id: '4c15b7c5-3cc3-48c3-b045-45a9f44d1a33',
        title: 'Invisible Man',
        author: 'Ralph Ellison',
        price: 19.99,
        stockQuantity: 9
      },
      {
        id: 'c2e9ab42-9911-45f4-bd58-2e6bba349f3d',
        title: 'Things Fall Apart',
        author: 'Chinua Achebe',
        price: 13.75,
        stockQuantity: 11
      }
    ];
  }

  findById(id) {
    return this.books.find((book) => book.id === id);
  }

  findAll() {
    return this.books;
  }

  findAllPaginated(page=1, limit=9) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const books = this.books.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.books.length / limit);
    const response = {
      page: page,
      perPage: limit,
      total: this.books.length,
      totalPages: totalPages,
      data: books
    }
    return response;
  }

  create(bookData) {
    this.books.push({id: uuid(), ...bookData});
  }

  update(id, bookData) {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return {...book, ...bookData};
      }
      return book;
    })
  }

  delete(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }
}