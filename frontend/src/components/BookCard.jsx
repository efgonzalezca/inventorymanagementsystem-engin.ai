export const BookCard = ({ book, onRemove, onEdit }) => {
  return (
    <div className='book-card'>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <p>In Stock: {book.stockQuantity}</p>
      <div className='actions'>
        <button onClick={() => onEdit(book)}>update</button>
        <button onClick={() => onRemove(book)}>delete</button>
      </div>
    </div>
  )
}