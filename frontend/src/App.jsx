import { useContext, useEffect, useState } from 'react';

import './App.css';

import { Alert } from './components/Alert';
import { BookList } from './components/BookList';
import { ModalBook } from './components/ModalBook';
import { Pagination } from './components/Pagination';
import { AlertContext } from './context/AlertContext';
import { ModalConfirmation } from './components/ModalConfirmation';
import { createBook, deleteBook, getBooks, updateBook } from './services/bookService';

export const App = () => {
  const limitPerPage = 9;
  const { alerts, addAlert, removeAlert } = useContext(AlertContext);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const handleAddBook = () => {
    setShowModal(true);
    setSelectedBook(null);
  }
  const handleSaveBook = (bookData) => {
    createBook(bookData)
    .then((res) => {
      setShowModal(false);
      if(books.length === limitPerPage && currentPage === totalPages) {
        setCurrentPage((cPage) => cPage + 1);
      }
      getBooksData();
      addAlert(res.message, 'success');
    })
    .catch((error) => {
      handleError(error);
    })
  }
  const handleRemoveBook = (book) => {
    setShowConfirmationModal(true);
    setSelectedBook(book);
  }
  const handleDeleteBook = (book) => {
    deleteBook(book.id)
      .then((_res) => {
        if(books.length === 1 && currentPage !== 1) {
          setCurrentPage((cPage) => cPage - 1);
        }
        setSelectedBook(null);
        getBooksData();
        addAlert(`Book ${book.id} deleted`, 'success');
      })
      .catch((error) => {
        handleError(error);
      })
  }
  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  }
  const handleUpdateBook = (bookData) => {
    updateBook(selectedBook.id, bookData)
      .then((_res) => {
        setShowModal(false);
        getBooksData();
        addAlert(`Book ${selectedBook.id} updated`, 'success');
      })
      .catch((error) => {
        handleError(error) 
      })
  }
  const getBooksData = () => {
    getBooks(currentPage, limitPerPage)
      .then((data) => {
        setBooks(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        handleError(error);
      })
  }
  const handleError = (error) => {
    addAlert(error.message, 'danger');
  }
  const handleRemoveAlert = (id) => {
    removeAlert(id);
  }
  useEffect(() => {
    getBooksData();
  }, [])
  useEffect(() => {
    getBooksData();
  }, [currentPage])
  return (
    <div className='app container'>
      <h1>Inventory Management System</h1>
      <div className='add-book'>
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <BookList books={books} onRemove={handleRemoveBook} onEdit={handleEditBook} />
      {(totalPages !== 0) && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />}
      {showModal && (
        <ModalBook
          onClose={() => setShowModal(false)}
          onSave={handleSaveBook}
          onUpdate={handleUpdateBook}
          selectedBook={selectedBook}
        />
      )}
      {showConfirmationModal && (
        <ModalConfirmation
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleDeleteBook}
          book={selectedBook}
        />
      )}
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          id={alert.id}
          message={alert.message}
          type={alert.type}
          onClose={handleRemoveAlert}
        />
      ))}
    </div>
  )
}