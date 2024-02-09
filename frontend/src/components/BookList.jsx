import { BookCard } from './BookCard';

export const BookList = ({ books, onRemove, onEdit }) => {
  const displayBooks = books
    .map((book) => {
      return <BookCard key={book.id} book={book} onRemove={onRemove} onEdit={onEdit} />;
    })
  return (
    <div className='book-list'>
      {displayBooks}
    </div>
  )
}